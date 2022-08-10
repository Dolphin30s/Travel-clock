import React, { Component } from "react";
import styled from 'styled-components';

import CurrencyList from "./CurrencyList";
import CurrencyControls from "./CurrencyControls";

import axios from "axios";
import { v4 as UUID } from "uuid";
const countries = require('../public/countries.json');

const WorkSpaceStyles = styled.div`
  .currency-controls {
    display: flex;
    justify-content: flex-start;
  }

  label {
    margin-right: 10px;
    margin-left: 30px;
  }
`

export default class CurrencyWorkSpace extends Component {
  state = {
    selectedBase: "Select currency",
    selectedTarget: "Select currency",
    currentAmount: 1,
    currencyPairsList: [],
    errorMessage: ""
  };

  currencyMetaData = currencyCode => {
    let currencies = [];
    countries
      .map(country => country.currencies)
      .forEach(array => {
        currencies.push(...array);
      });

    currencies = currencies.map(currency => JSON.stringify(currency));
    currencies = [...new Set(currencies)];
    currencies = currencies.map(currency => JSON.parse(currency));

    return currencies.find(currency => currency.code === currencyCode);
  };

  getRate = async function(base, target) {
    const base_url = `https://api.exchangeratesapi.io/latest`;
    const url = `${base_url}?base=${base}&symbols=${target}`;
    const response = (await axios.get(url)).data;
    return response;
  };

  componentDidMount = async () => {
    const currencyPair1 = await this.getRate("USD", "EUR");
    const [[, rate1]] = Object.entries(currencyPair1.rates);

    let { symbol: baseSymbol1, name: baseName1 } = this.currencyMetaData("USD");
    let { symbol: targetSymbol1, name: targetName1 } = this.currencyMetaData("EUR");

    const obj1 = {
      id: UUID(),
      base: "USD",
      baseSymbol: baseSymbol1,
      baseName: baseName1,
      target: "EUR",
      targetSymbol: targetSymbol1,
      targetName: targetName1,
      rate: rate1
    };

    const currencyPair2 = await this.getRate("GBP", "ILS");
    const [[, rate2]] = Object.entries(currencyPair2.rates);

    let { symbol: baseSymbol2, name: baseName2 } = this.currencyMetaData("GBP");
    let { symbol: targetSymbol2, name: targetName2 } = this.currencyMetaData(
      "ILS"
    );

    const obj2 = {
      id: UUID(),
      base: "GBP",
      baseSymbol: baseSymbol2,
      baseName: baseName2,
      target: "ILS",
      targetSymbol: targetSymbol2,
      targetName: targetName2,
      rate: rate2
    };

    const obj3 = {
      base: "HRK",
      baseName: "Croatian kuna",
      baseSymbol: "kn",
      id: "55099760-81e0-4bfd-9d46-fcd97cd043ed",
      rate: 2.5375281196,
      target: "ZAR",
      targetName: "South African rand",
      targetSymbol: "R"
    };

    const obj4 = {
      base: "PLN",
      baseName: "Polish złoty",
      baseSymbol: "zł",
      id: "45f04166-7f0a-482c-ab68-103c52315818",
      rate: 34.976615123,
      target: "ISK",
      targetName: "Icelandic króna",
      targetSymbotargetSymbol: "kr"
    };

    let _currencyPairsList = this.state.currencyPairsList;
    _currencyPairsList.push(obj1, obj2, obj3, obj4);
    this.setState({ currencyPairsList: _currencyPairsList });
  };

  listUpdateHandler = event => {
    let prop =
      event.target.previousSibling.innerText === "Base"
        ? "selectedBase"
        : "selectedTarget";
    
        let newState = {};
    newState[prop] = event.target.value;
    console.log(newState)
    this.setState(newState);

    if (
      this.state.selectedBase !== "Select currency" &&
      this.state.selectedTarget !== "Select currency"
    ) {
      this.setState({ errorMessage: "" });
    }
  };

  amountHandler = event => {
    console.log(event.target.value);
    this.setState({currentAmount: Number(event.target.value)});
  };

  addButtonClickHandler = async () => {
    if (this.state.selectedBase !== "Select currency" && this.state.selectedTarget !== "Select currency") {
      
      let currencyPair = await this.getRate(
        this.state.selectedBase,
        this.state.selectedTarget
      );

      const [[, rate]] = Object.entries(currencyPair.rates);

      let _currencyPairsList = this.state.currencyPairsList;

      let { symbol: baseSymbol, name: baseName } = this.currencyMetaData(this.state.selectedBase);
      let { symbol: targetSymbol, name: targetName } = this.currencyMetaData(this.state.selectedTarget);

      let pair = {
        id: UUID(),
        base: this.state.selectedBase,
        baseSymbol,
        baseName,
        target: this.state.selectedTarget,
        targetSymbol,
        targetName,
        rate: rate
      };

      console.log(pair);
      _currencyPairsList.push(pair);
      this.setState({ currencyPairsList: _currencyPairsList });

    } else {
      this.setState({ errorMessage: "Select a base and target currency" });
    }
  };

  deleteButtonHandler = id => {
    console.log(id);
    let _currencyPairsList = this.state.currencyPairsList;
    _currencyPairsList = _currencyPairsList.filter(pair => pair.id !== id);
    this.setState({
      currencyPairsList: _currencyPairsList
    });
  };

  reverseButtonHandler = async id => {
    let _currencyPairsList = Object.assign([], this.state.currencyPairsList);

    let oldPair = _currencyPairsList.find(pair => pair.id === id);

    console.log(oldPair);

    const currencyPair = await this.getRate(oldPair.target, oldPair.base);
    const [[, rate]] = Object.entries(currencyPair.rates);

    let { symbol: baseSymbol, name: baseName } = this.currencyMetaData(
      oldPair.target
    );
    let { symbol: targetSymbol, name: targetName } = this.currencyMetaData(
      oldPair.base
    );

    let newPair = {
      id: oldPair.id,
      base: oldPair.target,
      baseSymbol: baseSymbol,
      baseName: baseName,
      target: oldPair.base,
      targetSymbol: targetSymbol,
      targetName: targetName,
      rate: rate
    };

    console.log(newPair);

    let oldIndex = _currencyPairsList.findIndex(pair => pair.id === oldPair.id);
    _currencyPairsList.splice(oldIndex, 1, newPair);
    this.setState({ currencyPairsList: _currencyPairsList });
  };

  render() {
    const controlProps = {
      addButtonClickHandler: this.addButtonClickHandler,
      listUpdateHandler: this.listUpdateHandler,
      amountHandler: this.amountHandler
    };

    console.log(this.state.currencyPairsList, 'list')

    return (
      <WorkSpaceStyles>
        <CurrencyControls {...controlProps} />
        <p className="error-message"> {this.state.errorMessage}</p>
        <CurrencyList
          currentAmount={this.state.currentAmount}
          currencyPairsList={this.state.currencyPairsList}
          deleteButtonHandler={this.deleteButtonHandler}
          reverseButtonHandler={this.reverseButtonHandler}
        />
      </WorkSpaceStyles>
    );
  }
}
