import { PublicKey } from "@solana/web3.js";
import {
  useInscriptionForRoot,
  useInscriptionV3ForRoot,
  useOffChainMetadataCache,
} from "@libreplex/shared-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, Center, IconButton, VStack, Text } from "@chakra-ui/react";
import { MigrateToV3TransactionButton } from "@app/views/inscriptions/v3migration/MigrateToV3TransactionButton";

export const TensorButtonBody = ({ mint }: { mint: PublicKey }) => {
  const { inscription: inscriptionV3 } = useInscriptionV3ForRoot(mint, true);

  const { inscription } = useInscriptionForRoot(mint);

  const { data: offchainData } = useOffChainMetadataCache(mint);

  const { publicKey } = useWallet();

  return inscriptionV3.data.item ? (
    <VStack align={"start"} pb={4}>
      <IconButton
        aria-label={"tensorhq"}
        mb={2}
        onClick={() => {
          window.open(`https://www.tensor.trade/item/${mint.toBase58()}`);
        }}
      >
        <img src="/tensorhq.png" style={{ height: "28px" }} />
      </IconButton>
      <Box>
        <Text pb={3}>
          This item has succesfully been migrated onto V3 inscriptions index.
        </Text>
        <Text>
          Please click on the above link to buy / sell this item.
        </Text>
      </Box>
    </VStack>
  ) : (
    <Center>
      <VStack align={"start"}>
        <Box>
          <Text pb={3}>
            New Solana inscriptions are created in version V3. They are trading
            happily on TensorHQ without a care in the world.
          </Text>
          <Text pb={3}>
            Please help me migrate to V3. Your address will recorded forever in
            the history of Solana as my migrator and liberator.
          </Text>

          <Text pb={3}>Sincerely,</Text>

          <Text>{offchainData?.name}</Text>

          <Text pb={3}>
            Inscription #
            {Number(inscription?.data?.item?.order).toLocaleString()}
          </Text>

          <MigrateToV3TransactionButton
            params={{ root: mint }}
            formatting={{}}
          />
        </Box>
      </VStack>
    </Center>
  );
};
