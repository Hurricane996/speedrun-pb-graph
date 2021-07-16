import React, { FC } from "react";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import GraphPage from "./pages/GraphPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import SearchComponent from "./components/SearchComponent";
import CacheProvider from "./utils/CacheProvider";
import styles from "./App.module.css";

import githubLogo from "./githubLogo.svg";

export const SPEEDRUN_COM_URL = "https://speedrun.com/api/v1";

const App : FC = ()  => {
    return (
        <Router>
            <CacheProvider>
                <div className={styles.navbar}>
                    <div>
                        <NavLink to="/" className={styles.navHeader}>Speedrun PB Grapher</NavLink>
                    </div>
                    <span className={styles.rightAligner}>
                        <SearchComponent/>
                    </span>
                    <a aria-label="Project Github" href="https://github.com/Hurricane996/speedrun-pb-graph"><img src={githubLogo} className={styles.githubLogo}/></a>
                </div>
                <div className={styles.container}>
                    <Switch>
                        <Route path="/user/:id" exact>
                            <UserPage />
                        </Route>
                        <Route path="/graph/il/:userId/:levelId/:categoryId" exact>
                            <GraphPage/>
                        </Route>
                        <Route path="/graph/:userId/:categoryId" exact>
                            <GraphPage/>
                        </Route>
                        <Route path="/search/:query" exact>
                            <SearchPage />
                        </Route>
                        <Route path="/" exact>
                            <HomePage/>
                        </Route>
                        <Route>404</Route>
                    </Switch>
                </div>
            </CacheProvider>
        </Router>
    );
};


export default App;

