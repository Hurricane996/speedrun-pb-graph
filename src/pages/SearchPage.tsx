import fetchp from "fetch-jsonp";
import React, { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "../componentrs/Alerts";
import {SPEEDRUN_COM_URL} from "../App";
import { SRCPaginatedResult, SRCResult, SRCUser } from "../types/SRCQueryResults";

interface Result {
    id: string;
    name: string;
}

interface GetInfoData {
    exactMatch: Result | null,
    results: Result[],
    hasNext: boolean
}

const getInfo = async (
    query: string,
    offset: number,

    setData: Dispatch<SetStateAction<GetInfoData|null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,

) => {


    setIsLoading(true);

    const outData: GetInfoData = {
        exactMatch: null,
        results: [],
        hasNext: false
    };

    try {  
        const rawLookupData = await fetchp(`${SPEEDRUN_COM_URL}/users?lookup=${query}`, {timeout: 30000});
        const lookupData = await rawLookupData.json<SRCResult<SRCUser[]>>();

        if(lookupData.data.length > 0) {
            outData.exactMatch = {
                id: lookupData.data[0].id,
                name: lookupData.data[0].names.international
            };
        }



        const rawData = await fetchp(`${SPEEDRUN_COM_URL}/users?name=${query}&offset=${offset}`, {timeout: 30000});
        const data = await rawData.json<SRCPaginatedResult<SRCUser[]>>();

        outData.results = data.data.map(
            ({id, names}) => ({
                id, 
                name: names.international
            }) 
        );

        outData.hasNext = data.pagination.links.find(link => link.rel == "next") !== undefined;


        setData(outData);
        setIsLoading(false);

    } catch(error)  {
        console.error(error);
        setIsError(true);
        setErrorMessage(`Error ${error.message} occurred`);
    }
};


const SearchPage: FC = () => {
    const [data, setData] = useState<GetInfoData|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {query } = useParams<{query: string}>();

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);


    const strOffset = searchParams.get("offset");
    const offset = strOffset ? parseInt(strOffset) : 0;


    
    useEffect(() => {getInfo(query,offset,setData,setIsLoading,setIsError,setErrorMessage,);} , [query, location]);

    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;

    return (
        <>
            <h3>Results for {query}:</h3>
            <ul>
                {data?.exactMatch && <p><b>An exact match was found: <Link to={`/user/${data.exactMatch.id}`}>{data.exactMatch.name} </Link></b></p> }
                {data?.results && data.results.length > 0 ? data.results.map(({id, name}) => (
                    <li key={id}><Link to={`/user/${id}`}>{name} </Link></li>
                )) : (<p>No users found. <Link to="/">Search again?</Link></p>)}
            </ul>

            {offset > 0 && (<Link to={`/search/${query}?offset=${Math.max(0, offset - 20)}`}>&lt;Prev</Link>)}
            {offset > 0 && data?.hasNext && " - "}
            {data?.hasNext && (<Link to={`/search/${query}?offset=${offset + 20}`}>Next &gt;</Link>)}
        </>
    );

};

export default SearchPage;