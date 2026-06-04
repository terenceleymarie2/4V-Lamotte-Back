import SchedulesService from "../../services/SchedulesService";

class HealthController {

    public async getHealthStatus(): Promise<{ status: string }> {
        try {
            await SchedulesService.getAllSchedules();
            return { status: "ok" };
        } catch (error) {
            return { status: "error" };
        }
    }

}

export default new HealthController();