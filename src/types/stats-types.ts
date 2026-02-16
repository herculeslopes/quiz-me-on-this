export type ScoreRecordType = {
    row_number: string;
    name: string;
    points: number | null;
    time: number | null;
    source: string;
}

export type LeaderboardType = ScoreRecordType[];