import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboardApi";

export function useDashboard(bingoId: number) {
    return useQuery({
        queryKey: ["dashboard", bingoId],
        queryFn: () => getDashboard(bingoId),
        refetchOnWindowFocus: false,
        enabled: !!bingoId,
        retry: 1,
    });
}