import { isEmpty } from "lodash";
import { ScheduleResponse } from "../routes/schedules/models/ScheduleResponse";
import SchedulesRepository from "../repository/SchedulesRepository";
import { ScheduleModel } from "../repository/models/ScheduleModel";
import SchedulesMapper from "./mappers/SchedulesMapper";
import { format, parse } from "date-fns";
import { CreateScheduleRequest, UpdateScheduleRequest } from "../routes/schedules/models/ScheduleRequest";

class SchedulesService {

        public async getAllSchedules(): Promise<ScheduleModel[]> {
            return await SchedulesRepository.getAllSchedules();
        }

        public async getSchedulesByCompetition(competition: string): Promise<ScheduleResponse[]>  {
            if (isEmpty(competition)) {
                throw new Error("Competition parameter is required");
            }
            const result: ScheduleModel[] = await SchedulesRepository.getSchedulesByCompetition(competition);

                    const reduceResult = result.reduce((acc: ScheduleResponse[], row: ScheduleModel) => {
                      const formatedDate = format(new Date(row.date), "EEEE dd/MM/yyyy");
                      const existingDate = acc.find((item) => item.date === formatedDate);
                      const game = SchedulesMapper.toGameResponse(row);
            
                      if (existingDate) {
                        existingDate.games.push(game);
                      } else {
                        acc.push({ date: formatedDate, games: [game] });
                      }
            
                      return acc;
                    }, []);
            
                    const sortedResult = reduceResult.map((item) => ({
                      date: item.date,
                      games: item.games.sort((a, b) =>
                        parse(a.hour, "HH:mm", new Date()) < parse(b.hour, "HH:mm", new Date()) ? -1 : 1,
                      ),
                    }));

                    return sortedResult;
        }

        public async createSchedule(schedule: CreateScheduleRequest): Promise<void> {
            await SchedulesRepository.createSchedule(SchedulesMapper.toScheduleModel(schedule));
        }

        public async updateSchedule(schedule: UpdateScheduleRequest): Promise<void> {
            await SchedulesRepository.updateSchedule(SchedulesMapper.toScheduleModel(schedule));
        }

        public async deleteSchedule(id: number): Promise<void> {
            await SchedulesRepository.deleteSchedule(id);
        }
}

export default new SchedulesService();