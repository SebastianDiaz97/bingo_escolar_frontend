import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import type { Bingo } from "../types";

export default function Users() {
  const queryClient = useQueryClient();
  const { bingoId } = useParams();
  const bingos = queryClient.getQueryData<Bingo[]>(["bingos"]);

  const currentBingo = bingos?.find((b) => b.id === Number(bingoId));

  if (currentBingo !== undefined) {
    return (
      <div>
        <UsersTable
          bingoId={Number(bingoId)}
          bingoName={currentBingo.name}
          createdBy={currentBingo.createdBy}
        />
      </div>
    );
  }
}