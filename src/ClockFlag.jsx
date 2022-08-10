import React, { Component } from 'react'

export default class ClockFlag extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { flag_url } = this.props;
    return <img src={flag_url} width="30px"/>  
  }
}