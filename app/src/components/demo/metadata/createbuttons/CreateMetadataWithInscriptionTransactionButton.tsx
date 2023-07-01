import { NEXT_PUBLIC_SHDW_ACCOUNT } from "@/environmentvariables";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  GenericTransactionButton,
  GenericTransactionButtonProps,
  IExecutorParams,
  ITransactionTemplate,
  PROGRAM_ID_INSCRIPTIONS, getMetadataPda, getProgramInstanceMetadata
} from "shared-ui";

import { notify } from "shared-ui";

export enum AssetType {
  Image,
  Inscription,
}

// export type Asset = {
//   type: AssetType.Image,
// } | {
//   type: AssetType.Ordinal
// }

export interface ICreateMetadata {
  name: string;
  symbol: string;
  assetType: AssetType;
  description: string | null;
  mint: Keypair;
  extension: {
    attributes: number[]
  } | null
}

// start at 0. We can extend as needed
export const ORDINAL_DEFAULT_LENGTH = 0;

export const createMetadata = async (
  { wallet, params }: IExecutorParams<ICreateMetadata>,
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

  const librePlexProgram = getProgramInstanceMetadata(connection, {
    ...wallet,
    payer: Keypair.generate(),
  });

  const { assetType, symbol, name, description, mint, extension } = params;

  const [metadata] = getMetadataPda(mint.publicKey);

  /// for convenience we are hardcoding the urls to predictable shadow drive ones for now.
  /// anything could be passed in obviously. !WE ASSUME PNG FOR NOW!

  let instructions: TransactionInstruction[] = [];

  const mintLamports = await getMinimumBalanceForRentExemptMint(connection);

  const signers = [mint];

  const ata = getAssociatedTokenAddressSync(mint.publicKey, wallet.publicKey);

  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: mintLamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMint2Instruction(
      mint.publicKey,
      0,
      wallet.publicKey,
      wallet.publicKey,
      TOKEN_PROGRAM_ID
    ),
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ata,
      wallet.publicKey,
      mint.publicKey
    ),
    createMintToInstruction(
      mint.publicKey,
      ata,
      wallet.publicKey,
      1,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  console.log("Creating instruction");

  if (assetType === AssetType.Image) {
    const url = `https://shdw-drive.genesysgo.net/${NEXT_PUBLIC_SHDW_ACCOUNT}/${mint.publicKey.toBase58()}.png`;

    const instruction = await librePlexProgram.methods
      .createMetadata({
        updateAuthority: wallet.publicKey,
        name,
        symbol,
        description,
        asset: {
          image: {
            url,
          },
        },
        extension: extension ? {
          nft: {
            attributes: Buffer.from(extension.attributes),
            signers: [],
            royalties: null,
            license: null
          }
        } : null
      })
      .accounts({
        metadata,
        mint: mint.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    instructions.push(instruction);
  } else if (assetType === AssetType.Inscription) {
    const ordinal = Keypair.generate();

    const ordinalLamports = await connection.getMinimumBalanceForRentExemption(
      8 + 32 + 32 + 4 + 4 + ORDINAL_DEFAULT_LENGTH
    );
    signers.push(ordinal);
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: ordinal.publicKey,
        space: 8 + 32 + 32 + 4 + 4 + ORDINAL_DEFAULT_LENGTH,
        lamports: ordinalLamports,
        programId: new PublicKey(PROGRAM_ID_INSCRIPTIONS),
      })
    );

    const instruction = await librePlexProgram.methods
      .createOrdinalMetadata({
        updateAuthority: wallet.publicKey,
        name,
        symbol,
        description,
        inscriptionInput: {
          maxDataLength: ORDINAL_DEFAULT_LENGTH,
          authority: wallet.publicKey,
        },
      })
      .accounts({
        metadata,
        ordinal: ordinal.publicKey,
        mint: mint.publicKey,
        systemProgram: SystemProgram.programId,
        inscriptionsProgram: new PublicKey(PROGRAM_ID_INSCRIPTIONS),
      })
      .instruction();
    instructions.push(instruction);
  }

  console.log("INSTRUCTION CREATED");

  data.push({
    instructions,
    description: `Create metadata`,
    signers,
  });

  console.log({ data });

  return {
    data,
  };
};

export const CreateMetadataTransactionButton = (
  props: Omit<
    GenericTransactionButtonProps<ICreateMetadata>,
    "transactionGenerator"
  >
) => {
  return (
    <>
      <GenericTransactionButton<ICreateMetadata>
        text={"Create metadata"}
        transactionGenerator={createMetadata}
        onError={(msg) => notify({ message: msg })}
        {...props}
      />
    </>
  );
};
