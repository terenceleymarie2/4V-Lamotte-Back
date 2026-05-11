export type Game = {
  category: string;
  hour: string;
  field: string;
  teamA: string;
  teamB: string;
  score: string | null;
};

export type Schedule = {
  date: string;
  games: Game[];
};