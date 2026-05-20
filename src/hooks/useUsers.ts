import { useQuery } from "@tanstack/react-query";
import { getUser, getUsersActive } from "../api/userApi";

export function useUser() {
    return useQuery({
        queryFn: getUser,
        queryKey: ["user"],
        refetchOnWindowFocus: false,
        retry: 1,
    });
}

export function useUsersActive(bingoId: number) {
    return useQuery({
        queryKey: ["usersActive", bingoId],
        queryFn: () => getUsersActive(bingoId),
        refetchOnWindowFocus: false,
        enabled: !!bingoId,
        retry: 1,
    });
}