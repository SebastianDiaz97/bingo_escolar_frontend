import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../api/incomeApi";

export function useIncomes(bingoId: number) {
    return useQuery({
        queryKey: ["incomes", bingoId],
        queryFn: () => getIncomes(bingoId),
        refetchOnWindowFocus: false,
        enabled: !!bingoId,
        retry: 1,
    });
}