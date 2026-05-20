import { useQuery } from "@tanstack/react-query";
import { getCursos } from "../api/cursoApi";

export function useCursos() {
    return useQuery({
        queryKey: ["cursos"],
        queryFn: getCursos,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}