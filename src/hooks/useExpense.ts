import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expenseApi";

export function useExpenses(bingoId: number) {
    return useQuery({
        queryKey: ["expense", bingoId],
        queryFn: () => getExpenses(bingoId),
        refetchOnWindowFocus: false,
        enabled: !!bingoId,
        retry: 1,
    });
}