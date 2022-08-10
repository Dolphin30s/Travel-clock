import React, {Component} from 'react';
import MenuItems from './MenuItems';
import Title from './Title';


export default class Nav extends Component{
    
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Title/>
                    <MenuItems/>
                </div>
            </nav>
        )
    }
}