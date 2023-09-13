
import {
  Connection,
  Keypair,
  SystemProgram,
  TransactionInstruction
} from "@solana/web3.js";
import { getProgramInstanceInscriptions } from "@libreplex/shared-ui";
import { IExecutorParams } from "@libreplex/shared-ui";
import {
  GenericTransactionButton,
  GenericTransactionButtonProps,
} from "@libreplex/shared-ui";
import { IRpcObject } from "@libreplex/shared-ui";
import { ITransactionTemplate } from "@libreplex/shared-ui";
import { Inscription } from "@libreplex/shared-ui";

import { notify } from "@libreplex/shared-ui";

export enum AssetType {
  Image,
  Ordinal,
}

// export type Asset = {
//   type: AssetType.Image,
// } | {
//   type: AssetType.Ordinal
// }

export interface IResizeInscription {
  inscription: IRpcObject<Inscription>;
  size: number;
}

// start at 0. We can extend as needed
export const ORDINAL_DEFAULT_LENGTH = 0;

export const MAX_CHANGE = 4096;

export const resizeInscription = async (
  { wallet, params }: IExecutorParams<IResizeInscription>,
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

  const inscriptionsProgram = getProgramInstanceInscriptions(connection, {
    ...wallet,
    payer: Keypair.generate(),
  });

  const { inscription, size } = params;

  let sizeRemaining = size - inscription.item.size;
  while (Math.abs(sizeRemaining) > 0) {
    const instructions: TransactionInstruction[] = [];
    // console.log({
    //   sizeRemaining,
    //   increase: Math.min(sizeRemaining, MAX_CHANGE),
    //   decrease: -Math.max(sizeRemaining, -MAX_CHANGE),
    // });

    const instruction = await inscriptionsProgram.methods
      .resizeInscription({
        change:
          sizeRemaining > 0
            ? {
                increase: {
                  amount: Math.min(sizeRemaining, MAX_CHANGE),
                },
              }
            : {
                reduce: {
                  amount: -Math.max(sizeRemaining, -MAX_CHANGE),
                },
              },
        expectedStartSize: Math.abs(sizeRemaining),
        targetSize: size,
      })
      .accounts({
        inscription: inscription.pubkey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    instructions.push(instruction);

    data.push({
      instructions,
      description: `Resize inscription`,
      signers: [],
    });

    sizeRemaining =
      sizeRemaining > 0
        ? Math.max(0, sizeRemaining - MAX_CHANGE)
        : Math.min(0, sizeRemaining + MAX_CHANGE);
  }

  console.log({ data });

  return {
    data,
  };
};

export const ResizeInscriptionTransactionButton = (
  props: Omit<
    GenericTransactionButtonProps<IResizeInscription>,
    "transactionGenerator"
  >
) => {
  return (
    <>
      <GenericTransactionButton<IResizeInscription>
        text={"Resize"}
        transactionGenerator={resizeInscription}
        onError={(msg) => notify({ message: msg })}
        {...props}
      />
    </>
  );
};
