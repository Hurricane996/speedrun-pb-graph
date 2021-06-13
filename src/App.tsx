import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import HomePage from './HomePage';
import UserPage from './UserPage'




const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <h1>
        <Link to="/">Speedrun PB Grapher</Link>
      </h1>
      <b>This site is still under construction</b>

      <Switch>
        <Route path="/user/:id">
          <UserPage />
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
