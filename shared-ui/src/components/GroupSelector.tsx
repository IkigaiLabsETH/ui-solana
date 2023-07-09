import { Select } from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { IRpcObject } from "./executor";
import { Group, useGroupsByAuthority } from "../sdk";

export const GroupSelector = ({
  selectedGroup,
  setSelectedGroup,
}: {
  selectedGroup: IRpcObject<Group | null> | undefined;
  setSelectedGroup: Dispatch<SetStateAction<IRpcObject<Group | null> | undefined>>;
}) => {
  const { publicKey } = useWallet();

  const { connection } = useConnection();

  const groups = useGroupsByAuthority(publicKey, connection);

  return (
    <Select
      placeholder="Select metadata group"
      value={selectedGroup?.pubkey.toBase58()}
      onChange={(e) => {
        setSelectedGroup(
          groups.data.find(
            (item) => item.pubkey.toBase58() === e.currentTarget.value
          )
        );
      }}
    >
      {groups.data.map((item, idx) => (
        <option key={idx} value={item.pubkey?.toBase58()}>
          {item.item?.name}
        </option>
      ))}
    </Select>
  );
};
