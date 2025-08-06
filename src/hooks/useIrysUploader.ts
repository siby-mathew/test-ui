import { ArweaveSigner } from "arbundles";
import { DataItem } from "arbundles";
import useWebIrys from "./useIrys";
import type WebIrys from "@irys/sdk/web/irys";

type TaggedFile = File & {
  tags?: { name: string; value: string }[];
};

interface UploadWithFilesParams {
  content: string;
  files: TaggedFile[];
}
export const useIrysUploader = () => {
  const { getWebIrys } = useWebIrys();

  const ensureFundsAvailable = async (webIrys: WebIrys, size: number) => {
    const balance = await webIrys.getLoadedBalance();
    const price = await webIrys.getPrice(size);

    if (balance.isLessThan(price)) {
      try {
        await webIrys.fund(Number(price.toString()));
      } catch {
        throw "Failed to fund Arweave node";
      }
    }
  };

  const fileSizeCollector = () => {
    let size = 0;
    return (bufferSize: number = 0) => {
      size += bufferSize;
      return size;
    };
  };

  const uploadContentWithAttchment = async (
    { content, files }: UploadWithFilesParams,
    encrypt: (content: string) => Promise<string>
  ): Promise<string | null> => {
    try {
      const webIrys = await getWebIrys();
      if (!webIrys) return null;

      const sizeToUpload = fileSizeCollector();
      const throwawayKey = await webIrys.arbundles
        .getCryptoDriver()
        .generateJWK();
      const signer = new ArweaveSigner(throwawayKey);
      const txs: DataItem[] = [];
      const txMap = new Map<string, string>();

      let updatedContent = content;

      for (const file of files) {
        const { name, size, type } = file;
        const path = file.name ?? file.webkitRelativePath;

        const hasContentType = file.tags?.some(
          ({ name }) => name.toLowerCase() === "content-type"
        );

        const tags = hasContentType
          ? file.tags
          : [
              ...(file.tags ?? []),
              {
                name: "Content-Type",
                value: type || "application/octet-stream",
              },
            ];

        const buffer = Buffer.from(await file.arrayBuffer());
        sizeToUpload(buffer.length);

        const tx = webIrys.arbundles.createData(buffer, signer, { tags });
        await tx.sign(signer);

        txs.push(tx);
        txMap.set(path, tx.id);

        updatedContent += `<span data-file data-id="${tx.id}" data-name="${name}" data-size="${size}" data-type="${type}" />`;
      }

      const contentTags = [{ name: "Content-Type", value: "text/plain" }];
      const encBody = await encrypt(updatedContent);
      const contentBuffer = Buffer.from(encBody);
      sizeToUpload(contentBuffer.length);

      await ensureFundsAvailable(webIrys, sizeToUpload());

      const contentTx = webIrys.arbundles.createData(contentBuffer, signer, {
        tags: contentTags,
      });
      await contentTx.sign(signer);
      txs.push(contentTx);
      txMap.set("mailContent", contentTx.id);

      const manifest = await webIrys.uploader.generateManifest({
        items: txMap,
      });

      const manifestTx = webIrys.arbundles.createData(
        JSON.stringify(manifest),
        signer,
        {
          tags: [
            { name: "Type", value: "manifest" },
            {
              name: "Content-Type",
              value: "application/x.arweave-manifest+json",
            },
          ],
        }
      );
      await manifestTx.sign(signer);
      txs.push(manifestTx);

      await webIrys.uploader.uploadBundle(txs);
      return contentTx.id;
    } catch {
      return null;
    }
  };

  return {
    uploadContentWithAttchment,
  };
};
