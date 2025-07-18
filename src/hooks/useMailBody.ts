import { useEncryptionKey } from "@hooks/useEncryptionKey";
import { useGetInbox } from "@hooks/useGetInbox";

import { useMemo } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import {
  MailBoxLabels,
  QueryKeys,
  type Attachment,
  type FormattedMailBox,
  type PaymentConfig,
} from "src/types";
import { decryptData } from "@utils/string";
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
  const getMailContent = async (fileId: string) => {
    const result = await fetchContent(
      `${import.meta.env.VITE_SOLMAIL_IRYS_BASE_URL}${fileId}`
    );
    return result;
  };

  const {
    data: content,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [QueryKeys.MAIL_BODY, id],
    queryFn: mail && mail.body ? () => getMailContent(mail.body) : skipToken,
    enabled: !!(id && mail && mail.body),
  });

  const [mailContent, attachments, textContent, payments] = useMemo((): [
    string,
    Attachment[],
    string,
    PaymentConfig[],
  ] => {
    if (!content) return ["", [], "", []];

    try {
      const html = decryptData(content, mail?.iv, data);
      if (!html) return ["", [], "", []];

      const div = document.createElement("div");
      div.innerHTML = html;

      const images: Attachment[] = [];

      div.querySelectorAll("img,[data-file]").forEach((img) => {
        images.push({
          src: img.getAttribute("data-id") || "",
          name: img.getAttribute("data-name") || "",
          size: img.getAttribute("data-size") || "",
          type: img.getAttribute("data-type") || "",
        });
        img.remove();
      });
      const payments: PaymentConfig[] = [];
      div.querySelectorAll(".payment-button").forEach((button) => {
        payments.push({
          recipient: button.getAttribute("data-recipient") ?? "",
          amount: button.getAttribute("data-amount") ?? "",
          message: button.getAttribute("data-message") ?? "",
          token: button.getAttribute("data-tokenaddress") ?? "",
        });
        div.removeChild(button);
      });
      return [div.innerHTML, images, div.textContent?.trim() ?? "", payments];
    } catch {
      return ["", [], "", []];
    }
  }, [content, mail?.iv, data]);

  const subject = useMemo(() => {
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
  };
};
