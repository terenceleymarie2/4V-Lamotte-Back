import axios from "axios";
import { IfceApiResponse, IfceHorseResponse, IfceSexCode } from "./models/IfceHorseResponse";

class IfceRemote {  

    // example: https://search.ifce.fr/solr/equides/exalead/?&json.wrf=jQuery17206242425031133404_1781106855982&wt=json&q=jumper+AND+FICTIF%3A0+AND+NATURE%3AEQU+AND+SEXE_CODE%3A(M+OR+H)&start=0&rows=10&_=1781106869552
    // queryParams:
    // - q: name + " AND FICTIF:0 AND NATURE:EQU" + " AND SEXE_CODE:(M OR H)"
    // - start: pagination start index
    // - rows: number of results to return
    // 

    private readonly IFCE_BASE_URL = "https://search.ifce.fr";

    public async searchHorses(name: string, start?: number, sexCode?: IfceSexCode): Promise<IfceHorseResponse[]> {
        try {
            const horseQuery = name?.trim();
            if (!horseQuery) {
                return [];
            }

            const sexCodeQuery = sexCode ? `SEXE_CODE:(${sexCode})` : `SEXE_CODE:(${IfceSexCode.BOTH})`;

            const queryParts: string[] = [horseQuery, "FICTIF:0", "NATURE:EQU", sexCodeQuery];

            const response = await axios.get<IfceApiResponse>(`${this.IFCE_BASE_URL}/solr/equides/exalead/`, {
                params: {
                    wt: "json",
                    q: queryParts.join(" AND "),
                    start: start ?? 0,
                    rows: 10,
                },
                timeout: 2000,
            });

            return response.data.response?.docs ?? [];
        } catch (error) {
            const message = error instanceof Error ? error.message : "unknown error";
            throw new Error(`Erreur IFCE pendant la recherche de chevaux: ${message}`);
        }
    }
}

export default new IfceRemote();