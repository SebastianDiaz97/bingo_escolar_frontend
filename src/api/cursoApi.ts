import api from "../config/axios";
import type { CourseData } from "../types";

export async function getCursos() {
    const { data } = await api<CourseData[]>(`/api/course`);
    return data;
}

export async function updateCurso({ id, name }: CourseData) {
    const { data } = await api.put<string>(`/api/course/${id}`, { name });
    return data;
}

export async function deleteCurso(id: number) {
    const { data } = await api.delete<string>(`/api/course/${id}`);
    return data;
}

export async function createCurso(name: string) {
    const { data } = await api.post<string>(`/api/course`, { name });
    return data;
}