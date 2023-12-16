import { VStack } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useFiletypeFromStream, useOffchainImageAsBuffer } from "@libreplex/shared-ui";
import { useInscriptionV3ForRoot } from "@libreplex/shared-ui";
import { IImageUploadProgressState, Stage, StageProgress } from "./useImageUploadProgressState";
import React from "react";
import { useInscriptionWriteStatus } from "../../../../components/inscriptions/WriteToInscriptionTransactionButton";
import { ImageUploader } from "../../../../components/shadowdrive/ImageUploader";
import { set } from "date-fns";

export interface IImageUploaderState {
  imageOverride: string | undefined;
  setImageOverride: Dispatch<SetStateAction<string | undefined>>;
  dataBytes: number[];
  mediaFile: File | undefined,
  setMediaFile: Dispatch<SetStateAction<File | undefined>>,
  filetype: string | undefined;
  imageBuffer: Buffer | undefined;
  refetch: () => any;
}

export const useImageUploaderState = (): IImageUploaderState => {
  const [imageOverride, setImageOverride] = useState<string>();

  const {data: buf }=
    useOffchainImageAsBuffer(imageOverride);

  const {data: filetype, refetch}=
    useFiletypeFromStream(imageOverride);

    useEffect(()=>{
      console.log({buf, filetype})
    },[buf, filetype])

  const dataBytes = useMemo(
    () => (buf ? [...buf] : undefined),
    [buf]
  );

  const [mediaFile, setMediaFile] = useState<File|undefined>()

  return { imageOverride, setImageOverride, imageBuffer: buf, refetch, dataBytes, filetype, mediaFile, setMediaFile };
};

export const CustomImageUploader = ({
  mint,
  state,
  progressState
}: {
  mint: PublicKey;
  state: IImageUploaderState;
  progressState: IImageUploadProgressState;
}) => {
  const {
    inscription: { data: inscription },
  } = useInscriptionV3ForRoot(mint);

  const { reset } = useInscriptionWriteStatus(
    state.dataBytes,
    inscription?.pubkey
  );

  return (
    <VStack>
      <ImageUploader
        currentImage={state.imageOverride}
        linkedAccountId={mint?.toBase58()}
        afterUpdate={(url) => {
          console.log({ url });
          state.setImageOverride(url);
          
          reset();
          progressState.setUpdateStatus({
            stage: Stage.UpdateTemplate,
            result: StageProgress.Success,
          });
        }}
      />

     
    </VStack>
  );
};
