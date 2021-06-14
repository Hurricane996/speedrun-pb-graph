import axios from "axios-jsonp-pro";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SPEEDRUN_COM_URL } from "./App";

import { Line} from "react-chartjs-2";

import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";




interface Run {
    date: Date;
    time: number;
}

const makeHumanReadable = (input: number): string => {
    const ms = input % 1;
    const s = Math.floor(input) % 60;
    const m = Math.floor(input/60) % 60;
    const h = Math.floor(input/3600);

    const msString = ms === 0 ? "" : ms.toFixed(3).slice(1);

    const sString = s < 10 ? `0${s}` : `${s}`;

    const mString = m < 10 ? `0${m}` : `${m}`;
    const hString = h === 0 ? "" : `${h}:`;

    const ret = `${hString}${mString}:${sString}${msString}`;
    console.log(ret);
    return ret;
};

const chartOptions = {
    scales: {
        x: {
            type: "time",
            time: {
                tooltipFormat: "DD"
            }
        },
        y: {
            ticks: {
                callback: (value: number) => makeHumanReadable(value)
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context: any) => makeHumanReadable(context.parsed.y)
            }
        }
    }
};

const GraphPage: FC = () => 
{
    const {userId, categoryId} = useParams<{userId?: string, categoryId?: string}>();


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [gameName, setGameName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [runs, setRuns] = useState<Run[]>([]);

    const getData = async () => {
        try {
            const [categoryData, userData, runsData] = await Promise.all([
                axios.jsonp(`${SPEEDRUN_COM_URL}/categories/${categoryId}?embed=game&callback=callback`),
                axios.jsonp(`${SPEEDRUN_COM_URL}/users/${userId}?callback=callback`),
                axios.jsonp(`${SPEEDRUN_COM_URL}/runs?user=${userId}&category=${categoryId}&max=200&callback=callback`)
            ]);

            console.log(runsData);
            setGameName(categoryData.data.game.data.names.international);
            setCategoryName(categoryData.data.name);

            setUsername(userData.data.names.international);

            setIsLoading(false);

            setRuns(runsData.data
                .filter((run: any) => run.status.status !== "rejected")
                .map((run: any) => ({date: DateTime.fromFormat(run.date, "yyyy-MM-dd"), time: run.times.primary_t}))
                .sort((first: Run, second: Run) => (
                    first.date === second.date
                        ? (first.time < second.time ? -1 : 1)
                        : (first.date < second.date ? -1 : 1)               
                ))
            );


        } catch (e) {
            setIsError(true);
            setErrorMessage(e.message);
            console.log(e);
        }
    };

    useEffect(() => {getData();}, []);
    
    if(isError) return(<p>Encountered error &quot;{errorMessage}&quot;</p>);
    if(isLoading) return (<p>Loading...</p>);

    const chartData = {
        labels: runs.map(run=>run.date),
        datasets: [{
            label: "Time",
            data: runs.map(run=>run.time),
            borderColor: "rgb(255,0,0)",
        }]
    };


    return (
        <>
            <h1>{gameName} : {categoryName} - {username}</h1>
            <Link to={`/user/${userId}`} >Back to user</Link>
            <Jumbotron>
                <Line type='line' data={chartData} options={chartOptions} width={600} height={250} />
            </Jumbotron>
        </>
    );
};
export default GraphPage;