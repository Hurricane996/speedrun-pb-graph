import fetchp from "fetch-jsonp";
import React, { useEffect, useState, FC } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "./Alerts";
import {SPEEDRUN_COM_URL} from "./App";
import { SRCResult, SRCUser } from "./SRCQueryResults";

interface Result {
    id: string;
    name: string;
}

const SearchPage: FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const {query} = useParams<{query: string}>();

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(true);


    const [exactMatch, setExactMatch] = useState<Result|null>(null);


    const getInfo = async () => {
        try {  
            const rawLookupData = await fetchp(`${SPEEDRUN_COM_URL}/users?lookup=${query}`, {timeout: 30000});
            const lookupData = await rawLookupData.json<SRCResult<SRCUser[]>>();

            if(lookupData.data.length > 0) {
                setExactMatch({
                    id: lookupData.data[0].id,
                    name: lookupData.data[0].names.international
                });
            }



            const rawData = await fetchp(`${SPEEDRUN_COM_URL}/users?name=${query}`, {timeout: 30000});
            const data = await rawData.json<SRCResult<SRCUser[]>>();

            setResults(data.data.map(
                ({id, names}) => ({
                    id, 
                    name: names.international
                }) 
            ));

            setIsLoading(false);

        } catch(error)  {
            console.error(error);
            setIsError(true);
            setErrorMessage(`Error ${errorMessage} occurred`);
        }
    };

    useEffect(() => {getInfo();} , [query]);

    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;

    return (
        <>
            <h3>Results for {query}:</h3>
            <ul>
                {exactMatch && <p><b>An exact match was found: <Link to={`/user/${exactMatch.id}`}>{exactMatch.name} </Link></b></p> }
                {results.length > 0 ? results.map(({id, name}) => (
                    <li key={id}><Link to={`/user/${id}`}>{name} </Link></li>
                )) : (<p>No users found. <Link to="/">Search again?</Link></p>)}
            </ul>
        </>
    );

};

export default SearchPage;