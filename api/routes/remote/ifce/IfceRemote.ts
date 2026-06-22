import axios from "axios";
import { IfceApiResponse, IfceHorseResponse, IfceSexCode } from "./models/IfceHorseResponse";

class IfceRemote {  

    // example: https://search.ifce.fr/solr/equides/exalead/?&json.wrf=jQuery17206242425031133404_1781106855982&wt=json&q=jumper+AND+FICTIF%3A0+AND+NATURE%3AEQU+AND+SEXE_CODE%3A(M+OR+H)&start=0&rows=10&_=1781106869552
    // queryParams:
    // - q: name + " AND FICTIF:0 AND NATURE:EQU" + " AND SEXE_CODE:(M OR H)"
    // - start: pagination start index
    // - rows: number of results to return
    // 

    // https://search.ifce.fr/solr/equides/exalead/?
    // fq=Morphologie:%22SANG%22
    // &fq=Sexe:%22MALE%22
    // &fq=Race:%22CHEVAL%20DE%20SELLE%22
    // &fq=Robe:%22ALEZAN%22
    // &fq=Etat_de_vie:%22VIVANT%22
    // &fq=Ann%C3%A9e_de_naissance:%222006%22
    // &fq=Pays_de_naissance:%22FR%22
    // &fq=Nom_P%C3%A8re:%22KASHMIR%20VAN%27T%20SCHUTTERSHO%22
    // &fq=Nom_M%C3%A8re:%22MON%20SANTA%22
    // &fq=Nom_P%C3%A8re_de_m%C3%A8re:%22NATIVIO%22
    // &&json.wrf=jQuery17206242425031133404_1781106855995
    // &wt=json&q=jumper+AND+FICTIF%3A0+AND+NATURE%3AEQU+AND+SEXE_CODE%3A(M+OR+H)
    // &start=0
    // &rows=10&_=1781108169726

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