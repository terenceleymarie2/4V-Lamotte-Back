export interface IfceHorseResponse {
    NUEQUIDE_UK: string;
    NUEQUIDE: number;
    ETAT_DE_VIE?: string;
    MORT_EVENEMENT?: string;
    MORT_DATE?: number;
    ANNEE_NAIS?: number;
    DTNAIS?: string;
    AGE?: number;
    PAYS_NAISSANCE?: string;
    PAYS_LIB?: string;
    NOM_NAISSANCE: string;
    ROBE_LIB?: string;
    ROBE_CODE?: string;
    SEXE_CODE?: "M" | "F" | "H";
    RACE_CODE?: string;
    RACE_LIB?: string;
    MORPHOLOGIE?: string;
    NUSIRECLE?: string;
    UELN?: string;
    RACE_FAMILLE?: string;
    NATURE?: string;
    FICTIF?: string;
    STATUTVERIF?: string;
    MERE_NUM?: number;
    RACE_MERE?: string;
    PAYS_MERE?: string;
    NOM_MERE?: string;
    PERE_NUM?: number;
    RACE_PERE?: string;
    PAYS_PERE?: string;
    NOM_PERE?: string;
    PDM_NUM?: number;
    RACE_PDM?: string;
    NOM_PDM?: string;
    NAI_NUPERSO?: string;
    NAI_PARTS?: string;
    NAI_NUORDRE?: string;
    DOCWEB?: string;
    NURACES3?: string;
    CORACES3?: string;
    NURACES3_P?: string;
    CORACES3_P?: string;
    NURACES3_M?: string;
    CORACES3_M?: string;
    NAISSEUR?: string[];
}

export interface IfceApiResponse {
    responseHeader: {
        zkConnected: boolean;
        status: number;
        QTime: number;
        params: {
            q: string;
            "json.wrf": string;
            wt: string;
            start: string;
            rows: string;
            _: string;
        };
    }
    response?: {
        numFound: number;
        start: number;
        maxScore: number;
        numFoundExact: boolean;
        docs?: IfceHorseResponse[];
    };
}

export enum IfceSexCode {
    MALE = "M",
    FEMALE = "H",
    BOTH = "M OR H",
}