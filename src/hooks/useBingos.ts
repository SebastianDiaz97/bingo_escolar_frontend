import { useQuery } from "@tanstack/react-query";
import { getBingosByUser, getUsersByBingo } from "../api/bingoApi";

export function useBingos() {
    return useQuery({
        queryKey: ["bingos"],
        queryFn: getBingosByUser,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}

export function useUsersBingo(bingoId: number) {
    return useQuery({
        queryKey: ["usersBingo", bingoId],
        queryFn: () => getUsersByBingo(bingoId),
        refetchOnWindowFocus: false,
        enabled: !!bingoId,
        retry: 1,
    });
}