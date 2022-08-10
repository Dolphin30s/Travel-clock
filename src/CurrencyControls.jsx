import React, { Component } from "react";
import styled from 'styled-components';


import {v4 as UUID} from 'uuid';
const countries = require('../public/countries.json');

const WorkspaceStyles = styled.div`

   div {
    display: flex;
  }

   div label {
    align-self: center
  }

  .buttons button {
    margin-left: 10px;
  }
`


export default class CurrencyControls extends Component {
  state = {
    availableCurrencies: [
      "CAD",
      "HKD",
      "ISK",
      "PHP",
      "DKK",
      "HUF",
      "CZK",
      "AUD",
      "RON",
      "SEK",
      "IDR",
      "INR",
      "BRL",
      "RUB",
      "HRK",
      "JPY",
      "THB",
      "CHF",
      "SGD",
      "PLN",
      "BGN",
      "TRY",
      "CNY",
      "NOK",
      "NZD",
      "ZAR",
      "USD",
      "MXN",
      "ILS",
      "GBP",
      "KRW",
      "MYR"
    ]
  };

currencyMetaData = (currencyCode) => {
  let currencies = [] 
  
  countries
    .map( country => country.currencies)
    .forEach( array => currencies.push(...array))

  currencies = currencies.map( currency => JSON.stringify(currency))
  currencies = [...new Set(currencies)];
  currencies = currencies.map( currency => JSON.parse(currency))

  return currencies.find( currency => currency.code === currencyCode)
}


  shouldComponentUpdate() {
    return false;
  }

  render() {

    const { addButtonClickHandler, listUpdateHandler, amountHandler } = this.props;

    return (

        <WorkspaceStyles className="currency-controls control-bar">
          <button className="btn btn-success" onClick={addButtonClickHandler}>
            Add Currency Pair
          </button>
          
          <div>  
            <label>Amount</label>
            <input onChange={amountHandler}  placeholder="1"  type="number" name="amount" id="amount"/>
          </div>

          <div>
            <label htmlFor="">Base</label>
            <select onChange={listUpdateHandler} id="base">
              <option key={UUID()} value="default"> Select currency </option> 
              {this.state.availableCurrencies.map(currency => <option key={UUID()} value={currency}> {this.currencyMetaData(currency).name} / {currency} - ({this.currencyMetaData(currency).symbol}) </option>)}
            </select>
          </div>

          <div>
            <label>Target</label>
            <select onChange={listUpdateHandler} id="base">
               <option key={UUID()} value="default"> Select currency </option>
               {this.state.availableCurrencies.map(currency => <option key={UUID()} value={currency}> {this.currencyMetaData(currency).name} / {currency} - ({this.currencyMetaData(currency).symbol}) </option>)}
            </select>
          </div>
        </WorkspaceStyles>

    );
  }
}
