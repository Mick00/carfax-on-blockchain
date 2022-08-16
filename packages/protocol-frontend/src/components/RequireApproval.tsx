import { BigNumber, BigNumberish } from "ethers";
import { useCOBApi } from "./COBProvider";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useWriteContract } from "./hooks/useWriteContract";
import TransactionState from "./TransactionState";

const DEFAULT_APPROVAL = BigNumber.from("1000000000000000000000000000000");

export interface RequireApprovalProps {
  quantity: BigNumberish;
  for: string;
  children: React.ReactNode;
  hasEnoughAllowance: (bool: boolean) => void;
}

export default function RequireApproval(props: RequireApprovalProps) {
  const { token, canWrite } = useCOBApi();
  const { account } = useWeb3React();

  const { data: allowance, refetch } = useQuery(
    ["token", "balanceOf", account],
    () => token().allowance(account ?? "", props.for),
    {
      enabled: canWrite,
    }
  );

  const tx = useWriteContract(() => token().approve(props.for, props.quantity));
  const onSubmit = () => tx.mutate({});

  useEffect(() => {
    refetch();
  }, [tx.isConfirmed]);

  const quantity = props.quantity ? props.quantity : "0";
  const enoughAllowance = allowance ? allowance.gte(quantity) : false;
  props.hasEnoughAllowance(enoughAllowance);

  return (
    <Box>
      <Stack direction={"row"} spacing={1} alignItems={"flex-start"}>
        {props.children}
        {!enoughAllowance && (
          <Button onClick={onSubmit} variant={"contained"}>
            Approve
          </Button>
        )}
      </Stack>
      {tx.isPending ? (
        <TransactionState transaction={tx} />
      ) : (
        <Box>Allowance: {allowance?.toString()}</Box>
      )}
    </Box>
  );
}
