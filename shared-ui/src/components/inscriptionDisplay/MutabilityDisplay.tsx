import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Inscription,
  useLegacyMetadataByMintId,
  useMetadataByMintId,
} from "../../sdk";
import { IRpcObject } from "../executor";

import { HStack, IconButton, Text, VStack, Heading } from "@chakra-ui/react";
import { SystemProgram } from "@solana/web3.js";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MakeLegacyInscriptionImmutableTransactionButton } from "./buttons/MakeLegacyInscriptionImmutableTransactionButton";
import { getLegacySignerPda } from "../../pdas";
import { PROGRAM_ID_LEGACY_INSCRIPTION } from "../../pdas/constants";
import { getLegacyInscriptionPda } from "../../pdas/getLegacyInscriptionPda";
export const MutabilityDisplay = ({
  inscription,
}: {
  inscription: IRpcObject<Inscription>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isMutable = useMemo(
    () => !inscription?.item?.authority.equals(SystemProgram.programId),
    [inscription]
  );

  const variants = {
    rotate: { rotate: [0, 90, 0], transition: { duration: 0.1 } },
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    stop: { rotate: [0, -90, 0], transition: { duration: 0.1 } },
  };

  const { connection } = useConnection();

  const { data: metadata } = useLegacyMetadataByMintId(
    inscription?.item.root,
    connection
  );

  const { publicKey } = useWallet();

  const legacySigner = useMemo(
    () => getLegacyInscriptionPda(inscription?.item.root),
    [inscription?.item.root]
  );

  //   useEffect(() => {
  //     console.log({ legacySigner, publicKey, metadata });
  //   }, [legacySigner, publicKey, metadata]);

  const amIUpdateAuth = useMemo(
    () => metadata?.item.updateAuthority.toBase58() === publicKey?.toBase58(),
    [inscription, metadata, legacySigner]
  );
  return (
    <VStack className="border-2 m-2 rounded-md" p={3}>
      <HStack>
        <IconButton
          aria-label={isMutable ? "mutable" : "immutable"}
          onClick={() => {
            setOpen((o) => !o);
          }}
        >
          <motion.div variants={variants} animate={open ? "rotate" : "stop"}>
            {isMutable ? <HiLockOpen /> : <HiLockClosed />}
          </motion.div>
        </IconButton>

        <Heading>{isMutable ? "mutable" : "immutable"}</Heading>
      </HStack>

      {open && (
        <VStack p={1} alignItems={"start"}>
          {isMutable ? (
            <>
              <Text style={{ maxWidth: "400px" }}>
                This inscription is MUTABLE. That means it can be changed at any
                time by the person who created it.
              </Text>
              <Text style={{ maxWidth: "400px" }}>
                NEVER buy a MUTABLE inscription on a marketplace / OTC.
              </Text>
              <Text>The current holder is not necessarily the creator.</Text>
              <Text style={{ maxWidth: "400px" }}>
                You must be the CREATOR of an inscription to make it IMMUTABLE.
              </Text>
            </>
          ) : (
            <>
              <Text style={{ maxWidth: "400px" }}>
                This inscription is IMMUTABLE. That means it cannot be changed
                by anybody, not even the person who created it.
              </Text>
              <Text style={{ maxWidth: "400px" }}>
                You can safely trade IMMUTABLE inscriptions on marketplaces /
                OTC.
              </Text>
              <Text style={{ maxWidth: "400px" }}>
                Always Check This Scanner for immutability status.
              </Text>
            </>
          )}
        </VStack>
      )}
      {amIUpdateAuth && isMutable && (
        <VStack>
          <Text style={{ maxWidth: "400px" }} textAlign="center" color="#f66">
            After making the inscription immutable, you WILL NOT be able to
            reclaim any rent. Choose wisely!
          </Text>

          <MakeLegacyInscriptionImmutableTransactionButton
            params={{
              inscription,
              metadata,
            }}
            formatting={{}}
          />
        </VStack>
      )}
    </VStack>
  );
};
