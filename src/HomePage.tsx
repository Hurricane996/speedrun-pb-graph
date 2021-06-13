import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";



interface User {
    name: string,
    id: string
}

const HomePage = () => {
    let [searchValue, setSearchValue] = useState<string>('');
    let [results, setResults] = useState<User[]>([]);
  
  
    const getInfo = (query: string) => {
      axios.get(`https://speedrun.com/api/v1/users?name=${query}`)
        .then(({ data }) => {
          setResults(data.data.slice(0,5).map((x: any) => {return {id: x.id, name: x.names.international}}))
          console.log(data)
        }).catch((thrown) => {console.log(thrown)});
  
  
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
          <ul>
            {results.map(({id, name}) => (
              <li><Link to={`/user/${id}`}>{name} </Link></li>
            ))}
          </ul>
        </form>
      </>
    )
  }

  export default HomePage;