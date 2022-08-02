import React from "react";

export interface TransactionStateProps {
  transaction: {
    isError: boolean,
    error?: any,
    isWaitingOnInput: boolean,
    isSubmitted: boolean,
    isConfirmed: boolean
    isReverted: boolean,
    revertedWith?: any
  }
}

export default function TransactionState({transaction}: TransactionStateProps) {

  return (
    <>
      {transaction.isError && <p>Verify input</p>}
      {transaction.isWaitingOnInput && <p>Waiting for input...</p>}
      {(transaction.isSubmitted && !transaction.isConfirmed) && <p>Waiting for confirmation...</p>}
      {transaction.isConfirmed && <p>Transaction confirmed</p>}</>
  )
}
