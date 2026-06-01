export interface ScheduleModel {
    id: number;
    date: string;
    competition: string;
    category: string;
    hour: string;
    field: string;
    team_a: string;
    team_b: string;
    score: string;
};

export interface CategoryModel {
    id: number;
    competition: string;
    category: string;
}