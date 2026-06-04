import { isEmpty } from "lodash";
import SchedulesService from "../../services/SchedulesService";
import { CreateScheduleRequest, UpdateScheduleRequest } from "./models/ScheduleRequest";
import { ScheduleResponse } from "./models/ScheduleResponse";

class SchedulesController {

    public async getSchedulesByCompetition(competition: string): Promise<ScheduleResponse[]>  {
        if (isEmpty(competition)) {
            throw new Error("Competition parameter is required");
        }
        return await SchedulesService.getSchedulesByCompetition(competition);
    }

    public async createSchedule(schedule: CreateScheduleRequest): Promise<void> {
        await SchedulesService.createSchedule(schedule);
    }

    public async updateSchedule(schedule: UpdateScheduleRequest): Promise<void> {
        await SchedulesService.updateSchedule(schedule);
    }

    public async deleteSchedule(id: number): Promise<void> {
        await SchedulesService.deleteSchedule(id);
    }
}

export default new SchedulesController();