import React, {Component} from 'react';
import styled from 'styled-components';
import Logo from './Logo';


const styledTitle = styled.div`

display: flex; justify-content: space-between;align-items: center;align-items: center;
min-width: 200px;

a.navbar-brand[href] {
  color: #5cb85c ;
}

`

export default class Title extends Component{
     
    render(){
        return (
        <styledTitle className="navbar-header">
            <Logo/>
            <a className="navbar-brand" href="/">TravelBuddy</a>
        </styledTitle>
        )
    }
}