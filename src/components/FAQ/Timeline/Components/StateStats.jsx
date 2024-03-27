import React from "react";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";

import TexasSVG from "../images/states/Texas.png";
import CaliforniaSVG from "../images/states/California.png";

const StateStats = ({ texasNum, californiaNum, units }) => {
  return (
    <>
      <Row>
        <Col>
          <img src={TexasSVG} alt="Texas" />
        </Col>
        <Col>
          <img src={CaliforniaSVG} alt="California" />
        </Col>
      </Row>
      <Box mt={2}>
        <Row>
          <Col>
            <h5 className="main-item">
              {texasNum} {units}
            </h5>
          </Col>
          <Col>
            <h5 className="main-item">
              {californiaNum} {units}
            </h5>
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default StateStats;
