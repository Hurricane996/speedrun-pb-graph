import fetchp from "fetch-jsonp";
import React, { FC, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "./Alerts";
import { SPEEDRUN_COM_URL } from "./App";

interface Category {
    gameName: string;
    gameId: string;
    categoryName: string;
    categoryId: string;
}

interface UserData {
    id: string;
    name: string;
    categories: Category[]
}

const UserPage: FC =  () => {
    const {id} = useParams<{id?: string}>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [userData, setUserData] = useState<UserData | null>(null);

    const getUserData = async () => {
        try {

            const dataRaw = await Promise.all([
                fetchp(`${SPEEDRUN_COM_URL}/users/${id}?callback=callback`),
                fetchp(`${SPEEDRUN_COM_URL}/users/${id}/personal-bests?embed=game,category&callback=callback`)
            ]);

            const [userApiData, pbData] = await Promise.all(dataRaw.map((raw) => raw.json()));

            setIsLoading(false);

            setUserData({
                id: userApiData.data.id,
                name: userApiData.data.names.international,
                categories: pbData.data
                    .filter(({category} : any) => category.data.type === "per-game")
                    .map(({game, category}: any) => ({
                        gameName: game.data.names.international,
                        gameId: game.data.id,
                        categoryName: category.data.name,
                        categoryId: category.data.id
                    }))
            });
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
            console.error(error);
        }
    };

    useEffect(()=>{getUserData();},[]);

    if(isError) return <ErrorAlert error={errorMessage} />;
    if(isLoading) return <LoadingAlert/>;
    
    return (<>
        <h2>Categories for {userData?.name}</h2>
        <ul>
            {userData?.categories.map((category: Category) => (
                <li key={category.categoryId}><Link to={`/graph/${userData?.id}/${category.categoryId}`}>{category.gameName}: {category.categoryName}</Link></li>
            ))}
        </ul>
    </>);

};

export default UserPage;