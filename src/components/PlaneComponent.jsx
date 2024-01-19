import React from "react";
import "./PlaneComponent.css";
import plane from "../images/plane.png";
const PlaneComponent = ({ mileage }) => {
  return (
    <div className="circle">
      <img src={plane} alt="Flying Plane" className="plane" />
      <div className="center-text">{mileage} miles of air travel offset!</div>
    </div>
  );
};

export default PlaneComponent;
