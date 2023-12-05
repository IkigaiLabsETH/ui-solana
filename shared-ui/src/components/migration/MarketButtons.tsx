import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  HStack,
  Text,
} from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { MarketplaceButtonBody } from "./MarketplaceButtonBody";
import React from "react";

export const TensorButton = ({ mint }: { mint: PublicKey }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <HStack>
        <IconButton
          aria-label={"tensorhq"}
          background={"black"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src="/tensorhq-white.png" style={{ height: "28px" }} />
        </IconButton>
        <IconButton
          aria-label={"ME"}
          background={"black"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src="/ME_Logo_Gradient_BG.png" style={{ height: "28px" }} />
        </IconButton>
        <IconButton
          aria-label={"solsniper"}
          background={"black"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src="/sniper_square.png" style={{ height: "28px" }} />
        </IconButton>
      </HStack>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscription Trading</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <MarketplaceButtonBody mint={mint} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
