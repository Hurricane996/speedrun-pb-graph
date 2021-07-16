import fetchJsonp from "fetch-jsonp";
import React, { useEffect, useState, useContext } from "react";
import { SPEEDRUN_COM_URL } from "../App";
import { Cache, CacheContext } from "./CacheProvider";

export type FetchWrapper = <T>(url: string) => Promise<T>;

export type Fetcher<InType,OutType> = (input: InType, fetchWrapper: FetchWrapper) => Promise<OutType>;

export default <InType,OutType>(
    fetcher: Fetcher<InType, OutType>, 
    input: InType, forceReload?: React.DependencyList
) : [OutType|null, boolean, string|null] => {
    const [data, setData] = useState<OutType|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const cache = useContext<Cache|null>(CacheContext);

    if(!cache) return [
        null, 
        false, 
        "calls to useFetcher() must be wrapped in a CacheProvider"
    ]; 

    const {isInCache, addOrUpdateCache, getFromCache} = cache;

    const fetchWrapper =  async <T>(url: string): Promise<T> => {
        const cacheKey = url.replace(SPEEDRUN_COM_URL,"");
        if(isInCache(cacheKey)) {
            // we dont have to worry about cache invalidation because the whole
            // cache gets discarded on user refresh
            return getFromCache<T>(cacheKey);
        }

        const dataRaw = await fetchJsonp(url, {timeout: 10000}); 
        const data = await dataRaw.json<T>();

        addOrUpdateCache(cacheKey, data);

        return data;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const newData = await fetcher(input, fetchWrapper);
            setData(newData);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    useEffect(() => {fetchData();}, forceReload ?? []);

    return [data, loading, error];
};
