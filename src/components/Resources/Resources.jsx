/**
 * Resources.jsx
 * The root of the /Resources endpoint. Contains the organizational structure for the rest of the components.
 */

import React from "react";
import Header from "./Header";
import NavComponent from "../Navbar";
import { Container } from "react-bootstrap";
import "../../styles/ResourcesStyles.css";
import FAQ from "../FAQ";
function Resources() {
  return (
    <div>
      <div className="resourcesImage">
        <Container>
          <Header />
        </Container>
      </div>
      <FAQ></FAQ>
    </div>
  );
}

export default Resources;
