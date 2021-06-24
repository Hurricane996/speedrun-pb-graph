import fetchp from "fetch-jsonp";
import React, { FC, useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { useLocation, useParams } from "react-router";
import { SPEEDRUN_COM_URL } from "../App";
import { Line} from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import { ErrorAlert, LoadingAlert } from "../components/Alerts";
import { SRCCategory_g, SRCLevel, SRCResult, SRCRun, SRCUser, SRCVariable } from "../types/SRCQueryResults";
import Chart from "chart.js";
import { makeHumanReadable } from "../utils/makeHumanReadable";

interface Run {
    date: DateTime;
    time: number;
    id: string;
}

interface Results {
    gameName: string,
    categoryName: string,
    levelName: string,
    subcategoryString: string,
    username: string,
    runs: Run[]

}

const getData = async (
    userId: string | undefined,
    categoryId: string | undefined,
    isIL: boolean,
    levelId: string | undefined,
    searchParams: URLSearchParams,

    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsError:   Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,

    setResults: Dispatch<SetStateAction<Results|undefined>>

) => {
    try {
        if(!userId) {
            throw new Error("No user id provided");
        }
        if(!categoryId) {
            throw new Error("No user id provided");
        }

        const result: Results = {
            gameName: "",
            categoryName: "",
            levelName: "",
            subcategoryString: "",
            username: "",
            runs: [] 
        };

        const [categoryDataRaw, userDataRaw, runsDataRaw] = await Promise.all([
            fetchp(`${SPEEDRUN_COM_URL}/categories/${categoryId}?embed=game`,{timeout: 30000}),
            fetchp(`${SPEEDRUN_COM_URL}/users/${userId}`,{timeout: 30000}),
            isIL 
                ? fetchp(`${SPEEDRUN_COM_URL}/runs?user=${userId}&level=${levelId}&category=${categoryId}&max=200`,{timeout: 30000})
                : fetchp(`${SPEEDRUN_COM_URL}/runs?user=${userId}&category=${categoryId}&max=200`,{timeout: 30000})
        ]);
        const [categoryData, userData, runsData] = await Promise.all([
            categoryDataRaw.json<SRCResult<SRCCategory_g>>(),
            userDataRaw.json<SRCResult<SRCUser>>(),
            runsDataRaw.json<SRCResult<SRCRun[]>>(),

        ]);


        result.gameName = categoryData.data.game.data.names.international;
        result.categoryName = categoryData.data.name;
        
        result.subcategoryString = (await Promise.all([...searchParams.entries()].map(async ([key,value]: [string,string]) : Promise<string> => {
            const dataRaw = await fetchp(`${SPEEDRUN_COM_URL}/variables/${key}`);
            const data = await dataRaw.json<SRCResult<SRCVariable>>();
            return data.data.values.values[value as string].label;
        }))).join(", ");

        if(isIL) {
            const levelDataRaw = await fetchp(`${SPEEDRUN_COM_URL}/levels/${levelId}`);
            const levelData = await levelDataRaw.json<SRCResult<SRCLevel>>();

            result.levelName = levelData.data.name;
        }
        
        result.username = userData.data.names.international;

        result.runs = runsData.data
            .filter(run=> run.status.status !== "rejected")
            // only accept runs of the suggested subcategory
            .filter(run=> Object.entries(run.values).every(([runKey, runValue] :[string, string]) => runValue as string === searchParams.get(runKey)))
            .map(run => ({
                date: DateTime.fromFormat(run.date, "yyyy-MM-dd", {zone: "UTC"}), 
                time: run.times.primary_t,
                id: run.id
            }))
            // sort the runs, otherwise it will play connect the dots
            .sort((first: Run, second: Run) => (
                first.date === second.date
                    ? (first.time < second.time ? -1 : 1)
                    : (first.date < second.date ? -1 : 1)               
            ));

        setResults(result);

        setIsLoading(false);
    } catch (e) {
        setIsError(true);
        setErrorMessage(e.message);
        console.error(e);
    }
};

interface GraphPageProps {
    isIL: boolean;
}

const GraphPage: FC<GraphPageProps> = ({isIL} : GraphPageProps) => 
{
    // note level id will be null when isIL is false.
    const {userId, categoryId, levelId} = useParams<{userId?: string, categoryId?: string, levelId?: string}>();

    const theChart = useRef<Chart.Chart| null>(null);

    const searchParams = new URLSearchParams(useLocation().search);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [data, setData] = useState<Results>();


    

    useEffect(() => {
        getData(
            userId, categoryId, isIL, levelId, searchParams, 
            setIsLoading, setIsError, setErrorMessage, 
            setData);
    }, []);
    
    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;

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

    const chartOptions: Chart.ChartOptions = {
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
                    callback: (value: number| string) => makeHumanReadable(value as number)
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: Chart.TooltipItem<"line">) => makeHumanReadable(tooltipItem.parsed.y)
                }
            }
        }
    };

    return (
        <>
            <h1>{data?.gameName} : {isIL ? data?.levelName+ " " : ""} {data?.categoryName} - {data?.subcategoryString ? data.subcategoryString + " - " : ""}{data?.username}</h1>
            <Link to={`/user/${userId}`} >Back to user</Link>
            <p><b> Click a data-point to see the associated run&apos;s speedrun.com page!</b></p>
            <Jumbotron>
                <Line ref={theChart} type='line' data={chartData} options={chartOptions} />
            </Jumbotron>
        </>
    );
};
export default GraphPage;