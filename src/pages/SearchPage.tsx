import React, { FC } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "../components/Alerts";
import {SPEEDRUN_COM_URL} from "../App";
import { SRCPaginatedResult, SRCResult, SRCUser } from "../types/SRCQueryResults";

import useFetcher, {Fetcher} from "../utils/useFetcher";
import fetchWrapper from "../utils/fetchWrapper";

interface Result {
    id: string;
    name: string;
}

interface Results {
    exactMatch: Result | null;
    results: Result[];
    hasNext: boolean;
}

const fetcher: Fetcher <{query: string; offset: number}, Results> = async ({query, offset}) => {
    const [lookupData, searchData] = await Promise.all([
        fetchWrapper<SRCResult<SRCUser[]>>(`${SPEEDRUN_COM_URL}/users?lookup=${query}`, {timeout: 30000}),
        fetchWrapper<SRCPaginatedResult<SRCUser[]>>(`${SPEEDRUN_COM_URL}/users?name=${query}&offset=${offset}`, {timeout: 30000})
    ]);

    return {
        exactMatch: lookupData.data.length > 0 ? {
            id: lookupData.data[0].id,
            name: lookupData.data[0].names.international
        } : null,
        results: searchData.data.map(user => ({id: user.id, name: user.names.international})),
        hasNext: searchData.pagination.links.find(link => link.rel == "next") !== undefined
    };
};


const SearchPage: FC = () => {
    const {query } = useParams<{query: string}>();
    const searchParams = new URLSearchParams(useLocation().search);

    const strOffset = searchParams.get("offset");
    const offset = strOffset ? parseInt(strOffset) : 0;

    const [data, loading, error] = useFetcher(fetcher, {query, offset},[query,offset]);

    if(error) return <ErrorAlert error={error} />;
    if(loading) return <LoadingAlert/>;

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