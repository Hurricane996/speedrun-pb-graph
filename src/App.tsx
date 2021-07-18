import React, { FC, Suspense } from "react";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import CacheProvider from "./utils/CacheProvider";
import styles from "./App.module.css";
import githubLogo from "./githubLogo.svg";
import { LoadingAlert } from "./components/Alerts";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const GraphPage = React.lazy(() => import("./pages/GraphPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const SearchResultsPage = React.lazy(() => import("./pages/SearchPage"));

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
                    <a aria-label="Project Github" href="https://github.com/Hurricane996/speedrun-pb-graph"><img src={githubLogo} alt="Github Logo" className={styles.githubLogo}/></a>
                </div>
                <div className={styles.container}>
                    <Suspense fallback={LoadingAlert}>
                        <Switch>
                            <Route path="/user/:id" exact component={UserPage}/>
                            <Route path="/graph/il/:userId/:levelId/:categoryId" exact component={GraphPage} />
                            <Route path="/graph/:userId/:categoryId" exact component={GraphPage}/>
                            <Route path="/search/:query" exact component={SearchResultsPage}/>
                            <Route path="/" exact component={HomePage}/>
                            <Route>404</Route>
                        </Switch>
                    </Suspense>
                </div>
            </CacheProvider>
        </Router>
    );
};


export default App;

