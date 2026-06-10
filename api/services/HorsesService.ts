import IfceRemote from "../routes/remote/ifce/IfceRemote";
import { IfceHorseResponse } from "../routes/remote/ifce/models/IfceHorseResponse";

class HorsesService {

    public async searchHorses(name: string, start?: number, sexCode?: string): Promise<IfceHorseResponse[]> {
        try {
            return await IfceRemote.searchHorses(name, start, sexCode as any);
        } catch (error) {
            const message = error instanceof Error ? error.message : "unknown error";
            throw new Error(`Erreur pendant la recherche de chevaux: ${message}`);
        }
    }

}

export default new HorsesService();