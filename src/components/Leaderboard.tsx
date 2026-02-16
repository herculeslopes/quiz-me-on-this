import Button from "./Button";
import { useState } from "react"
import n8nAPI from "@/clients/n8n-client";
import { nanoid } from "nanoid";
import { type ScoreRecordType } from "@/types/stats-types";

export default function Leaderboard() {
  // const { data: records, refetch } = useLeaderboard();
  const [records, setRecords] = useState<ScoreRecordType[]>([]);

  const refetch = async () => {
    try {
      const response = await n8nAPI.get<ScoreRecordType[]>('leaderboard');
      setRecords(Array.from({ length: 10 }, (_, i) => response.data[i] || {
        row_number: nanoid(),
        name: null,
        points: null,
        source: null,
        time: null,
      }))
      // setRecords(response.data?.map(record => ({
      //   name: '-',
      //   points: null,
      //   row_number: nanoid(),
      //   source: '-',
      //   time: null,
      // })));
      
    } catch (error) {
      throw error;
    }
  }
  
  return <>
    <div className="flex flex-col min-h-100 gap-3 font-pixel">
      <menu>
        <Button onClick={() => refetch()}>Atualizar</Button>
      </menu>

      <table>
        <thead>
          <tr>
            <td></td>
            <td>Nome</td>
            <td>Pontos</td>
            <td>Tempo</td>
            <td>Source</td>
          </tr>
        </thead>
        <tbody>
          {records?.map((record, index) => <tr key={record.row_number}>
            <td>{index + 1}º</td>
            <td>{record.name || '-'}</td>
            <td>{record.points || '-'}</td>
            <td>{record.time || '-'}</td>
            <td>{record.source.substring(0, 30) || '-'}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </>
}