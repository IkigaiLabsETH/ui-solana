import {
    Center,
    HStack,
    Skeleton,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
    VStack
} from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { useContext, useMemo } from "react";


import React from "react";
import {
    useInscriptionDataForRoot,
    useInscriptionForRoot,
    useOffChainMetadataCache
} from "../..";
import { ClusterContext } from "../../contexts/NetworkConfigurationProvider";
import { InscriptionImage } from "./InscriptionImage";
import { useUrlPrefixForInscription } from "./useUrlPrefixForInscription";
import { useValidationHash } from "./useValidationHash";

export const InscriptionTable = ({ mint }: { mint: PublicKey }) => {
  const {
    data: inscription,
    isFetching: isFetchingInscription,
    refetch: refreshInscription,
  } = useInscriptionForRoot(mint);
  const {
    data: inscriptionData,
    isFetching: isFetchingInscriptionData,
    refetch: refreshInscriptionData,
  } = useInscriptionDataForRoot(mint);

  const hashOfInscription = useValidationHash(inscriptionData?.item?.buffer);

  const { data: offchainData } = useOffChainMetadataCache(mint);

  const base64ImageInscription = useMemo(
    () => Buffer.from(inscriptionData?.item?.buffer ?? []).toString("base64"),
    [inscriptionData?.item?.buffer]
  );

  const urlPrefix = useUrlPrefixForInscription(inscription);

  const { cluster } = useContext(ClusterContext);

  return (
    <Table>
      <Tbody>
        <Tr>
          <Td>
            <Center columnGap={2}>
              <VStack>
                <HStack alignItems={"start"}>
                  <VStack>
                    {offchainData?.images.square ? (
                      <img
                        style={{
                          minWidth: "240px",
                          maxWidth: "240px",
                          aspectRatio: "1/1",
                          borderRadius: 8,
                        }}
                        src={offchainData?.images.square}
                      />
                    ) : (
                      <Skeleton
                        startColor="#aaa"
                        endColor="#aaa"
                        style={{
                          minWidth: "240px",
                          maxWidth: "240px",
                          aspectRatio: "1/1",
                          borderRadius: 8,
                        }}
                      />
                    )}
                    <Text>Off-chain Image</Text>
                  </VStack>
                  <VStack sx={{ position: "relative" }}>
                    {base64ImageInscription ? (
                      <InscriptionImage root={mint} />
                    ) : (
                      //   <>
                      //     <SolscanLink
                      //       address={inscriptionData.pubkey.toBase58()}
                      //       cluster={cluster}
                      //       sx={{
                      //         position: "absolute",
                      //         top: "8px",
                      //         right: "8px",
                      //       }}
                      //     />
                      //     <img
                      //       style={{
                      //         minWidth: "240px",
                      //         maxWidth: "240px",
                      //         aspectRatio: "1/1",
                      //         borderRadius: 8,
                      //       }}
                      //       src={`data:${urlPrefix};base64,${base64ImageInscription}`}
                      //     />
                      //   </>
                      <>
                        <Text
                          sx={{
                            position: "absolute",
                            left: "50%",
                            top: "45%",
                            transform: "translate(-50%,-50%)",
                          }}
                        >
                          Not inscribed
                        </Text>
                        <Skeleton
                          startColor="#aaa"
                          endColor="#aaa"
                          style={{
                            minWidth: "240px",
                            maxWidth: "240px",
                            aspectRatio: "1/1",
                            borderRadius: 8,
                          }}
                        />
                      </>
                    )}
                    <Text>Inscription</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Center>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
