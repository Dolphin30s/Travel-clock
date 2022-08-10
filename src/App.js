
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import styled from 'styled-components';

import Nav from "./Nav";
import ClockWorkSpace from "./ClockWorkSpace";
import CurrencyWorkSpace from "./CurrencyWorkSpace";
import MapWorkSpace from './MapWorkSpace'

function App() {
  return (
    <div className={"App"}>
      <Router>
        <Nav />
        <Redirect from="/" exact to="/clocks" />
        <Route path="/clocks" component={ClockWorkSpace} />
        <Route path="/currency" component={CurrencyWorkSpace} />
        <Route path="/maps" component={MapWorkSpace} />
        <Route path="/flights" component={flightsComponent} />
        <Route path="/phrases" component={phrasesComponent} />
      </Router>
    </div>
  );
}

const flightsComponent = () => <TitleStyle>FLIGHTS ROUTE</TitleStyle>;
const phrasesComponent = () => <TitleStyle>PHRASES ROUTE</TitleStyle>;

const FlexBoxMixin = ({justify = "center", align = "center"}) => {
  return `
  display: flex; 
  justify-content: ${justify}; 
  align-items: ${align};
  `
}

const TitleStyle = styled.h1`
  background-color: seagreen;
  color: white;
  padding: 25px;
  ${FlexBoxMixin({})}
`


export default App;
