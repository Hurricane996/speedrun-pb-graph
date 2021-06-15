import fetchp from "fetch-jsonp";
import React, { FC, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "./Alerts";
import { SPEEDRUN_COM_URL } from "./App";


interface Game {
    name: string,
    id: string,
    categories: Category[];
}

interface Category {
    gameName: string;
    gameId: string;
    categoryName: string;
    categoryId: string;

    subcategories: Subcategory[];
}

interface Subcategory {
    subcategoryKeyId: string;
    subcategoryValueId: string;
    subcategoryValueName: string;
}

interface UserData {
    id: string;
    name: string;
    games: Game[];
}

interface CategoryLinkProps {
    category: Category;
    userData: UserData;
}

const CategoryLink: FC<CategoryLinkProps> = ({category, userData}: CategoryLinkProps) => {
    const subcategoryLinkString = category.subcategories.map((subcategory) => 
        `${subcategory.subcategoryKeyId}=${subcategory.subcategoryValueId}`
    ).join("&");

    const subcategoryTextString = category.subcategories
        .map((subcategory) => subcategory.subcategoryValueName)
        .join(", ");

    return (
        <li key={category.categoryId}>
            <Link to={`/graph/${userData?.id}/${category.categoryId}?${subcategoryLinkString}`}>
                {category.categoryName} {category.subcategories.length > 0 ? `- ${subcategoryTextString}` : ""}
            </Link>
        </li>
    );
};

interface GameLinkSetProps {
    game: Game;
    userData: UserData;
}
const GameLinkSet: FC<GameLinkSetProps> = ({game, userData}: GameLinkSetProps) => {
    return (
        <>
            <h3> {game.name} </h3>
            {game.categories.map(category => (<CategoryLink key={category.categoryId} category={category} userData={userData}/>))}
        </>
    );
};

const UserPage: FC =  () => {
    const {id} = useParams<{id?: string}>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [userData, setUserData] = useState<UserData | null>(null);

    const getUserData = async () => {
        try {

            const dataRaw = await Promise.all([
                fetchp(`${SPEEDRUN_COM_URL}/users/${id}`,{timeout: 30000}),
                fetchp(`${SPEEDRUN_COM_URL}/users/${id}/personal-bests?embed=game,category`,{timeout: 30000})
            ]);

            const [userApiData, pbData] = await Promise.all(dataRaw.map((raw) => raw.json()));

            const categoryData: Category[] = await Promise.all(pbData.data.map(async (pb: any) => {
                if(pb.category.data.type === "per-level") {
                    // TODO implement this
                    return null;
                }
                const category: Category = {
                    gameName: pb.game.data.names.international,
                    gameId:  pb.game.data.id,
                    categoryName: pb.category.data.name,
                    categoryId: pb.category.data.id,

                    subcategories: []
                };
                
                await Promise.all(Object.entries(pb.run.values).map(async ([key, value]: [string, unknown]) => {
                    const variableDataRaw = await fetchp(`${SPEEDRUN_COM_URL}/variables/${key}`);
                    const variableData = await variableDataRaw.json();
                    
                    category.subcategories.push({
                        subcategoryKeyId: key,
                        subcategoryValueId: value as string,
                        subcategoryValueName: variableData.data.values.values[value as string].label
                    });
                }));

                return category;
            }));

            const games: Game[] = [];

            categoryData.forEach(category=> {
                if(category===null) return;
                let added = false;
                games.forEach(game => {
                    if(game.id === category.gameId) {
                        game.categories.push(category);
                        added = true;
                    }
                });

                if(!added) games.push({
                    id: category.gameId,
                    name: category.gameName,
                    categories: [category]
                });
            });

            games.map(game=>({
                ...game,
                categories: game.categories.sort((a,b) => a.categoryName.localeCompare(b.categoryName))
            }));
            
            setIsLoading(false);

            setUserData({
                id: userApiData.data.id,
                name: userApiData.data.names.international,
                games: games
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
        {userData?.games.map((game: Game) => (
            <GameLinkSet game={game} userData={userData} key={game.id} />
        ))}
    </>);

};

export default UserPage;