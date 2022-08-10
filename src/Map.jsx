import React, { Component } from "react";
import styled from 'styled-components';

const StyledDiv = styled.div`

width: 95%;
height: 800px;
display: flex;
flex-flow: column;
align-items: center;
justify-content: space-around;

.mapContainer {
  height: calc(100% - 80px);
  width: 100%;
}
`

export default class Map extends Component {

  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.googleMap, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }

  render() {
    return (
      <StyledDiv className="map">
        <div ref="googleMap" className="mapContainer" />
      </StyledDiv>
    );
  }
}
