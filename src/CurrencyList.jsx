import React, { Component } from "react";
import CurrencyPair from "./CurrencyPair";

export default class CurrencyList extends Component {
  
   render() {

    const {  deleteButtonHandler , currentAmount, reverseButtonHandler, currencyPairsList } = this.props;

    return (
      <div>
        {currencyPairsList.map(pair => (
          <CurrencyPair
            key={pair.id}
            currentAmount={currentAmount}
            deleteButtonHandler={deleteButtonHandler}
            reverseButtonHandler={reverseButtonHandler}
            {...pair}
          />
        ))}
      </div>
    );
  }
}
