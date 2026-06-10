import { Request, Response, Router } from "express";
import { HorseResponse } from "./models/HorsesResponse";
import HorsesController from "./HorsesController";

class HorsesRouter {
  
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.get("/horses", async (req: Request, res: Response) => {
            try {
                const { name, start, sexCode } = req.query;
                const result: HorseResponse[] = await HorsesController.searchHorses(name as string, start as unknown as number, sexCode as string);

                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des chevaux" + (error instanceof Error ? `: ${error.message}` : "") });
            }
        });
    }

}

export default new HorsesRouter();

