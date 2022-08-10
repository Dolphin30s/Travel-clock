import React, { Component } from 'react'
import { v4 as UUID} from 'uuid';
import styled from 'styled-components';

import Toggle from 'react-toggle'
import "react-toggle/style.css";


const countries = require('../public/countries.json');

const ControlStyles = styled.div`

  display: flex;
  justify-content: space-between;
  max-width: 750px;
  margin: 10px 0;

.check {
  width: 110px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
}
`

export default class Controls extends Component {

shouldComponentUpdate() {
    return false;
}

render() {
    const { listUpdateHandler, addButtonClickHandler, toggle24Handler} = this.props;
    return (
        <ControlStyles className="control-bar">
            <button className="btn btn-success" onClick={addButtonClickHandler} > Add Clock</button>
            
            <select onChange={listUpdateHandler} name="country" id="country">
                {countries.map( country => <option key={UUID()} value={country.name}> {country.name} </option>)}
            </select>
            
            <div className="check">
                <Toggle onChange={toggle24Handler} defaultChecked={false}/>
                <span id='biscuit-label'>24 Hours</span>
            </div>
        </ControlStyles>
    )
}

}
