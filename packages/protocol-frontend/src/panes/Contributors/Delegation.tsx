import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useCOBApi } from "../../components/COBProvider";
import React from "react";
import useQueryOwnedIds from "../../components/hooks/queryOwnedIds";
import { BigNumberish } from "ethers";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import { isValidAddress, isValidVin } from "../../components/inputs/rules";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import TransactionState from "../../components/TransactionState";
import IPFSFile from "../../components/IPFSFile";

export default function Delegation() {
  const { account } = useWeb3React();
  const { contributors: contributorsContractFactory } = useCOBApi();

  const contributors = contributorsContractFactory();

  const { ownsId, isSuccess: loadedIds } = useQueryOwnedIds(account);

  const {
    data: identities,
    isLoading,
    isStale,
  } = useQuery(
    ["contributors.datafor", account],
    async () => {
      const hashes = await Promise.all(
        ownsId.map((id) => contributors.tokenURI(id))
      );
      return hashes.map((hash, i) => ({ hash, tokenId: ownsId[i] }));
    },
    {
      enabled: loadedIds,
    }
  );

  return (
    <Box>
      <Stack spacing={1} divider={<Divider flexItem />}>
        {identities?.map((identity) => (
          <Paper>
            <Box p={1}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack>
                  <Typography>
                    TokenId: {identity.tokenId.toString()}
                  </Typography>
                  <Typography>
                    <IPFSFile hash={identity.hash}>
                      Hash: {identity.hash}
                    </IPFSFile>
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <DelegateBox contributorId={identity.tokenId} />
                  <UndelegateBox contributorId={identity.tokenId} />
                </Stack>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

function DelegateBox(props: { contributorId: BigNumberish }) {
  const { handleSubmit, control } = useForm();
  const { contributorDelegation } = useCOBApi();

  const addDelegate = useWriteContract(
    ({ address, tokenId }: { address: string; tokenId: BigNumberish }) =>
      contributorDelegation().delegate(tokenId, address)
  );

  const onSubmit = (data: any) => {
    addDelegate.mutate({ address: data.address, tokenId: props.contributorId });
  };

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <ControlledTextField
        name={"address"}
        label={"address"}
        control={control}
        required
        rules={{ isValidAddress }}
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Delegate
      </Button>
      <TransactionState transaction={addDelegate} />
    </Stack>
  );
}

function UndelegateBox(props: { contributorId: BigNumberish }) {
  const { handleSubmit, control } = useForm();
  const { contributorDelegation } = useCOBApi();

  const addDelegate = useWriteContract(
    ({ address, tokenId }: { address: string; tokenId: BigNumberish }) =>
      contributorDelegation().undelegate(tokenId, address)
  );

  const onSubmit = (data: any) => {
    addDelegate.mutate({ address: data.address, tokenId: props.contributorId });
  };

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <ControlledTextField
        name={"address"}
        label={"address"}
        control={control}
        required
        rules={{ isValidAddress }}
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Undelegate
      </Button>
      <TransactionState transaction={addDelegate} />
    </Stack>
  );
}
