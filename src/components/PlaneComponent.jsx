import React from "react";
import "../styles/PlaneComponent.css";
import plane from "../static/images/plane.png";
const PlaneComponent = ({ mileage }) => {
  return (
    <div className="circle">
      <img src={plane} alt="Flying Plane" className="plane" />
      <div className="center-text">{mileage} miles of air travel offset!</div>
    </div>
  );
};

export default PlaneComponent;
