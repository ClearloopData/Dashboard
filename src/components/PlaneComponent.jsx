/**
 * PlaneComponent.jsx
 * A prototype of a possible dynamic component to make carbon footprint data more engaging.
 */

import React from "react";
import "../styles/PlaneComponent.css";
import plane from "../static/images/plane.png";

const PlaneComponent = () => {
  return (
    <div className="circle">
      <img src={plane} className="plane" />
    </div>
  );
};

export default PlaneComponent;
