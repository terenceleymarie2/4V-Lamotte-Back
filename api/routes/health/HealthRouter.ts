import { Request, Response, Router } from "express";
import HealthController from "./HealthController";

class HealthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/_health", async (req: Request, res: Response) => {
            try {
                // Test SQL connection by executing a simple query
                const result = await HealthController.getHealthStatus();
                res.json(result);
            } catch (error) {
                res.json({
                status: "error",
                errorDetails: error instanceof Error ? error.message : String(error),
                });
            }
        });
    }
}

export default new HealthRouter();
