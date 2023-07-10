import {
  Box,
  BoxProps,
  Button,
  Collapse,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  LinkBox,
  LinkOverlay,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { CollectionsPanel } from "./collections/CollectionsPanel";
import useSelectedPermissions from "./permissions/useSelectedPermissions";
import { BaseMetadataPanel } from "./metadata/MetadataPanel";

import {
  CopyPublicKeyButton,
  LibrePlexProgramContext,
  PROGRAM_ID_METADATA,
  useGroupById,
  useMetadataById,
  useMetadataByMintId,
  useNetworkConfiguration,
  usePublicKeyOrNull,
} from "shared-ui";
import { JsonViewer } from "./JsonViewer";
import dynamic from "next/dynamic";
import { PublicKey } from "@solana/web3.js";

const ReactJson = dynamic(import("react-json-view"), { ssr: false });

export const LibreScanner = () => {
  const [mintId, setMintId] = useState<string>("");
  const mintPublicKey = usePublicKeyOrNull(mintId);

  const { connection } = useConnection();
  const metadata = useMetadataByMintId(mintPublicKey, connection);

  const { setProgramId, program } = useContext(LibrePlexProgramContext);

  const [programIdOverride, setProgramIdOverride] = useState<string>("");

  const programIdOverridePubkey = usePublicKeyOrNull(programIdOverride);

  const group = useGroupById(metadata?.item.group, connection);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: "600px",
      }}
      rowGap={3}
      pb={10}
    >
      <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-10 pb-5">
        LibreScan - View Libre Metadata
      </h1>
      <FormControl>
        <FormLabel>Mint ID</FormLabel>

        <Input
          placeholder="Mint ID"
          value={mintId}
          onChange={(e) => setMintId(e.currentTarget.value)}
        />
      </FormControl>
      <HStack>
        <Text>Program ID</Text>{" "}
        <CopyPublicKeyButton publicKey={program.programId.toBase58()} />
      </HStack>
      <HStack>
        <FormControl>
          <Input
            placeholder="Override program id"
            value={programIdOverride}
            onChange={(e) => setProgramIdOverride(e.currentTarget.value)}
          />
        </FormControl>
        {programIdOverridePubkey &&
          !programIdOverridePubkey.equals(program.programId) && (
            <Button
              onClick={() => {
                setProgramId(programIdOverridePubkey);
              }}
            >
              Override
            </Button>
          )}
        {!program.programId?.equals(new PublicKey(PROGRAM_ID_METADATA)) && (
          <Button
            onClick={() => {
              setProgramId(new PublicKey(PROGRAM_ID_METADATA));
            }}
          >
            Default
          </Button>
        )}
      </HStack>
      <Box sx={{ overflow: "auto", display :"flex", flexDirection:'column' }} gap={3}>
        <HStack>
          <Heading size="md">Metadata</Heading>

          {metadata && (
            <CopyPublicKeyButton publicKey={metadata.pubkey.toBase58()} />
          )}
        </HStack>
        <ReactJson theme="monokai" src={metadata ?? {}} />
        <HStack>
          <Heading size="md">Group</Heading>

          {metadata && (
            <CopyPublicKeyButton
              publicKey={metadata?.item?.group?.toBase58()}
            />
          )}
        </HStack>
        <ReactJson theme="monokai" src={group ?? {}} />
      </Box>
    </Box>
  );
};
