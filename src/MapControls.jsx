import React, { Component } from "react";

export default class MapControls extends Component {
  render() {
    const { toggleMapType } = this.props;

    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={toggleMapType}
        >
          Map
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={toggleMapType}
        >
          Satelite
        </button>
      </div>
    );
  }
}
