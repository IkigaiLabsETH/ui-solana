import { BorshCoder, IdlAccounts, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { LibrePlexProgramContext } from "anchor/LibrePlexProgramContext";
import bs58 from "bs58";
import { sha256 } from "js-sha256";
import { useContext, useMemo } from "react";
import { Libreplex } from "types/libreplex";
import { useGpa } from "./gpa";
import { LibreplexWithOrdinals } from "anchor/getProgramInstance";
import { useFetchSingleAccount } from "./singleAccountInfo";

export type Group = IdlAccounts<Libreplex>["group"];

export const decodeGroup =
  (program: Program<LibreplexWithOrdinals>) =>
  (buffer: Buffer, pubkey: PublicKey) => {
    const coder = new BorshCoder(program.idl);
    let group;
    try {
      group = coder.accounts.decode<Group>("group", buffer);
    } catch (e) {
      group = null;
    }

    return {
      item: group,
      pubkey,
    };
  };

export const useGroupById = (
  groupKey: PublicKey | null,
  connection: Connection
) => {
  const program = useContext(LibrePlexProgramContext);

  // do not remove

  const q = useFetchSingleAccount(groupKey, connection);

  const decoded = useMemo(() => {
    try {
      const obj = decodeGroup(program)(q.data.item, groupKey);
      return obj;
    } catch (e) {
      return null;
    }
  }, [groupKey, program, q.data?.item]);
  return decoded;
};

export const useGroupsByAuthority = (
  authority: PublicKey | undefined,
  connection: Connection
) => {
  const program = useContext(LibrePlexProgramContext);

  const filters = useMemo(() => {
    if (authority) {
      const filters = [
        {
          memcmp: {
            offset: 40,
            bytes: authority.toBase58(),
          },
        },
        {
          memcmp: {
            offset: 0,
            bytes: bs58.encode(sha256.array("account:Group").slice(0, 8)),
          },
        },
      ];
      return filters;
    } else {
      return null;
    }
  }, [authority]);

  const q = useGpa(program.programId, filters, connection, [
    authority?.toBase58() ?? "",
    "groupsByAuthority",
  ]);

  const decoded = useMemo(
    () => ({
      ...q,
      data:
        q?.data
          ?.map((item) => decodeGroup(program)(item.item, item.pubkey))
          .filter((item) => item.item) ?? [],
    }),

    [program, q]
  );

  return decoded;
};
