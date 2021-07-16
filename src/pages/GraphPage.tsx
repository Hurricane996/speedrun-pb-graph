import React, { FC, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { SPEEDRUN_COM_URL } from "../App";
import { Line} from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "../components/Alerts";
import { EmbedGame, SRCCategory, SRCLevel, SRCResult, SRCRun, SRCUser, SRCVariable } from "../types/SRCQueryResults";
import {Chart, ChartOptions, TooltipItem} from "chart.js";
import makeTimeHumanReadable from "../utils/makeTimeHumanReadable";
import useFetcher, { Fetcher } from "../utils/useFetcher";
import insertIfExists from "../utils/insertIfExists";
import styles from "./GraphPage.module.css";

interface FetchedData {
    gameName: string;
    categoryName: string;
    levelName: string;
    subcategoryString: string;
    username: string;
    runs: {
        date: DateTime;
        time: number;
        id: string;
    }[];
}

interface FetcherInput {
    userId: string;
    categoryId: string;
    levelId?: string;
    searchParams: URLSearchParams;
}

const fetcher: Fetcher<FetcherInput,FetchedData> = async ({userId, categoryId, levelId, searchParams}, fetchWrapper) => {
    const [categoryData, userData, runsData, levelData, subcategoryArr] = await Promise.all([
        fetchWrapper<SRCResult<SRCCategory & EmbedGame>>(`${SPEEDRUN_COM_URL}/categories/${categoryId}?embed=game`),
        fetchWrapper<SRCResult<SRCUser>>(`${SPEEDRUN_COM_URL}/users/${userId}`),
        fetchWrapper<SRCResult<SRCRun[]>>(`${SPEEDRUN_COM_URL}/runs?user=${userId}${insertIfExists(levelId, "&level=", true)}&category=${categoryId}&max=200`),
        levelId ? fetchWrapper<SRCResult<SRCLevel>>(`${SPEEDRUN_COM_URL}/levels/${levelId}`) : null,

        // load all of the subcategories
        Promise.all([...searchParams.entries()].map(async ([key,value]: [string,string]) : Promise<string> => {
            const data = await fetchWrapper<SRCResult<SRCVariable>>(`${SPEEDRUN_COM_URL}/variables/${key}`);
    
            return data.data.values.values[value as string].label;
        }))
    ]);
    
    const runs = runsData.data
        .filter(run=> run.status.status !== "rejected")
        // only accept runs of the suggested subcategory
        .filter(run=> Object.entries(run.values).every(([runKey, runValue] :[string, string]) => runValue as string === searchParams.get(runKey)))
        .map(run => ({
            date: DateTime.fromFormat(run.date, "yyyy-MM-dd", {zone: "UTC"}), 
            time: run.times.primary_t,
            id: run.id
        }))
        // sort the runs, otherwise it will play connect the dots
        .sort((first, second) => (
            first.date === second.date
                ? (first.time < second.time ? -1 : 1)
                : (first.date < second.date ? -1 : 1)               
        ));

    return {
        gameName: categoryData.data.game.data.names.international,
        categoryName: categoryData.data.name,
        subcategoryString: subcategoryArr.join(", "),
        username: userData.data.names.international,
        levelName: levelData ? levelData.data.name : "", 
        runs
    };
};

const GraphPage: FC = () => {
    const {userId, categoryId, levelId} = useParams<{userId?: string; categoryId?: string; levelId?: string}>();

    const theChart = useRef<Chart| null>(null);

    const searchParams = new URLSearchParams(useLocation().search);

    if(!userId)
        return <ErrorAlert error="No user id provided!"/>;
    if(!categoryId)
        return <ErrorAlert error="No category id provided!"/>;
        
    const [data, loading, error] = useFetcher(fetcher, {userId, categoryId, levelId, searchParams});
    if(error) return <ErrorAlert error={error} />;
    if(loading) return <LoadingAlert/>;

    const chartData = {
        labels: data?.runs.map(run=>run.date),
        datasets: [{
            label: "Time",
            data: data?.runs.map(run=>run.time),
            borderColor: "rgb(255,0,0)",
        }]
    };

    const onChartClick = () => {
        // somehow the user clicked on the chart before the ref was set... shouldn't be possible
        if(!theChart.current) return;
        const activeElements = theChart.current.getActiveElements();
        if(activeElements.length > 0) {
            const run = data?.runs[activeElements[0].index];
            window.location.href = `https://speedrun.com/run/${run?.id}`;
        }
    };

    const chartOptions: ChartOptions = {
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
                    // if this isn't a number we're *really* fucked
                    callback: (value: number| string) => makeTimeHumanReadable(value as number)
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<"line">) => makeTimeHumanReadable(tooltipItem.parsed.y)
                }
            }
        }
    };

    return (
        <>
            <h1>{data?.gameName}: {insertIfExists(data?.levelName," ")}{data?.categoryName} - {insertIfExists(data?.subcategoryString, " - ")}{data?.username}</h1>
            <Link to={`/user/${userId}`} >Back to user</Link>
            <p><b> Click a data-point to see the associated run&apos;s speedrun.com page!</b></p>
            <div className={styles.chartContainer}>
                <Line ref={theChart} type='line' data={chartData} options={chartOptions} />
            </div>
        </>
    );
};

export default GraphPage;