import React, {  FC  } from "react";

import SearchComponent from "../components/SearchComponent";

const HomePage: FC = () => {
    return (
        <>
            <h1> Welcome to the Speedrun PB Grapher</h1>
            <p> Enter your username to get started!</p>
            <SearchComponent />
        </>
    );
};

export default HomePage;