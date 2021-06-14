import axios, { CancelTokenSource } from "axios";
import React, { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SPEEDRUN_COM_URL } from "./App";

let cancelToken: CancelTokenSource | null  = null;

interface User {
    name: string,
    id: string
}




const HomePage = () => {
    let [searchValue, setSearchValue] = useState<string>('');
    let [searchValueIsLoading, setSearchValueIsLoading] = useState<boolean>(false);
    let [results, setResults] = useState<User[]>([]);
  
    const getInfo = async (query: string) => {
      if(cancelToken) {
        cancelToken.cancel();
      }
      try {
          cancelToken = axios.CancelToken.source();

          let {data} = await axios.get(`${SPEEDRUN_COM_URL}/users?name=${query}`,{cancelToken: cancelToken.token})

          console.log(data.data)

          setResults(data.data.slice(0,5).map(
              ({id, names}: any) => ({
                  id, 
                  name: names.international
              })
          ))

          setSearchValueIsLoading(false);

      } catch(error)  {
          console.log(error);
      };
  }

  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setSearchValueIsLoading(true);
        if(event.target.value.length >= 1) {
            getInfo(event.target.value);
        }
        else {
            setResults([])
        }
    }
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
                <li><Link to={`/user/${id}`}>{name} </Link></li>
              )) : (<p>No users found</p>)}
            </ul>
            </>
            ) : searchValue.length != 0 ? (<p>Loading...</p>) : <></> }
        </Form>
      </>
    )
  }

  export default HomePage;