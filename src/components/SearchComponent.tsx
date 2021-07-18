import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { useHistory } from "react-router";
import styles from "./SearchComponent.module.css";

import searchIcon from "./search.svg";

const SearchComponent: FC = () => {
    const [search, setSearch] = useState<string>("");
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/search/${search}`);
    };
    return (    
        <form onSubmit={submit} className={styles.form}>
            <input 
                type="search"
                name="username"
                placeholder="speedrun.com username"
                value={search} 
                onChange={handleChange}
                className={styles.searchInput}
            />
            <button type="submit" aria-label="search" className={styles.searchButton}><img src={searchIcon} className={styles.searchIcon}/></button>
        </form>
    );
};

export default SearchComponent;