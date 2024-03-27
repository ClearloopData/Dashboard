/**
 * Data.jsx
 * The root of the /data endpoint. Contains the organizational structure for the rest of the components.
 */

import React from "react";
import Header from "./Header";
import NavComponent from "../Navbar";
import { Container } from "react-bootstrap";
import CardComponent from "../CardComponent";
import StatsComponent from "../StatsComponent";
import MapComponent from "../Map/MapComponent";
import SolarOffsetsTimeline from "../FAQ/Timeline/Components/SolarOffsetsTimeline";

import "../../styles/DataStyles.css";
function Data() {
  return (
    <div>
      <NavComponent></NavComponent>
      <div className="dataImage">
        <Container>
          <Header />
        </Container>
      </div>
      <CardComponent />
      <StatsComponent />
      <MapComponent></MapComponent>
      <SolarOffsetsTimeline></SolarOffsetsTimeline>
    </div>
  );
}

export default Data;
