import React, { FC } from "react";

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import GraphPage from "./GraphPage";

import HomePage from "./HomePage";
import UserPage from "./UserPage";

import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./SearchPage";
import SearchComponent from "./SearchComponent";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Github } from "react-bootstrap-icons";


export const SPEEDRUN_COM_URL = "https://speedrun.com/api/v1";


const App : FC = ()  => {
    return (
        <Router>
            <Navbar bg="dark" expand="lg" className="mb-4" style={{justifyContent:"space-between"}}>
                <Nav>
                    <Navbar.Brand href="#/" style={{color: "white"}}>Speedrun PB Grapher</Navbar.Brand>
                    <Nav.Link href="#/" style={{color: "white"}}>Home</Nav.Link>
                </Nav>
                
                <Nav className="float-right">
                    <SearchComponent/>
                    <Nav.Link href="https://github.com/Hurricane996/speedrun-pb-graph"><Github style={{color: "white"}} className="ml-auto"/></Nav.Link>
                </Nav>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/user/:id" exact>
                        <UserPage />
                    </Route>
                    <Route path="/graph/:userId/:categoryId" exact>
                        <GraphPage />
                    </Route>
                    <Route path="/search/:query" exact>
                        <SearchPage />
                    </Route>
                    <Route path="/" exact>
                        <HomePage/>
                    </Route>
                    <Route>404</Route>
                </Switch>
            </Container>
        </Router>
    );
};


export default App;
