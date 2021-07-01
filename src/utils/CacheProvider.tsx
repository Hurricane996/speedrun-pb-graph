import React, { createContext, FC, ReactNode, useState } from "react";


export interface Cache {
    isInCache: (url: string) => boolean;
    getFromCache: <T>(url: string) => T;
    addOrUpdateCache: <T>(url: string, data: T) => void;
}

export const CacheContext = createContext<Cache|null>(null);


type CacheProviderProps = {
    children?: ReactNode;
}
const CacheProvider: FC<CacheProviderProps> = ({children}: CacheProviderProps) => {
    const [cache, setCache] = useState< {[key: string]: unknown}>({});


    const isInCache = (url: string): boolean => {
        return Object.keys(cache).includes(url);
    };

    const getFromCache = <T,>(url: string): T => {
        return cache[url] as T;
    };

    const addOrUpdateCache = <T,>(url: string, data: T): void => {
        const newState = {...cache};
        newState[url] = data;
        setCache(newState);
    };

    return (<CacheContext.Provider value={{isInCache, getFromCache, addOrUpdateCache}}>
        {children}
    </CacheContext.Provider>);
};

export default CacheProvider;

