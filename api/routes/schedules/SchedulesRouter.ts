import { Request, Response, Router } from "express";
import { CreateScheduleRequest, UpdateScheduleRequest } from "./models/ScheduleRequest";
import { ScheduleResponse } from "./models/ScheduleResponse";
import SchedulesController from "./SchedulesController";

class SchedulesRouter {
  
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/schedules", async (req: Request, res: Response) => {
            try {
                const competitionFilter: string = req.query.competition as string;
                const result: ScheduleResponse[] = await SchedulesController.getSchedulesByCompetition(competitionFilter);

                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des schedules" + (error instanceof Error ? `: ${error.message}` : "") });
            }
        });

        this.router.post("/schedules", async (req: Request, res: Response) => {
            try {
                const newSchedule = req.body as CreateScheduleRequest;
                await SchedulesController.createSchedule(newSchedule);
                res.sendStatus(201);
            } catch (error) {
                res.status(500).json({
                error: "Erreur lors de l'écriture des données",
                errorDetails: error instanceof Error ? error.message : String(error),
                });
            }
        });

        this.router.patch("/schedules/:id", async (req: Request, res: Response) => {
            try {
                const id = Number(req.params.id);
                const newSchedule = { id, ...req.body } as UpdateScheduleRequest;
                await SchedulesController.updateSchedule(newSchedule);
                res.sendStatus(200);
            } catch (error) {
                res.status(500).json({
                error: "Erreur lors de l'écriture des données",
                errorDetails: error instanceof Error ? error.message : String(error),
                });
            }
        });

        this.router.delete("/schedules/:id", async (req: Request, res: Response) => {
            try {
                const scheduleId = req.params.id;
                await SchedulesController.deleteSchedule(Number(scheduleId));
                res.sendStatus(200);
            } catch (error) {
                res.status(500).json({
                error: "Erreur lors de la suppression des données",
                errorDetails: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}

export default new SchedulesRouter();
