import fetchp from "fetch-jsonp";
import React, { FC, useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { SPEEDRUN_COM_URL } from "./App";
import { Line} from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import { ErrorAlert, LoadingAlert } from "./Alerts";

interface Run {
    date: Date;
    time: number;
    id: string;
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

    return `${hString}${mString}:${sString}${msString}`;
};



const GraphPage: FC = () => 
{
    const {userId, categoryId} = useParams<{userId?: string, categoryId?: string}>();
    const theChart = useRef<typeof Line>(null);

    const search = new URLSearchParams(useLocation().search);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [gameName, setGameName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [runs, setRuns] = useState<Run[]>([]);


    const getData = async () => {

        try {
            const dataRaw = await Promise.all([
                fetchp(`${SPEEDRUN_COM_URL}/categories/${categoryId}?embed=game&callback=callback`,{timeout: 30000}),
                fetchp(`${SPEEDRUN_COM_URL}/users/${userId}?callback=callback`,{timeout: 30000}),
                fetchp(`${SPEEDRUN_COM_URL}/runs?user=${userId}&category=${categoryId}&max=200&callback=callback`,{timeout: 30000})
            ]);
            const [categoryData, userData, runsData] = await Promise.all(dataRaw.map((raw) => raw.json()));

            setGameName(categoryData.data.game.data.names.international);
            setCategoryName(categoryData.data.name);

            setUsername(userData.data.names.international);

            setIsLoading(false);

            setRuns(runsData.data
                // filter out rejected runs
                .filter((run: any) => run.status.status !== "rejected")
                // only accept runs of the suggested subcategory
                .filter((run: any) => Object.entries(run.values).every(([runKey, runValue] :[string, any]) => runValue as string === search.get(runKey)))
                .map((run: any) => ({
                    date: DateTime.fromFormat(run.date, "yyyy-MM-dd", {zone: "UTC"}), 
                    time: run.times.primary_t,
                    id: run.id
                }))
                .sort((first: Run, second: Run) => (
                    first.date === second.date
                        ? (first.time < second.time ? -1 : 1)
                        : (first.date < second.date ? -1 : 1)               
                ))
            );
        } catch (e) {
            setIsError(true);
            setErrorMessage(e.message);
            console.error(e);
        }
    };

    useEffect(() => {getData();}, []);
    
    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;

    const chartData = {
        labels: runs.map(run=>run.date),
        datasets: [{
            label: "Time",
            data: runs.map(run=>run.time),
            borderColor: "rgb(255,0,0)",
        }]
    };

    const onChartClick = () => {
        const activeEl = (theChart.current as any).getActiveElements();
        if(activeEl.length > 0) {
            const run = runs[activeEl[0].index];
            window.location.href = `https://speedrun.com/run/${run.id}`;
        }
    };

    const chartOptions = {
        onClick: onChartClick,
        responsive: true,
        scales: {
            x: {
                type: "time",
                time: {
                    tooltipFormat: "MMM d, yyyy"
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

    return (
        <>
            <h1>{gameName} : {categoryName} - {username}</h1>
            <Link to={`/user/${userId}`} >Back to user</Link>
            <p><b> Click a data-point to see the associated run&apos;s speedrun.com page!</b></p>
            <Jumbotron>
                <Line ref={theChart} type='line' data={chartData} options={chartOptions} />
            </Jumbotron>
        </>
    );
};
export default GraphPage;