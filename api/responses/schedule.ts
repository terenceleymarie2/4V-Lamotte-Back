export type GameResponse = {
  category: string;
  hour: string;
  field: string;
  teamA: string;
  teamB: string;
  score: string;
};

export type ScheduleResponse = {
  date: string;
  games: GameResponse[];
};