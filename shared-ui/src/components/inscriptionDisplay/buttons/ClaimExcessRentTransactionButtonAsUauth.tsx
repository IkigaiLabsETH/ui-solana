import {
  CopyPublicKeyButton,
  GenericTransactionButton,
  GenericTransactionButtonProps,
  IExecutorParams,
  ITransactionTemplate,
  LibreWallet,
  PROGRAM_ID_INSCRIPTIONS,
  getInscriptionDataPda,
  getInscriptionPda,
  getLegacyInscriptionPda,
  getLegacyMetadataPda,
  getProgramInstanceLegacyInscriptions,
  useInscriptionDataForRoot,
  useInscriptionForRoot,
  useLegacyMetadataByMintId,
} from "@libreplex/shared-ui";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";

import {HStack, Text} from "@chakra-ui/react";

import { notify } from "@libreplex/shared-ui";
import React, { useMemo } from "react";
import { getRentFromDataLength } from "../../../components/useRentForDataLength";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export interface IRemoveFromGroup {
  mint: PublicKey;
}

export const MAX_CHANGE = 4096;

export const claimExcessRentTransactionButton = async (
  { wallet, params }: IExecutorParams<IRemoveFromGroup>,
  connection: Connection
): Promise<{
  data?: ITransactionTemplate[];
  error?: any;
}> => {
  if (!wallet.publicKey) {
    throw Error("Wallet key missing");
  }

  const data: ITransactionTemplate[] = [];

  const libreplexLegacyProgram = getProgramInstanceLegacyInscriptions(
    connection,
    new LibreWallet(Keypair.generate())
  );

  const { mint } = params;

  const instructions: TransactionInstruction[] = [];

  const legacyMetadata = await getLegacyMetadataPda(mint)[0];
  const inscription = await getInscriptionPda(mint)[0];
  const inscriptionData = await getInscriptionDataPda(mint)[0];
  const legacyInscription = await getLegacyInscriptionPda(mint);

  console.log({
    authority: wallet.publicKey,
    payer: wallet.publicKey,
    mint,
    legacyMetadata,
    inscription,
    inscriptionData,
    legacyInscription,
    systemProgram: SystemProgram.programId,
    inscriptionsProgram: PROGRAM_ID_INSCRIPTIONS,
  });
  const instruction = await libreplexLegacyProgram.methods
    .claimExcessRentAsUauth()
    .accounts({
      authority: wallet.publicKey,
      payer: wallet.publicKey,
      mint,
      legacyMetadata,
      inscription,
      inscriptionData,
      legacyInscription,
      systemProgram: SystemProgram.programId,
      inscriptionsProgram: PROGRAM_ID_INSCRIPTIONS,
    })
    .instruction();
  instructions.push(instruction);

  const blockhash = await connection.getLatestBlockhash();

  data.push({
    instructions,
    description: `Claim excess rent`,
    signers: [],
    blockhash,
  });

  console.log({ data });

  return {
    data,
  };
};

export const ClaimExcessRentTransactionButton = (
  props: Omit<
    GenericTransactionButtonProps<IRemoveFromGroup>,
    "transactionGenerator"
  >
) => {
  const { data: inscriptionData } = useInscriptionDataForRoot(
    props.params.mint
  );
  const { inscription } = useInscriptionForRoot(props.params.mint);

  const targetLamports = useMemo(
    () =>
      inscription.data
        ? getRentFromDataLength(inscription.data.item.size)
        : 0,
    [inscriptionData, inscription]
  );

  const { connection } = useConnection();
  const metadata = useLegacyMetadataByMintId(props.params.mint, connection);

  const lamportDiff = useMemo(() => {
    return inscriptionData && targetLamports
      ? Number(inscriptionData.item.balance) -
          Math.max(targetLamports, 70_490_000)
      : 0;
  }, [inscriptionData, inscription]);

  const solDiff = useMemo(() => lamportDiff / 1_000_000_000, [lamportDiff]);

  const { publicKey } = useWallet();

  const amIUauth = useMemo(
    () =>
      publicKey &&
      metadata &&
      publicKey?.equals(metadata.data.item.updateAuthority),
    [publicKey, metadata]
  );
  return amIUauth ? (
    <>
      {solDiff > 0 ? (
        <GenericTransactionButton<IRemoveFromGroup>
          text={`Claim Excess Rent (${solDiff.toFixed(2)})`}
          transactionGenerator={claimExcessRentTransactionButton}
          onError={(msg) => notify({ message: msg })}
          {...props}
        />
      ) : (
        <>No rent to reclaim</>
      )}
    </>
  ) : (
    <>
      {metadata.data && (
        <HStack>
           <Text>Update auth</Text>
          <CopyPublicKeyButton
            publicKey={metadata.data.item.updateAuthority.toBase58()}
          />
        </HStack>
      )}
    </>
  );
};
