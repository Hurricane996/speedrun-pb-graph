import fetchp from "fetch-jsonp";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "./Alerts";
import { SPEEDRUN_COM_URL } from "./App";
import { groupBy } from "lodash";
import { SRCResult, SRCUser, SRCVariableSet, SRCPB_gcl } from "./SRCQueryResults";


interface Game {
    name: string,
    id: string,
    fullGameCategories: Category[];
    levelCategories: LevelCategory[]
}

interface LevelCategory extends Category {
    levelId: string,
    levelName: string
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
    userID: string;
}

interface LevelCategoryLinkProps {
    category: LevelCategory;
    userID: string;
}

const FullGameCategoryLink: FC<CategoryLinkProps> = ({category, userID}: CategoryLinkProps) => {
    const subcategoryLinkString = category.subcategories.map((subcategory) => 
        `${subcategory.subcategoryKeyId}=${subcategory.subcategoryValueId}`
    ).join("&");

    const subcategoryTextString = category.subcategories
        .map((subcategory) => subcategory.subcategoryValueName)
        .join(", ");

    return (
        <li>
            <Link to={`/graph/${userID}/${category.categoryId}?${subcategoryLinkString}`}>
                {category.categoryName} {category.subcategories.length > 0 ? `- ${subcategoryTextString}` : ""}
            </Link>
        </li>
    );
};


const LevelCategoryLink: FC<LevelCategoryLinkProps> = ({category, userID}: LevelCategoryLinkProps) => {
    const subcategoryLinkString = category.subcategories.map((subcategory) => 
        `${subcategory.subcategoryKeyId}=${subcategory.subcategoryValueId}`
    ).join("&");

    const subcategoryTextString = category.subcategories
        .map(subcategory => subcategory.subcategoryValueName)
        .join(", ");

    return (
        <li>
            <Link to={`/graph/il/${userID}/${category.levelId}/${category.categoryId}?${subcategoryLinkString}`}>
                {category.levelName} {category.categoryName} {category.subcategories.length > 0 ? `- ${subcategoryTextString}` : ""}
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
            <h1> {game.name} </h1>
            {game.fullGameCategories.length > 0 ? <h2>Full game runs:</h2> : <></>}
            <ul>
                {game.fullGameCategories.map((category) => (
                    <FullGameCategoryLink key={JSON.stringify(category)} category={category} userID={userData.id}/>
                ))}
            </ul>
            {game.levelCategories.length > 0 ? <h2>IL runs:</h2> : <></>}
            <ul>
                {game.levelCategories.map((category) => (
                    <LevelCategoryLink key={JSON.stringify(category)} category={category} userID={userData.id}/>
                ))}
            </ul>
        </>
    );
};

const loadVariables = async (variables: SRCVariableSet): Promise<Subcategory[]> => {
    return await Promise.all(Object.entries(variables).map(async ([key, value]: [string, unknown]) => {
        const variableDataRaw = await fetchp(`${SPEEDRUN_COM_URL}/variables/${key}`);
        const variableData = await variableDataRaw.json();
        
        return {
            subcategoryKeyId: key,
            subcategoryValueId: value as string,
            subcategoryValueName: variableData.data.values.values[value as string].label
        };
    }));
};



const getUserData = async (
    id: string, 
    setIsLoading: Dispatch<SetStateAction<boolean>> , 
    setIsError: Dispatch<SetStateAction<boolean>>, 
    setErrorMessage: Dispatch<SetStateAction<string>>, 
    setUserData: Dispatch<SetStateAction<UserData| null>> 
) => {
    try {

        const [userApiDataRaw, pbDataRaw] = await Promise.all([
            fetchp(`${SPEEDRUN_COM_URL}/users/${id}`,{timeout: 30000}),
            fetchp(`${SPEEDRUN_COM_URL}/users/${id}/personal-bests?embed=game,category,level`,{timeout: 30000})
        ]);

        const [userApiData, pbData] = await Promise.all([
            userApiDataRaw.json<SRCResult<SRCUser>>(),
            pbDataRaw.json<SRCResult<SRCPB_gcl[]>>()
        ]);

        const pbDataGrouped  = groupBy(pbData.data, pb => pb.category.data.type);

        const pbDataFullGame = pbDataGrouped["per-game"];
        const pbDataIL = pbDataGrouped["per-level"];
        
        const categoryDataFullGame: Category[] = (await Promise.all(pbDataFullGame.map(async pb => ({
            gameName: pb.game.data.names.international,
            gameId:  pb.game.data.id,
            categoryName: pb.category.data.name,
            categoryId: pb.category.data.id,

            subcategories: await loadVariables(pb.run.values)
        })))).sort((a: Category, b: Category) => {
            if(a.categoryName < b.categoryName) return -1;
            if(a.categoryName > b.categoryName) return 1;
            if(a.subcategories.length == 0) return 0;
            if(a.subcategories[0].subcategoryValueName < b.subcategories[0].subcategoryValueName) return -1;
            if(a.subcategories[0].subcategoryValueName > b.subcategories[0].subcategoryValueName) return 1;
            return 0;
        });

        const categoryDataILs: LevelCategory[] = (await Promise.all((pbDataIL.map(async pb => ({
            gameName: pb.game.data.names.international,
            gameId:  pb.game.data.id,
            categoryName: pb.category.data.name,
            categoryId: pb.category.data.id,
            levelId: pb.level.data.id,
            levelName: pb.level.data.name,

            subcategories: await loadVariables(pb.run.values)        
        }))))).sort((a: LevelCategory, b: LevelCategory) => {
            if(a.levelName < b.levelName) return -1;
            if(a.levelName > b.levelName) return 1;
            if(a.categoryName < b.categoryName) return -1;
            if(a.categoryName > b.categoryName) return 1;
            if(a.subcategories.length == 0) return 0;
            if(a.subcategories[0].subcategoryValueName < b.subcategories[0].subcategoryValueName) return -1;
            if(a.subcategories[0].subcategoryValueName > b.subcategories[0].subcategoryValueName) return 1;

            return 0;
        });


        const games: Game[] = [...new Set<Game>(pbData.data.map(pb => ({
            id: pb.game.data.id,
            name: pb.game.data.names.international,
            fullGameCategories: [],
            levelCategories: []
        })))].map(({id, name}) => ({
            id,
            name,
            fullGameCategories: categoryDataFullGame.filter(category => category.gameId === id),
            levelCategories: categoryDataILs.filter(category => category.gameId === id)
        }));


        setUserData({
            id: userApiData.data.id,
            name: userApiData.data.names.international,
            games: games
        });
      
        setIsLoading(false);

    } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
        console.error(error);
    }
};

const UserPage: FC =  () => {
    const {id} = useParams<{id: string}>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [userData, setUserData] = useState<UserData | null>(null);

   

    useEffect(()=>{getUserData(id, setIsLoading, setIsError, setErrorMessage, setUserData);},[]);

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