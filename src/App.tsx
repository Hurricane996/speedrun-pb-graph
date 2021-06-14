import React from 'react';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import GraphPage from './GraphPage';

import HomePage from './HomePage';
import UserPage from './UserPage'

export const SPEEDRUN_COM_URL = "https://speedrun.com/api/v1";


const App = () => {
  return (
    <Router>
      <h1>
        <Link to="/">Speedrun PB Grapher</Link>
      </h1>
      <b>This site is still under construction</b>

      <Switch>
        <Route path="/user/:id" exact>
          <UserPage />
        </Route>
        <Route path="/graph/:userId/:categoryId" exact>
          <GraphPage />
        </Route>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route>404</Route>
      </Switch>
    </Router>
  );
}


export default App;

