import React from 'react';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import GraphPage from './GraphPage';

import HomePage from './HomePage';
import UserPage from './UserPage'

import Container from 'react-bootstrap/Container'
import { Nav, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export const SPEEDRUN_COM_URL = "https://speedrun.com/api/v1";


const App = () => {
  return (
    <Router>
      <Navbar bg="dark">
          <Navbar.Brand><Link to="/" style={{textDecoration: 'none'}}><h4 style={{color: 'white'}}>Speedrun PB Grapher</h4></Link></Navbar.Brand>
          <Nav.Item><Link to="/" style={{color:'white', textDecoration:'none'}}>Home</Link></Nav.Item>
      </Navbar>
      <Container>
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
      </Container>
    </Router>
  );
}


export default App;

