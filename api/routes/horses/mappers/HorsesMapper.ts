import { IfceHorseResponse } from "../../remote/ifce/models/IfceHorseResponse";
import { HorseResponse } from "../models/HorsesResponse";

class HorsesMapper {

    public toHorseResponse(ifceHorse: IfceHorseResponse): HorseResponse {
        return {
            horseNumberUk: ifceHorse.NUEQUIDE_UK,
            horseNumber: ifceHorse.NUEQUIDE,
            lifeStatus: ifceHorse.ETAT_DE_VIE,
            deathEvent: ifceHorse.MORT_EVENEMENT,
            deathDate: ifceHorse.MORT_DATE,
            birthYear: ifceHorse.ANNEE_NAIS,
            birthDate: ifceHorse.DTNAIS,
            age: ifceHorse.AGE,
            birthCountry: ifceHorse.PAYS_NAISSANCE,
            birthCountryLib: ifceHorse.PAYS_LIB,
            birthName: ifceHorse.NOM_NAISSANCE,
            coatColorLib: ifceHorse.ROBE_LIB,
            coatColorCode: ifceHorse.ROBE_CODE,
            sexCode: ifceHorse.SEXE_CODE,
            breedCode: ifceHorse.RACE_CODE,
            breedLib: ifceHorse.RACE_LIB,
            morphology: ifceHorse.MORPHOLOGIE,
            nusirecle: ifceHorse.NUSIRECLE,
            ueln: ifceHorse.UELN,
            raceFamily: ifceHorse.RACE_FAMILLE,
            nature: ifceHorse.NATURE,
            fictif: ifceHorse.FICTIF,
            checkStatus: ifceHorse.STATUTVERIF,
            motherNumber: ifceHorse.MERE_NUM,
            motherBreed: ifceHorse.RACE_MERE,
            motherCountry: ifceHorse.PAYS_MERE,
            motherName: ifceHorse.NOM_MERE,
            fatherNumber: ifceHorse.PERE_NUM,
            fatherBreed: ifceHorse.RACE_PERE,
            fatherCountry: ifceHorse.PAYS_PERE,
            fatherName: ifceHorse.NOM_PERE,
            pdmNumber: ifceHorse.PDM_NUM,
            pdmBreed: ifceHorse.RACE_PDM,
            pdmName: ifceHorse.NOM_PDM,
            personalNumberBirth: ifceHorse.NAI_NUPERSO,
            birthParts: ifceHorse.NAI_PARTS,
            birthOrder: ifceHorse.NAI_NUORDRE,
            docWeb: ifceHorse.DOCWEB,
            nuraces3: ifceHorse.NURACES3,
            coraces3: ifceHorse.CORACES3,
            nuraces3P: ifceHorse.NURACES3_P,
            coraces3P: ifceHorse.CORACES3_P,
            nuraces3M: ifceHorse.NURACES3_M,
            coraces3M: ifceHorse.CORACES3_M,
            breeders: ifceHorse.NAISSEUR
        }
    }

}

export default new HorsesMapper();