import React, { Component } from "react";
import styled from 'styled-components';

// import '../styles/Clock.css';
var Numeral = require('numeral');

const PairStyle = styled.div`
.panel-heading {
  display: flex; justify-content: space-between; align-items: center;
  /* color: red; */
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

  .buttons button {
    margin-left: 10px;
  }


`

export default class CurrencyPair extends Component {




  render() {
    const { id, base, baseSymbol, baseName, target, targetSymbol, targetName, rate, deleteButtonHandler, currentAmount, reverseButtonHandler } = this.props;

    return (
      <PairStyle>
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="flag-box">
            <div><b>{baseName} / {targetName}</b> : <br /> {baseSymbol}{currentAmount} = {targetSymbol}{Numeral(rate*currentAmount).format('0,0.00')}</div>
          </div>

          <div className="buttons">
            <button className={"btn btn-primary"} onClick={() => reverseButtonHandler(id) }> Reverse </button>
            <button className={"btn btn-danger"} onClick={() => deleteButtonHandler(id) }>Delete</button>
          </div>  
        </div>

        <div className="panel-body">
          <ul>
            <li>Base: {base} ({baseSymbol})</li>
            <li>Target: {target} ({targetSymbol})</li>
            <li> Rate: {Numeral(rate).format('0,0.0000')} </li>
          </ul>
        </div>
      </div>
      </PairStyle>
    );
  }
}
