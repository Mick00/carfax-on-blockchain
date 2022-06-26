import { useMutation } from "react-query";
import { ContractTransaction } from "ethers";
import { useEffect, useState } from "react";

export function useWriteContract<T>(mutationFn: (input: T) => Promise<ContractTransaction>) {
   const mutation = useMutation(mutationFn);
   const [isConfirmed, setIsConfirmed] = useState(false);
   const [isReverted, setIsReverted] = useState(false);
   const [revertedWith, setRevertedWith] = useState<any|null>(null)

   const wrappedMutate = (input: T) => {
      setIsConfirmed(false);
      setIsReverted(false);
      setRevertedWith("");
      mutation.mutate(input);
   }

   useEffect(() => {{}
      mutation.data?.wait(1)
        .then((t) => setIsConfirmed(true))
        .catch((e) => setRevertedWith(e));
   }, [mutation.data]);

   return {
      ...mutation,
      mutate: wrappedMutate,
      isWaitingOnInput: mutation.isLoading,
      isSubmitted: mutation.isSuccess,
      isConfirmed,
      isReverted,
      revertedWith,
   };
}
