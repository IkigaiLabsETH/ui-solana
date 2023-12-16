import {
  GenericTransactionButton,
  GenericTransactionButtonProps,
  IExecutorParams,
  ITransactionTemplate,
  PROGRAM_ID_INSCRIPTIONS,
  getInscriptionDataPda,
  getInscriptionPda,
  getInscriptionV3Pda,
  getLegacyMetadataPda
} from "@libreplex/shared-ui";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { notify } from "@libreplex/shared-ui";
import { getProgramInstanceLegacyInscriptions } from "@libreplex/shared-ui";
import { ITransaction } from "../../transactions/ITransaction";

import { AccountLayout } from "@solana/spl-token";
import { getLegacyInscriptionPda } from "@libreplex/shared-ui";
import React from "react";

export interface IResizeLegacyInscription {
  mint: PublicKey;
  targetSize: number;
  currentSize: number;
}

export const MAX_CHANGE = 8192;

export const resizeLegacyInscription = async (
  { wallet, params }: IExecutorParams<IResizeLegacyInscription>,
  connection: Connection,
  cluster: string
): Promise<{
  data?: ITransactionTemplate[];
  error?: any;
}> => {
  const data: ITransactionTemplate[] = [];

  const legacyInscriptionsProgram = getProgramInstanceLegacyInscriptions(
    connection,
    wallet
  );

  if (!legacyInscriptionsProgram) {
    throw Error("IDL not ready");
  }

  // have to check the owner here - unfortunate as it's expensive
  const { mint, targetSize, currentSize } = params;

  const inscriptionData = getInscriptionDataPda(mint)[0];
  const legacyInscription = getLegacyInscriptionPda(mint);
  const legacyMetadata= getLegacyMetadataPda(mint)[0];

  let sizeRemaining = targetSize - currentSize;
  const instructions: TransactionInstruction[] = [];

  const inscriptionV3 = getInscriptionV3Pda(mint)[0];


  console.log({legacyInscription: legacyInscription.toBase58()});

  while (Math.abs(sizeRemaining) > 0) {
    console.log({ change:
      sizeRemaining > 0
        ? Math.min(sizeRemaining, MAX_CHANGE)
        : -Math.max(sizeRemaining, -MAX_CHANGE),
    expectedStartSize: Math.abs(sizeRemaining),
    targetSize});
    const instruction = await legacyInscriptionsProgram.methods
      .resizeLegacyInscriptionAsUauthV3({
        change:
          sizeRemaining > 0
            ? Math.min(sizeRemaining, MAX_CHANGE)
            : -Math.max(sizeRemaining, -MAX_CHANGE),
        expectedStartSize: Math.abs(sizeRemaining),
        targetSize,
      })
      .accounts({
        authority: wallet.publicKey, // this needs to be either the holder or update auth
        payer: wallet.publicKey,
        mint,
        inscriptionV3,
        inscriptionData,
        legacyInscription,
        legacyMetadata,
        systemProgram: SystemProgram.programId,
        inscriptionsProgram: PROGRAM_ID_INSCRIPTIONS,
      })
      .instruction();
    instructions.push(instruction);

    sizeRemaining =
      sizeRemaining > 0
        ? Math.max(0, sizeRemaining - MAX_CHANGE)
        : Math.min(0, sizeRemaining + MAX_CHANGE);
  }

  const blockhash = await connection.getLatestBlockhash();
  const retval: ITransaction = {
    partiallySignedTxs: [],
  };
  const remainingInstructions: TransactionInstruction[] = [...instructions];
  while (remainingInstructions.length > 0) {
    const instructionBatch = remainingInstructions.splice(0, 4);
    const transaction = new Transaction();
    transaction.feePayer = new PublicKey(wallet.publicKey);
    transaction.recentBlockhash = blockhash.blockhash;
    transaction.add(
      // ixRankPageCurrent, ixRankPageNext,
      ...instructionBatch
    );
    // confirms the validation hash
    // transaction.partialSign(legacySignerKeypair);
    retval.partiallySignedTxs.push({
      blockhash,
      buffer: [...transaction.serialize({ verifySignatures: false })],
      signatures: transaction.signatures
        .filter((signature) => signature.signature)
        .map((signature) => ({
          signature: [...signature.signature!],
          pubkey: signature.publicKey.toBase58(),
        })),
    });
  }

  for (const serializedTx of retval.partiallySignedTxs) {
    let instructions: TransactionInstruction[] = [];

    instructions.push(...Transaction.from(serializedTx.buffer).instructions);
    data.push({
      instructions,
      signers: [],
      signatures: serializedTx.signatures,
      description: "Resize legacy inscription",
      blockhash: serializedTx.blockhash,
    });
  }

  console.log({ data });

  return {
    data,
  };
};

export const ResizeLegacyMetadataAsUAuthTransactionButton = (
  props: Omit<
    GenericTransactionButtonProps<IResizeLegacyInscription>,
    "transactionGenerator"
  >
) => {
  return (
    <GenericTransactionButton<IResizeLegacyInscription>
      text={`Resize`}
      transactionGenerator={resizeLegacyInscription}
      onError={(msg) => notify({ message: msg ?? "Unknown error" })}
      {...props}
    />
  );
};
