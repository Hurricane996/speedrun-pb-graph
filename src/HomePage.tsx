import axios, { CancelTokenSource } from "axios-jsonp-pro";
import React, { ChangeEvent, useState } from "react";
import { FC } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SPEEDRUN_COM_URL } from "./App";

let cancelToken: CancelTokenSource | null  = null;

interface User {
    name: string,
    id: string
}




const HomePage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchValueIsLoading, setSearchValueIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<User[]>([]);
  
    const getInfo = async (query: string) => {
        if(cancelToken) {
            cancelToken.cancel();
        }
        try {
            cancelToken = axios.CancelToken.source();

            const {data} = await axios.jsonp(`${SPEEDRUN_COM_URL}/users?name=${query}&callback=callback`,{cancelToken: cancelToken.token});

            console.log(data);

            setResults(data.slice(0,5).map(
                ({id, names}: any) => ({
                    id, 
                    name: names.international
                })
            ));

            setSearchValueIsLoading(false);

        } catch(error)  {
            console.log(error);
        }
    };

  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setSearchValueIsLoading(true);
        if(event.target.value.length >= 1) {
            getInfo(event.target.value);
        }
        else {
            setResults([]);
        }
    };
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>
              Enter your speedrun.com username
                    </Form.Label>
                    <Form.Control type="search" name="username" onChange={handleInputChange} value={searchValue}/>
                </Form.Group>
                { !searchValueIsLoading && searchValue.length != 0 ? (
                    <>
                        <h3>Users:</h3>
                        <ul>
                            {results.length > 0 ? results.map(({id, name}) => (
                                <li key={id}><Link to={`/user/${id}`}>{name} </Link></li>
                            )) : (<p>No users found</p>)}
                        </ul>
                    </>
                ) : searchValue.length != 0 ? (<p>Loading...</p>) : <></> }
            </Form>
        </>
    );
};

export default HomePage;