import React, {  FC  } from "react";

import SearchComponent from "../componentrs/SearchComponent";

const HomePage: FC = () => {


    return (
        <>
            <h1> Welcome to the Speedrun PB Grapher</h1>
            <h3> Enter your username to get started!</h3>
            <SearchComponent />
        </>
    );
};

export default HomePage;