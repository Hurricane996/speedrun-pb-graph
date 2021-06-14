import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
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

const UserPage =  () => {
    let {id} = useParams<{id?: string}>();

    let [isLoading, setIsLoading] = useState<boolean>(true);
    let [isError, setIsError] = useState<boolean>(false);
    let [errorMessage, setErrorMessage] = useState<string>("");

    let [userData, setUserData] = useState<UserData | null>(null);


    const getUserData = async () => {
        try {
 

            let [userApiData, pbData] = await Promise.all([
                axios.get(`${SPEEDRUN_COM_URL}/users/${id}`),
                axios.get(`${SPEEDRUN_COM_URL}/users/${id}/personal-bests?embed=game,category`)
            ])

            setIsLoading(false);

            console.log(pbData.data.data)

            setUserData({
                id: userApiData.data.data.id,
                name: userApiData.data.data.names.international,
                categories: pbData.data.data.map(({game, category}: any) => ({
                    gameName: game.data.names.international,
                    gameId: game.data.id,
                    categoryName: category.data.name,
                    categoryId: category.data.id
                }))
            })


        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
            console.error(error);
        }
    }

    useEffect(()=>{getUserData();},[]);

    if(isError) return (<p>Error {errorMessage} occured.</p>)
    if(isLoading) return (<p>Loading...</p>);

    console.log(userData);

    return (<>
        <h2>{userData?.name}</h2>
        <ul>
            {userData?.categories.map((category: Category) => (
                <li><Link to={`/graph/${userData?.id}/${category.categoryId}`}>{category.gameName}: {category.categoryName}</Link></li>
            ))}
        </ul>
    </>);

  }

export default UserPage;