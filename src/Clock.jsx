import React, { Component } from 'react'
import styled from 'styled-components'
import Numeral from 'numeral';

import AnalogClock from 'react-clock';
import ClockFlag from './ClockFlag';


const ClockStyles = styled.div`
    .panel-heading {
    display: flex; justify-content: space-between; align-items: center;
    }

    .panel-body {
    display: flex; 
    justify-content: space-between;
    }


    .panel-body > .react-clock {
    order: 1;
    }

    .panel-body > ul {
    order: -1;
    }

    .flag-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 450px;
    }

    .flag-box > div {
    margin-left: 30px;
    }

`

export default class Clock extends Component {

render() {

    const { capital, country, adjustedTimeString, adjustedTime, timezone, deleteButtonHandler, flag_url, region, population, } = this.props;

    return (
        <ClockStyles>
        <div className="panel panel-default">

            <div className="panel-heading"> 
                <div className="flag-box">
                    <ClockFlag flag_url={flag_url}/> 
                    <div> <b>{country}</b>: <br/> {adjustedTimeString}</div> 
                </div>
                <button className={"btn btn-danger"} onClick={ ()=> deleteButtonHandler(country) }> Delete </button>
            </div>
            
            <div className="panel-body">
                <ul>
                    <li> Time Zone: {timezone} </li>
                    <li> Capital: {capital} </li>
                    <li> Region: {region} </li>
                    <li> Population: {Numeral(Numeral(population).format('0,0')).format('0,0')} </li>  
                </ul>
                <AnalogClock renderNumbers={true} value={adjustedTime} size={100}/>
            </div>
    
        </div>
        </ClockStyles>
    )
}

}

