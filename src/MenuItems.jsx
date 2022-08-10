import React, { Component } from "react";
import { useRouteMatch, Link,} from "react-router-dom";
import styled from 'styled-components';


const styledNav = styled.ul`
display: flex; justify-content: space-between;
max-width: 400px;
min-width: 300px;

li {
  list-style: none;
}
`


export default class MenuItems extends Component {
  BootstrapLink = ({ label, to, activeOnlyWhenExact }) => {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });

    return (
      <li className={match ? "active" : ""}>
        <Link to={to}>{label}</Link>
      </li>
    );
  };

  render() {
    return (
      <styledNav className="nav navbar-nav">
        <this.BootstrapLink to="/clocks" label="Clocks" />
        <this.BootstrapLink to="/currency" label="Currency" />
        <this.BootstrapLink to="/maps" label="Map" />
        <this.BootstrapLink to="/flights" label="Flights" />
        <this.BootstrapLink to="/phrases" label="Phrases" />
      </styledNav>
    );
  }
}
