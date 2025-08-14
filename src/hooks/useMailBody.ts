import { useEncryptionKey } from "@hooks/useEncryptionKey";
import { useGetInbox } from "@hooks/useGetInbox";

import { useEffect, useMemo } from "react";
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
import { isLegacyMail, isMailOriginMobile } from "@utils/legacy/isLegacyMail";

type MailBodyResponse = {
  body: string;
  attachments?: {
    id: string;
    files: string[];
  };
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
} => {
  const { mail: inbox } = useGetInbox(context);

  const mail =
    inbox && inbox.length > 0
      ? inbox.find((item) => id && item.id?.toString() === id)
      : null;

  const { data } = useEncryptionKey(mail?.encKey ?? "");
  const getMailContent = async (body: string, version: StorageVersion) => {
    console.log(body, version);
    if (id === "B49em9dGYg8cPxj9DhL2Efan2nmXoJkZbRgQT9SZgTKs") {
      console.log(body);
    }

    if (isLegacyMail(version as StorageVersion)) {
      return "";
    }

    const URL = `${PINATA_GATEWAY_URL}${body}${isMailOriginMobile(version as StorageVersion) ? `` : `body.txt`}`;

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

  const [mailContent, attachments, textContent, payments] = useMemo((): [
    string,
    Attachment[],
    string,
    PaymentConfig[],
  ] => {
    if (!content || !content)
      return [
        "",
        [],
        isLegacyMail(mail?.version as StorageVersion)
          ? "[deprecated content]" + mail?.version
          : "",
        [],
      ];

    try {
      const decryptedContent = JSON.parse(
        decryptData(content ?? "", mail?.iv, data)
      ) as unknown as MailBodyResponse;

      if (!decryptedContent) return ["", [], "", []];

      const div = document.createElement("div");
      div.innerHTML = decryptedContent.body;

      const attachments: Attachment[] = [];

      if (decryptedContent.attachments && decryptedContent.attachments.id) {
        decryptedContent.attachments.files.forEach((file) => {
          attachments.push({
            path: `${PINATA_GATEWAY_URL}${decryptedContent.attachments?.id}/${file}`,
            name: file,
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
      ];
    } catch {
      return ["", [], "", []];
    }
  }, [content, mail, data]);

  const subject = useMemo(() => {
    if (mail && data) {
      return decryptData(mail.subject, mail.iv, data);
    }
    return "";
  }, [data, mail]);

  useEffect(() => {
    fetchContent(
      `${import.meta.env.VITE_SOLMAIL_PINATA_BASE_URL}Qmbzd23TX18xE1YAfmGMVxyzsZAnR1TjCDnWthXAsh8PuW`
    );
  }, []);

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
  };
};
