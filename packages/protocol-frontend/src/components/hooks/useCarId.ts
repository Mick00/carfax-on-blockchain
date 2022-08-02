import { useCOBApi } from "../COBProvider";
import { useQuery } from "react-query";

export default function useCarId(vin: string) {
  const { cars, canRead } = useCOBApi();

  return useQuery(
    ["cars", "serialNumberToCar", vin],
    () => cars().serialNumberToCar(vin),
    {
      enabled: Boolean(vin) && canRead,
    }
  );
}
