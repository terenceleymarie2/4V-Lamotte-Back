export interface CreateScheduleRequest {
    category: string;
    competition: string;
    date: string;
    hour: string;
    field: string;
    teamA: string;
    teamB: string;
    score: string;
}

export interface UpdateScheduleRequest extends CreateScheduleRequest {
    id: number;
}