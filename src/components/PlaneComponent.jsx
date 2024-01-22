/**
 * PlaneComponent.jsx
 * A prototype of a possible dynamic component to make carbon footprint data more engaging.
 */

import React from "react";
import "../styles/PlaneComponent.css";
import plane from "../static/images/plane.png";

let computeAirMiles = (carbon_offset) => {
  return carbon_offset / 0.133;
};

let computeCircumnavigations = (miles_offset) => {
  return miles_offset / 24901;
};

const PlaneComponent = ({ carbon_offset }) => {
  return (
    <div className="circle">
      <img src={plane} className="plane" />
      <div className="center-text">
        {computeAirMiles(carbon_offset).toFixed(0)} miles of air travel offset
        this month.
      </div>
    </div>
  );
};

export default PlaneComponent;
