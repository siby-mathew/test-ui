import { ArweaveSigner } from "arbundles";
import { DataItem } from "arbundles";
import useWebIrys from "./useIrys";

type TaggedFile = File & {
  tags?: { name: string; value: string }[];
};

interface UploadWithFilesParams {
  content: string;
  files: TaggedFile[];
}
export const useIrysUploader = () => {
  const { getWebIrys } = useWebIrys();

  const uploadContentWithAttchment = async (
    { content, files }: UploadWithFilesParams,
    encrypt: (content: string) => Promise<string>
  ): Promise<string | null> => {
    try {
      const webIrys = await getWebIrys();
      if (!webIrys) return null;
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

        const balance = await webIrys.getLoadedBalance();
        const price = await webIrys.getPrice(buffer.length);

        if (balance.isLessThan(price)) {
          try {
            await webIrys.fund(Number(price.toString()));
          } catch {
            throw "Failed to fund areweave node";
          }
        }

        const tx = webIrys.arbundles.createData(buffer, signer, { tags });
        await tx.sign(signer);

        txs.push(tx);
        txMap.set(path, tx.id);

        updatedContent += `<span data-file data-id="${tx.id}" data-name="${name}" data-size="${size}" data-type="${type}" />`;
      }

      const contentTags = [{ name: "Content-Type", value: "text/plain" }];
      const encBody = await encrypt(updatedContent);
      const contentBuffer = Buffer.from(encBody);

      const balance = await webIrys.getLoadedBalance();
      const price = await webIrys.getPrice(contentBuffer.length);

      if (balance.isLessThan(price)) {
        try {
          await webIrys.fund(Number(price.toString()));
        } catch {
          throw "Failed to fund areweave node";
        }
      }

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
