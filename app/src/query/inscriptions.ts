import { BorshCoder, IdlAccounts, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { LibrePlexProgramContext } from "anchor/LibrePlexProgramContext";
import { useContext, useMemo, useEffect } from "react";
import { Libreplex } from "types/libreplex";
import { Inscriptions } from "types/inscriptions";
import { OrdinalsProgramContext } from "anchor/InscriptionsProgramProvider";
import { useFetchSingleAccount } from "./singleAccountInfo";

export type Inscription = IdlAccounts<Inscriptions>["inscription"] & {dataBytes: number[]};

export const decodeInscription =
  (program: Program<Inscriptions>) => (buffer: Buffer, pubkey: PublicKey) => {
    const coder = new BorshCoder(program.idl);
    const inscription = {
      ...coder.accounts.decode<Inscription>("inscription", buffer),
      dataBytes: [...buffer.subarray(76)],
    };

    return {
      item: inscription ?? null,
      pubkey,
    };
  };

// export const useInscriptionsById = (
//   ordinalKeys: PublicKey[],
//   connection: Connection
// ) => {
//   const program  = useContext(OrdinalsProgramContext);

//   const q = useFetchMultiAccounts(ordinalKeys, connection);

//   useEffect(()=>{
//     console.log({q})
//   },[q])
//   const decoded = useMemo(
//     () => ({
//       ...q,
//       data:
//         q?.data
//           ?.map((item) => {
//             try {
//               const obj = decodeInscription(program)(item.item, item.pubkey);
//               return obj;
//             } catch (e) {
//               console.log(e);
//               return null;
//             }
//           })
//           .filter((item) => item) ?? [],
//     }),

//     [program, q]
//   );

//   return decoded;

//   // return useQuery<IRpcObject<Collection>[]>(collectionKeys, fetcher);
// };

export const useInscriptionById = (
  ordinalKey: PublicKey,
  connection: Connection
) => {
  const program = useContext(OrdinalsProgramContext);

  const q = useFetchSingleAccount(ordinalKey, connection);

  const decoded = useMemo(() => {
    try {
      const obj = decodeInscription(program)(q.data.item, ordinalKey);
      return obj;
    } catch (e) {
      return null;
    }
  }, [ordinalKey, program, q.data?.item]);

  return decoded;

  // return useQuery<IRpcObject<Collection>[]>(collectionKeys, fetcher);
};
