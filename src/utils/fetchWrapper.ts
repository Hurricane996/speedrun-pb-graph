import fetchJsonp from "fetch-jsonp";

const fetchWrapper = async <T>(url: string, options: fetchJsonp.Options): Promise<T> => {
    const dataRaw = await fetchJsonp(url,options); 
    return dataRaw.json<T>();
};

export default fetchWrapper;