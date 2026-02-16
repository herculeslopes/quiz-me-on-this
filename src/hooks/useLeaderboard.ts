import n8nAPI from "@/clients/n8n-client";
import type { ScoreRecordType } from "@/types/stats-types";
import { useQuery } from "@tanstack/react-query";

export default function useLeaderboard() {
  const queryFn = async () => {
    const response = await n8nAPI.get('leaderboard');
    return response.data as ScoreRecordType[];
  }
  
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn,
    enabled: false,
  })
}