import HorsesService from "../../services/HorsesService";
import HorsesMapper from "./mappers/HorsesMapper";
import { HorseResponse } from "./models/HorsesResponse";

class HorsesController {

    public async searchHorses(name: string, start?: number, sexCode?: string): Promise<HorseResponse[]> {
        try {
            const result = await HorsesService.searchHorses(name, start, sexCode);
            return result.map(HorsesMapper.toHorseResponse);
        } catch (error) {
            throw new Error("Erreur lors de la récupération des chevaux" + (error instanceof Error ? `: ${error.message}` : ""));
        }
    }

}

export default new HorsesController();