import { isEmpty } from "lodash";
import { ScheduleModel } from "./models/ScheduleModel";
import { sql } from "./db";

class SchedulesRepository {

    public async getAllSchedules(): Promise<ScheduleModel[]> {
        const result: ScheduleModel[] = (await sql`SELECT * FROM schedules ORDER BY date desc`) as ScheduleModel[];
        return result;
    }
    
    public async getSchedulesByCompetition(competition: string): Promise<ScheduleModel[]>  {
        if (isEmpty(competition)) {
            throw new Error("Competition parameter is required");
        }
        const result: ScheduleModel[] = (await sql`SELECT * FROM schedules WHERE competition = ${competition} ORDER BY date desc`) as ScheduleModel[];
        return result;
    }

    public async createSchedule(schedule: Omit<ScheduleModel, "id">): Promise<void> {
        const { date, competition, category, hour, field, team_a, team_b, score } = schedule;
        await sql`INSERT INTO schedules (date, competition, category, hour, field, team_a, team_b, score) VALUES (${date}, ${competition}, ${category}, ${hour}, ${field}, ${team_a}, ${team_b}, ${score})`;
    }

    public async updateSchedule(schedule: ScheduleModel): Promise<void> {
        const { id, date, competition, category, hour, field, team_a, team_b, score } = schedule;
        await sql`UPDATE schedules SET (date, competition, category, hour, field, team_a, team_b, score) = (${date}, ${competition}, ${category}, ${hour}, ${field}, ${team_a}, ${team_b}, ${score}) WHERE id = ${id}`;
    }

    public async deleteSchedule(id: number): Promise<void> {
        await sql`DELETE FROM schedules WHERE id = ${id}`;
    }
}

export default new SchedulesRepository();