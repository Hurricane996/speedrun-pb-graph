import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SPEEDRUN_COM_URL } from './App';


interface Run {
    date: Date;
    time: number;
};

const makeHumanReadable = (input: number): string => {
    const ms = input % 1;
    const s = Math.floor(input) % 60;
    const m = Math.floor(input/60) % 60;
    const h = Math.floor(input/3600);

    const msString = ms === 0 ? "" : ms.toFixed(3).slice(1);

    const sString = s < 10 ? `0${s}` : `${s}`;

    const mString = m < 10 ? `0${m}` : `${m}`;
    const hString = h === 0 ? "" : `${h}:`

    return `${hString}${mString}:${sString}${msString}`
}

const GraphPage = () => 
{
    const {userId, categoryId} = useParams<{userId?: string, categoryId?: string}>()


    let [isLoading, setIsLoading] = useState<boolean>(true);
    let [isError, setIsError] = useState<boolean>(false);
    let [errorMessage, setErrorMessage] = useState<string>("");

    const [gameName, setGameName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [runs, setRuns] = useState<Run[]>([]);

    const getData = async () => {
        try {
            let [categoryData, userData, runsData] = await Promise.all([
                axios.get(`${SPEEDRUN_COM_URL}/categories/${categoryId}?embed=game`),
                axios.get(`${SPEEDRUN_COM_URL}/users/${userId}`),
                axios.get(`${SPEEDRUN_COM_URL}/runs?user=${userId}&category=${categoryId}`)
            ])

            console.log(runsData)
            setGameName(categoryData.data.data.game.data.names.international);
            setCategoryName(categoryData.data.data.name);

            setUsername(userData.data.data.names.international)

            setIsLoading(false);

            setRuns(runsData.data.data
                .filter((run: any) => run.status.status !== "rejected")
                .map((run: any) => ({date: new Date(run.date), time: run.times.primary_t}))
            )


        } catch (e) {
            setIsError(true);
            setErrorMessage(e.message);
            console.log(e);
        }
    }

    useEffect(() => {getData()}, [])
    
    if(isError) return(<p>Encountered error '{errorMessage}'</p>)
    if(isLoading) return (<p>Loading...</p>)

    return (
        <>
        <h1>{gameName} : {categoryName} - {username}</h1>
        <ul>
            {runs.map((run) => (
                <li>
                    {run.date.toUTCString()} : {makeHumanReadable(run.time)}
                </li>
            ))}
        </ul>
        </>
    )
}
export default GraphPage;