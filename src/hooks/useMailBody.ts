import { useEncryptionKey } from "@hooks/useEncryptionKey";
import { useGetInbox } from "@hooks/useGetInbox";

import { useMemo } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import {
  MailBoxLabels,
  QueryKeys,
  StorageVersion,
  type FormattedMailBox,
  type PaymentConfig,
} from "src/types";
import { decryptData } from "@utils/string";
import { PINATA_GATEWAY_URL } from "@const/config";
import {
  isInternalMail,
  isLegacyMail,
  isMailOriginMobile,
} from "@utils/legacy/isLegacyMail";

type Meta = {
  name: string;
  size: number;
  type: string;
};

type MailREsponseAttachment = {
  name: string;
  hash: string;
  meta?: Meta;
};
type MailBodyResponse = {
  body: string;
  attachments?: MailREsponseAttachment[];
  solanaPay?: PaymentConfig[];
  origin: string;
};

export type Attachment = {
  name: string;
  path: string;
};
async function fetchContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch {
    return "";
  }
}
export const useMailBody = (
  id: string | undefined,
  context: MailBoxLabels
): {
  content: string;
  attachments: Attachment[];
  textContent: string;
  isLoading: boolean;
  mail: FormattedMailBox | null | undefined;
  subject: string;
  hasSmartView: boolean;
  payments: PaymentConfig[];
  attachmentRef: MailREsponseAttachment[];
  isInternalMail: boolean;
} => {
  const { mail: inbox } = useGetInbox(context);

  const mail =
    inbox && inbox.length > 0
      ? inbox.find((item) => id && item.id?.toString() === id)
      : null;

  const { data } = useEncryptionKey(mail?.encKey ?? "");
  const getMailContent = async (body: string, version: StorageVersion) => {
    if (isLegacyMail(version as StorageVersion)) {
      return "";
    }

    const URL = `${PINATA_GATEWAY_URL}${body}${isMailOriginMobile(version as StorageVersion) ? `` : `/body.txt`}`;

    const result: string = await fetchContent(URL);
    return result ?? "";
  };

  const {
    data: content,
    isLoading,
    isFetched,
  } = useQuery<string>({
    queryKey: [QueryKeys.MAIL_BODY, id, mail?.body],
    queryFn:
      mail && mail.body
        ? () => getMailContent(mail.body, mail.version as StorageVersion)
        : skipToken,
    enabled: !!(id && mail && mail.body),
  });

  const [mailContent, attachments, textContent, payments, attachmentRef] =
    useMemo((): [
      string,
      Attachment[],
      string,
      PaymentConfig[],
      MailREsponseAttachment[],
    ] => {
      if (isInternalMail(mail?.version as StorageVersion)) {
        return [mail?.body ?? "", [], mail?.body ?? "", [], []];
      }
      if (!content || !content)
        return [
          "",
          [],
          isLegacyMail(mail?.version as StorageVersion)
            ? "[deprecated content]"
            : "",
          [],
          [],
        ];

      try {
        const decryptedContent = JSON.parse(
          decryptData(content ?? "", mail?.iv, data)
        ) as unknown as MailBodyResponse;

        if (!decryptedContent) return ["", [], "", [], []];

        const div = document.createElement("div");
        div.innerHTML = decryptedContent.body;

        const attachments: Attachment[] = [];

        if (decryptedContent.attachments && decryptedContent.attachments) {
          decryptedContent.attachments.forEach((file) => {
            attachments.push({
              path: `${PINATA_GATEWAY_URL}${file.hash}${file.name ? `/${file.name}` : ""}`,
              name: file.name ?? file?.meta?.name ?? "",
            });
          });
        }

        const payments: PaymentConfig[] = [];

        if (decryptedContent.solanaPay && decryptedContent.solanaPay.length) {
          decryptedContent.solanaPay.map((pay) => {
            payments.push(pay);
          });
        }
        return [
          div.innerHTML,
          attachments,
          div.textContent?.trim() ?? "",
          payments,
          decryptedContent.attachments ?? [],
        ];
      } catch {
        return ["", [], "", [], []];
      }
    }, [content, mail, data]);

  const subject = useMemo(() => {
    if (mail && isInternalMail(mail?.version as StorageVersion)) {
      return mail?.subject;
    }
    if (mail && data) {
      return decryptData(mail.subject, mail.iv, data);
    }
    return "";
  }, [data, mail]);

  return {
    content: mailContent,
    attachments,
    textContent: textContent,
    isLoading: !isFetched || isLoading,
    mail,
    subject,
    payments,
    hasSmartView:
      (attachments && attachments.length > 0) ||
      (payments && payments.length > 0),
    attachmentRef,
    isInternalMail: isInternalMail(mail?.version as StorageVersion),
  };
};
