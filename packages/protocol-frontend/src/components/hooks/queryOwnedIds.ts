import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useCOBApi } from "../COBProvider";

export default function useQueryOwnedIds(account?: string) {

  const {contributors: contributorsContractFactory, canRead} = useCOBApi();

  const contributors = contributorsContractFactory();

  const {data: receivedIds, isLoading: loadingIns, isSuccess: loadedIns } = useQuery(['contributors.events.transfer.in', account], async () => {
    const fromFilter = contributors.filters['Transfer'](null, account);
    const transferEvents = await contributors.queryFilter(fromFilter);
    return transferEvents.map(e => e.args.tokenId)
  }, {
    enabled: canRead
  })

  const {data: sentIds, isLoading: loadingOuts, isSuccess: loadedOuts } = useQuery(['contributors.events.transfer.out', account], async () => {
    const fromFilter = contributors.filters['Transfer']( account);
    const transferEvents = await contributors.queryFilter(fromFilter);
    return transferEvents.map(e => e.args.tokenId)
  }, {
    enabled: canRead
  })

  return {
    ownsId: receivedIds?.filter(id => !sentIds?.includes(id)) ?? [],
    isLoading: loadingIns || loadingOuts,
    isSuccess: loadedIns && loadedOuts
}
}
