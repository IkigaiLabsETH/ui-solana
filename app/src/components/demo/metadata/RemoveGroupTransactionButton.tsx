import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  LibreWallet,
  Metadata,
  PROGRAM_ID_METADATA,
  getProgramInstanceMetadata,
} from  "@libreplex/shared-ui";
import { IExecutorParams } from  "@libreplex/shared-ui";
import {
  GenericTransactionButton,
  GenericTransactionButtonProps,
} from  "@libreplex/shared-ui";
import { IRpcObject } from  "@libreplex/shared-ui";
import { ITransactionTemplate } from  "@libreplex/shared-ui";
import { Inscription } from  "@libreplex/shared-ui";

import { notify } from  "@libreplex/shared-ui";

export interface IRemoveFromGroup {
  metadata: IRpcObject<Metadata>;
}

export const MAX_CHANGE = 4096;

export const removeGroup = async (
  { wallet, params }: IExecutorParams<IRemoveFromGroup>,
  connection: Connection
): Promise<{
  data?: ITransactionTemplate[];
  error?: any;
}> => {
  if (!wallet.publicKey) {
    throw Error("Wallet key missing");
  }

  const data: {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    description: string;
  }[] = [];

  const metadataProgram = getProgramInstanceMetadata(
    new PublicKey(PROGRAM_ID_METADATA),
    connection,
    new LibreWallet(Keypair.generate())
  );

  const { metadata } = params;

  const instructions: TransactionInstruction[] = [];
  // console.log({
  //   sizeRemaining,
  //   increase: Math.min(sizeRemaining, MAX_CHANGE),
  //   decrease: -Math.max(sizeRemaining, -MAX_CHANGE),
  // });

  const instruction = await metadataProgram.methods
    .removeMetadataFromCollection()
    .accounts({
      metadata: metadata.pubkey,
      collection: metadata.item.collection,
      delegatedGroupWidePermissions: null,
      collectionAuthority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
  instructions.push(instruction);

  data.push({
    instructions,
    description: `Remove metadata from group`,
    signers: [],
  });

  console.log({ data });

  return {
    data,
  };
};

export const RemoveGroupTransactionButton = (
  props: Omit<
    GenericTransactionButtonProps<IRemoveFromGroup>,
    "transactionGenerator"
  >
) => {
  return (
    <>
      <GenericTransactionButton<IRemoveFromGroup>
        text={"Remove"}
        transactionGenerator={removeGroup}
        onError={(msg) => notify({ message: msg })}
        {...props}
      />
    </>
  );
};
