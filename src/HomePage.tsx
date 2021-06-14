import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SPEEDRUN_COM_URL } from "./App";



interface User {
    name: string,
    id: string
}



const HomePage = () => {
    let [searchValue, setSearchValue] = useState<string>('');
    let [results, setResults] = useState<User[]>([]);
  
    const getInfo = async (query: string) => {
      try {
          let {data} = await axios.get(`${SPEEDRUN_COM_URL}/users?name=${query}`)

          console.log(data.data)

          setResults(data.data.slice(0,5).map(
              ({id, names}: any) => ({
                  id, 
                  name: names.international
              })
          ))

      } catch(error)  {
          console.log(error.message);
      };
  }

  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if(event.target.value.length >= 1) {
            getInfo(event.target.value);
        }
        else {
            setResults([])
        }
    }
    return (
      <>
        <form>
          <label>
            Enter your username
          </label>
          <input type="text" name="username" onChange={handleInputChange} value={searchValue}/>
          { searchValue.length > 0 ? (
          <ul>
            {results.length > 0 ?results.map(({id, name}) => (
              <li><Link to={`/user/${id}`}>{name} </Link></li>
            )) : (<p>No users found</p>)}
          </ul>) : <></> }
        </form>
      </>
    )
  }

  export default HomePage;