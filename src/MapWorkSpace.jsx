import React, { Component } from "react";
import Map from "./Map";
import MapControls from "./MapControls.jsx";

export default class MapWorkSapce extends Component {

  state = {
    mapType: "map"
  };
  
  toggleMapType = () => {
    let _mapType = this.state.mapType === "map" ? "sat" : "map";
    this.setState({ mapType: _mapType });
  }


  render (){
    return (
      <div className="map-workspace container">
        <MapControls buttonHandler={this.toggleMapType} />
        <Map />
      </div>
    );
  } 
}
