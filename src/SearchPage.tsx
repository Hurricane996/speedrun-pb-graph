import fetchp from "fetch-jsonp";
import React, { useEffect, useState, FC } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "./Alerts";

import {SPEEDRUN_COM_URL} from "./App";


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


    const getInfo = async () => {
        try {

            const raw_data = await fetchp(`${SPEEDRUN_COM_URL}/users?name=${query}`, {timeout: 20000});
            const data = await raw_data.json();

            setResults(data.data.map(
                ({id, names}: any) => ({
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

    useEffect(() => {getInfo();} , []);

    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;

    return (
        <>
            <h3>Results for {query}:</h3>
            <ul>
                {results.length > 0 ? results.map(({id, name}) => (
                    <li key={id}><Link to={`/user/${id}`}>{name} </Link></li>
                )) : (<p>No users found. <Link to="/">Search again?</Link></p>)}
            </ul>
        </>
    );

};

export default SearchPage;