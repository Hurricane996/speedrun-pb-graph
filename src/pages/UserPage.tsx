import React, {  FC } from "react";
import {Link, useParams} from "react-router-dom";
import { ErrorAlert, LoadingAlert } from "../components/Alerts";
import { SPEEDRUN_COM_URL } from "../App";
import { SRCResult, SRCUser, EmbedGame, EmbedCategory, EmbedLevel, SRCPB, SRCVariableSet, SRCVariable } from "../types/SRCQueryResults";
import useFetcher, { Fetcher, FetchWrapper } from "../utils/useFetcher";

interface Game {
    name: string;
    id: string;
    fullGameCategories: Category[];
    levelCategories: LevelCategory[];
}

interface Category {
    gameName: string;
    gameId: string;
    categoryName: string;
    categoryId: string;
    subcategories: Subcategory[];
}

interface LevelCategory extends Category {
    levelId: string;
    levelName: string;
}

interface UserData {
    id: string;
    name: string;
    games: Game[];
}

export interface Subcategory {
    subcategoryKeyId: string;
    subcategoryValueId: string;
    subcategoryValueName: string;
}

const loadVariables = async (variables: SRCVariableSet, fetchWrapper: FetchWrapper): Promise<Subcategory[]> =>  
    await Promise.all(Object.entries(variables).map(async ([key, value]: [string, string]) => {
        const variableData = await fetchWrapper<SRCResult<SRCVariable>>(`${SPEEDRUN_COM_URL}/variables/${key}`);

        return {
            subcategoryKeyId: key,
            subcategoryValueId: value,
            subcategoryValueName: variableData.data.values.values[value].label
        };
    }));

const sortCategories = (a: Category|LevelCategory, b: Category|LevelCategory) => {
    if(a.categoryName < b.categoryName) return -1;
    if(a.categoryName > b.categoryName) return 1;
    if(a.subcategories.length === 0 || b.subcategories.length === 0) return 0;
    if(a.subcategories[0].subcategoryValueName < b.subcategories[0].subcategoryValueName) return -1;
    if(a.subcategories[0].subcategoryValueName > b.subcategories[0].subcategoryValueName) return 1;
    if("levelName" in a && "levelName" in b) {
        if(a.levelName < b.levelName) return - 1;
        if(a.levelName > b.levelName) return 1;
    }
    return 0;
};



const fetcher: Fetcher<{id: string},UserData> = async ({id}, fetchWrapper) => {
    const [userApiData, pbData] = await Promise.all([
        fetchWrapper<SRCResult<SRCUser>>(`${SPEEDRUN_COM_URL}/users/${id}`),
        fetchWrapper<SRCResult<(SRCPB & EmbedGame & EmbedCategory & EmbedLevel)[]>>(`${SPEEDRUN_COM_URL}/users/${id}/personal-bests?embed=game,category,level`)
    ]);

    const pbDataFullGame = pbData.data.filter(pb => pb.category.data.type === "per-game");
    const pbDataIL =  pbData.data.filter(pb => pb.category.data.type === "per-level");

    const categoryDataFullGame: Category[] = (await Promise.all(pbDataFullGame.map(async pb => ({
        gameName: pb.game.data.names.international,
        gameId:  pb.game.data.id,
        categoryName: pb.category.data.name,
        categoryId: pb.category.data.id,

        subcategories: await loadVariables(pb.run.values, fetchWrapper)
    }))));

    const categoryDataILs: LevelCategory[] = (await Promise.all((pbDataIL.map(async pb => ({
        gameName: pb.game.data.names.international,
        gameId:  pb.game.data.id,
        categoryName: pb.category.data.name,
        categoryId: pb.category.data.id,
        levelId: pb.level.data.id,
        levelName: pb.level.data.name,

        subcategories: await loadVariables(pb.run.values, fetchWrapper)        
    })))));

    const gameIds: string[] = [...new Set<string>(pbData.data.map(pb => pb.game.data.id))];

    const games: Game[] = gameIds.map(id => {
        const fullGameCategories = categoryDataFullGame
            .filter(category => category.gameId === id)
            .sort(sortCategories);


        const levelCategories = categoryDataILs
            .filter(category => category.gameId === id)
            .sort(sortCategories);
        return {
            id,
            name: fullGameCategories.length > 0 ? fullGameCategories[0].gameName : levelCategories[0].gameName,
            fullGameCategories,
            levelCategories,
        };
    });

    return {
        id: userApiData.data.id,
        name: userApiData.data.names.international,
        games: games
    };
};

const subcategoryLinkString = (subcategories: Subcategory[]): string => subcategories.length
    ? "?" + subcategories.map((subcategory) => `${subcategory.subcategoryKeyId}=${subcategory.subcategoryValueId}`).join("&")
    : "";

const subcategoryTextString = (subcategories: Subcategory[]): string => subcategories.length
    ? " - " + subcategories.map((subcategory) => subcategory.subcategoryValueName).join(", ")
    : "";

const UserPage: FC =  () => {
    const {id} = useParams<{id: string}>();

    const [data, loading, error] = useFetcher(fetcher,{id});

    if(error) return <ErrorAlert error={error} />;
    if(loading) return <LoadingAlert/>;

    return (
        <>
            <h1>Categories for {data?.name}</h1>
            {data && data.games.length > 0 ? data.games.map((game: Game) => (
                <React.Fragment key={game.id}>
                    <h2> {game.name} </h2>
                    {game.fullGameCategories.length > 0 && 
                        <>
                            <h3>Full game runs:</h3>
                            <ul>
                                {game.fullGameCategories.map((category) => (
                                    <li key={JSON.stringify(category)}>
                                        <Link to={`/graph/${data.id}/${category.categoryId}${subcategoryLinkString(category.subcategories)}`}>
                                            {category.categoryName}{subcategoryTextString(category.subcategories)}
                                        </Link>
                                    </li>                
                                ))}         
                            </ul>
                        </>
                    }
                    {game.levelCategories.length > 0 && 
                        <>
                            <h3>IL runs:</h3>
                            <ul>
                                {game.levelCategories.map((category) => (
                                    <li key={JSON.stringify(category)}>
                                        <Link to={`/graph/il/${data.id}/${category.levelId}/${category.categoryId}?${subcategoryLinkString(category.subcategories)}`}>
                                            {category.levelName} {category.categoryName}{subcategoryTextString(category.subcategories)}
                                        </Link>
                                    </li>     
                                ))}
                            </ul>
                        </>
                    }
                </React.Fragment>
            )) : (<p>This user hasn&apos;t submitted any runs</p>)}
        </>
    );
};

export default UserPage;