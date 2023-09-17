import { MintCard } from "@marketplace/components/mintcard/MintCard";
import { HStack, Heading, Skeleton, VStack, Text } from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { IRpcObject, useCollectionById } from "@libreplex/shared-ui";
import { ListingAction } from "../ListingAction";
import { IdlAccounts } from "@coral-xyz/anchor";
import { LibreplexShop } from "@libreplex/idls/lib/types/libreplex_shop";

export type Listing = IdlAccounts<LibreplexShop>["listing"];

export const GroupDisplay = ({
  groupKey,
  listings,
}: {
  groupKey: PublicKey | null;
  listings: (IRpcObject<Listing> & { executed?: boolean })[];
}) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const group = useCollectionById(groupKey, connection);

  return <VStack align="start">
      <HStack sx={{ w: "100%" }}>

        {/* <Text>{JSON.stringify(group?.item)}</Text>
        <Text>{groupKey?.toBase58()}</Text> */}
        {group?.item?.url.length > 0 ? (
          <img
            src={group?.item?.url}
            style={{ minWidth: "135px", maxWidth: "135px", aspectRatio: "1/1" }}
          />
        ) : (
          <Skeleton
            style={{ minWidth: "135px", maxWidth: "135px", aspectRatio: "1/1" }}
          />
        )}
        <VStack align={"end"} sx={{ w: "100%" }}>
          <Heading size="md">Group: {group?.item?.name}</Heading>
          <Heading size="md">
            Listings ({listings.length})
          </Heading>
        </VStack>
      </HStack>

      <HStack wrap={"wrap"}>
        {listings.map((item, idx2) => (
          <MintCard
            sx={{ position: "relative" }}
            key={idx2}
            mint={(item.item as any)?.mint!}
          >
            <ListingAction
              publicKey={publicKey}
              listing={{ ...item, item: item.item! }}
            />
          </MintCard>
        ))}
      </HStack>
    </VStack>
 
};
