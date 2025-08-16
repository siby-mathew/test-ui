import { skipToken, useQuery } from "@tanstack/react-query";

import {
  AnchorProvider,
  Program,
  type ProgramAccount,
} from "@coral-xyz/anchor";
import {
  type FetchAllMailsResult,
  type FormattedMailBox,
  type SolMail,
  type SolMailV2,
  MailBoxLabels,
  QueryKeys,
} from "src/types";
import { useMemo, useCallback, useEffect, useRef } from "react";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import type { Solmail } from "@integrations/idl/solmail/solmail";
import { useMailBoxGraphql } from "@hooks/useMailGraphql";
import { isOlderThan } from "@utils/time";
import { usePrivyWallet } from "./usePrivyWallet";

const fetchAllMails = async (
  program: Program<Solmail>,
  provider: AnchorProvider,
  type: MailBoxLabels
) => {
  try {
    const filter =
      MailBoxLabels.outbox === type
        ? [
            {
              memcmp: {
                offset: 8,
                bytes: provider.publicKey.toBase58(),
              },
            },
          ]
        : [
            {
              memcmp: {
                offset: 40,
                bytes: provider.publicKey.toBase58(),
              },
            },
          ];
    const result: unknown = await Promise.all([
      program.account.solMailV2.all(filter),
      program.account.solMail.all(filter),
    ]);

    return Array.isArray(result) && result.length ? result.flat() : [];
  } catch {
    throw "Failed to fetch inbox";
  }
};

export const useGetInbox = (type: MailBoxLabels = MailBoxLabels.inbox) => {
  useMailBoxGraphql();
  const { program, provider } = useGetMailProgramInstance();
  const { address } = usePrivyWallet();
  const { data, isLoading, refetch, isRefetching } =
    useQuery<FetchAllMailsResult>({
      queryKey: [QueryKeys.MAILBOX, type],
      queryFn: program
        ? () => fetchAllMails(program, provider, type)
        : skipToken,
      staleTime: 60 * 1000 * 30,
    });

  const getLabelIdentifier = (
    item: ProgramAccount<SolMailV2> | ProgramAccount<SolMail>
  ): MailBoxLabels => {
    if (item && "label" in item.account) {
      const label = Object.keys(item.account.label)[0];
      if (label && label.trim()) {
        switch (label.toLowerCase()) {
          case MailBoxLabels.inbox:
            return MailBoxLabels.inbox;

          case MailBoxLabels.spam:
            return MailBoxLabels.spam;

          case MailBoxLabels.outbox:
            return MailBoxLabels.outbox;

          case MailBoxLabels.trash:
            return MailBoxLabels.trash;

          default:
            return MailBoxLabels.unknown;
        }
      }
    }
    return MailBoxLabels.unknown;
  };
  const merge = useCallback(
    (current: FormattedMailBox[] = [], arr: FetchAllMailsResult) => {
      if (arr && arr.length > 0) {
        arr.forEach((item) => {
          const account = item.account;
          const [user0, user1] =
            account.from.toString() >= account.to.toString()
              ? [account.from, account.to]
              : [account.to, account.from];
          const encKey = `${user0.toString()}:${user1.toString()}`;

          current[current.length] = {
            ...account,
            isV1: item && "label" in item,
            user0: user0,
            user1: user1,
            encKey,
            labelIdentifier: getLabelIdentifier(item),
            id: item.publicKey.toString(),
          };
        });
      }
      return current;
    },
    []
  );
  const mail = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }

    let formattedMailbox: FormattedMailBox[] = [];

    formattedMailbox = merge(formattedMailbox, data);

    formattedMailbox = formattedMailbox.sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt)
    );

    if (type && [MailBoxLabels.spam, MailBoxLabels.trash].indexOf(type) > -1) {
      formattedMailbox = formattedMailbox.filter((mail) => {
        return mail.labelIdentifier === type;
      });
    } else {
      formattedMailbox = formattedMailbox.filter((mail) => {
        return (
          [MailBoxLabels.spam, MailBoxLabels.trash].indexOf(
            mail.labelIdentifier
          ) === -1
        );
      });
    }

    return formattedMailbox;
  }, [data, merge, type]);

  const updated = useRef<number>(new Date().getTime());

  useEffect(() => {
    const handleFocus = () => {
      if (!updated.current || isOlderThan(updated.current))
        if (!isLoading && !isRefetching) {
          refetch();
          updated.current = new Date().getTime();
        }
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isLoading, isRefetching, refetch]);

  useEffect(() => {
    let listener: number;
    if (program) {
      listener = (program as any).addEventListener(
        "mailV2SendEvent",
        (event: any) => {
          if (
            address &&
            event.to &&
            event.to?.toString() === address.toString()
          ) {
            refetch();
          }
        }
      );
    }
    return () => {
      if (program) {
        program.removeEventListener(listener);
      }
    };
  }, [address, program, refetch]);

  return {
    mail: mail as FormattedMailBox[],
    data,
    isLoading,
    refetch,
    isPending: isRefetching,
  };
};
