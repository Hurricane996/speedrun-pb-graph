import { SPEEDRUN_COM_URL } from "../App";
import { SRCResult, SRCVariableSet, SRCVariable } from "../types/SRCQueryResults";
import { Subcategory } from "../pages/UserPage";
import { FetchWrapper } from "./useFetcher";

export default async (variables: SRCVariableSet, fetchWrapper: FetchWrapper): Promise<Subcategory[]> =>  
    await Promise.all(Object.entries(variables).map(async ([key, value]: [string, string]) => {
        const variableData = await fetchWrapper<SRCResult<SRCVariable>>(`${SPEEDRUN_COM_URL}/variables/${key}`);

        return {
            subcategoryKeyId: key,
            subcategoryValueId: value,
            subcategoryValueName: variableData.data.values.values[value].label
        };
    }));
