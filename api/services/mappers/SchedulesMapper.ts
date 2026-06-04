import { ScheduleModel } from "../../repository/models/ScheduleModel";
import { CreateScheduleRequest, UpdateScheduleRequest } from "../../routes/schedules/models/ScheduleRequest";
import { GameResponse, ScheduleResponse } from "../../routes/schedules/models/ScheduleResponse";

class SchedulesMapper {

    public static toGameResponse(schedule: ScheduleModel): GameResponse {
        const game = {
            id: schedule.id,
            category: schedule.category,
            competition: schedule.competition,
            hour: schedule.hour,
            field: schedule.field,
            teamA: schedule.team_a,
            teamB: schedule.team_b,
            score: schedule.score,
        };
        return game;
    }

    public static toScheduleModel(schedule: CreateScheduleRequest | UpdateScheduleRequest): ScheduleModel {
        const scheduleModel: ScheduleModel = {
            id: "id" in schedule ? schedule.id : undefined,
            date: schedule.date,
            competition: schedule.competition,
            category: schedule.category,
            hour: schedule.hour,
            field: schedule.field,
            team_a: schedule.teamA,
            team_b: schedule.teamB,
            score: schedule.score,
        };
        return scheduleModel;
    }
}

export default SchedulesMapper;