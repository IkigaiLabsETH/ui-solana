import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import { DeploymentMintDisplay } from "./DeploymentMintDisplay";

import { InfoIcon } from "@chakra-ui/icons";
import {
  CopyPublicKeyButton,
  Deployment,
  IRpcObject,
  getHashlistPda,
  useHashlistById,
  useLegacyMintsByWallet,
  useMint,
} from "@libreplex/shared-ui";
import { MintTransactionButton } from "./MintTransactionButton";

export const SwapArea = ({
  deployment,
}: {
  deployment: IRpcObject<Deployment>;
}) => {
  const fungibleMintId = useMemo(
    () => deployment?.item?.fungibleMint,
    [deployment]
  );

  const { connection } = useConnection();

  const { publicKey } = useWallet();

  const fungibleMint = useMint(fungibleMintId, connection);

  const {
    data: mintsInEscrow,
    refetch: refreshEscrow,
    isFetching: isFetchingEscrow,
  } = useLegacyMintsByWallet(deployment.pubkey, connection);

  const {
    data: mintsInMyWallet,
    refetch: refreshWallet,
    isFetching: isFetchingWallet,
  } = useLegacyMintsByWallet(publicKey, connection);

  const hashlistId = useMemo(
    () => (deployment ? getHashlistPda(deployment?.pubkey)[0] : undefined),
    [deployment]
  );

  const { data: hashlist } = useHashlistById(hashlistId, connection);

  const hashlistIndex = useMemo(() => {
    const _hashlistIndex: { [key: string]: number } = {};
    for (const hashlistEntry of hashlist?.item?.issues ?? []) {
      _hashlistIndex[hashlistEntry.mint.toBase58()] = Number(
        hashlistEntry.order
      );
    }
    return _hashlistIndex;
  }, [hashlist]);

  const mintsFromThisDeployerHeldInWallet = useMemo(
    () =>
      [
        ...mintsInMyWallet.filter(
          (item) => hashlistIndex[item.mint.toBase58()] !== undefined
        ),
      ].sort((a, b) => a.mint.toBase58().localeCompare(b.mint.toBase58())),
    [mintsInMyWallet, hashlistIndex]
  );

  const mintsFromThisDeployerHeldInEscrow = useMemo(
    () =>
      [
        ...mintsInEscrow.filter(
          (item) => hashlistIndex[item.mint.toBase58()] !== undefined
        ),
      ].sort((a, b) => a.mint.toBase58().localeCompare(b.mint.toBase58())),
    [mintsInEscrow, hashlistIndex]
  );

  useEffect(() => {
    console.log({
      mintsFromThisDeployer: mintsFromThisDeployerHeldInEscrow,
      hashlistIndex,
      data: mintsInEscrow,
    });
  }, [mintsFromThisDeployerHeldInEscrow, hashlistIndex, mintsInEscrow]);

  const totalSplBalance = useMemo(
    () =>
      mintsInEscrow
        .filter(
          (item) =>
            item?.mint.toBase58() === deployment?.item?.fungibleMint.toBase58()
        )
        .reduce((a, b) => a + Number(b.tokenAccount.item.amount ?? 0), 0),
    [mintsInEscrow, deployment?.item?.fungibleMint]
  );

  const denominator = useMemo(
    () => 10 ** deployment.item.decimals,
    [deployment.item.decimals]
  );

  return (
    <VStack>
      <VStack>
        <VStack minW={"400px"} width="100%">
          <Card width="100%">
            <CardHeader>
              <Heading size="md">SPL-20s</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={3} gap={2} width="100%">
                <Heading size="sm">Escrow</Heading>
                <Heading size="sm">Circulation</Heading>
                <Heading size="sm">Total</Heading>

                <Text>
                  {Number(
                    deployment?.item?.escrowNonFungibleCount ?? 0
                  ).toLocaleString()}{" "}
                  x{" "}
                  {Number(deployment?.item?.limitPerMint ?? 0).toLocaleString()}
                </Text>
                <Text>
                  {(
                    Number(deployment?.item?.numberOfTokensIssued ?? 0) -
                    Number(deployment?.item?.escrowNonFungibleCount ?? 0)
                  ).toLocaleString()}{" "}
                  x{" "}
                  {Number(deployment?.item?.limitPerMint ?? 0).toLocaleString()}
                </Text>
                <Text>
                  {Number(
                    deployment?.item?.numberOfTokensIssued ?? 0
                  ).toLocaleString()}{" "}
                  x{" "}
                  {Number(deployment?.item?.limitPerMint ?? 0).toLocaleString()}
                </Text>
              </SimpleGrid>
            </CardBody>
            <CardFooter>
              <HStack>
                <Text fontSize={"12px"}>
                  Each spl-20 token has its own token address
                </Text>
              </HStack>
            </CardFooter>
          </Card>
        </VStack>
        <VStack className="relative" minW={"400px"} width="100%">
          <Card width="100%">
            <CardHeader>
              <HStack>
                <Heading size="md">SPL Tokens</Heading>

                <Popover size="md">
                  <PopoverTrigger>
                    <Button colorScheme="white" variant="outline">
                      <InfoIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>
                      <Flex justify="space-between" align="center" p={2}>
                        <Box>
                          <Text as="b">SPL Token Balance</Text>
                        </Box>
                      </Flex>
                    </PopoverHeader>
                    <Box p={5}>
                      <Center>
                        <VStack align={"start"}>
                          <Text>
                            The escrow always holds exactly the correct amount
                            of SPL token to allow all NFTs in circulation to be
                            converted.
                          </Text>

                          <Text>
                            For pre-Fair Launch deployments, escrow balance can
                            be lower than the amount of NFTs in circulation.
                            However, once all NFTs are migrated from pre-Fair
                            Launch validators, the balances will match exactly.
                          </Text>
                        </VStack>
                      </Center>
                    </Box>
                  </PopoverContent>
                </Popover>
              </HStack>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={3} width="100%">
                <Heading size="sm">Escrow</Heading>
                <Heading size="sm">Circulation</Heading>
                <Heading size="sm">Total</Heading>

                <Text>
                  {(
                    Number(totalSplBalance ?? 0) / denominator
                  ).toLocaleString()}
                </Text>
                <Text>
                  {(
                    (Number(fungibleMint?.item?.supply ?? 0) -
                      Number(totalSplBalance ?? 0)) /
                    denominator
                  ).toLocaleString()}
                </Text>
                <Text>
                  {(
                    Number(fungibleMint?.item?.supply ?? 0) / denominator
                  ).toLocaleString()}
                </Text>
              </SimpleGrid>
            </CardBody>
            <CardFooter>
              <HStack>
                <Text fontSize={"12px"}>token address</Text>
                {deployment?.item && (
                  <CopyPublicKeyButton
                    publicKey={deployment?.item?.fungibleMint.toBase58()}
                  />
                )}
              </HStack>
            </CardFooter>
          </Card>
        </VStack>
      </VStack>

      {deployment.item.migratedFromLegacy ? (
        <Text>Inscribed out.</Text>
      ) : (
        <MintTransactionButton
          params={{
            deployment,
          }}
          formatting={{}}
        />
      )}

      <Button
        onClick={async () => {
          refreshEscrow();
          refreshWallet();
        }}
      >
        Refresh
      </Button>
      {isFetchingEscrow || (isFetchingWallet && <Spinner />)}
      <DeploymentMintDisplay
        mintsInEscrow={mintsFromThisDeployerHeldInEscrow}
        mintsInWallet={mintsFromThisDeployerHeldInWallet}
        deployment={deployment}
      />
    </VStack>
  );
};
