import { useState, useEffect } from "react";
import PlaneComponent from "./PlaneComponent";
import { app } from "../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { Container, Row, Col } from "react-bootstrap";

const db = getDatabase(app);
// Get the Firebase database.

function StatsComponent() {
  const [lastOffset, setLastOffset] = useState(0);
  const [lastPower, setLastPower] = useState(0);

  let computeAirMiles = (carbon_offset) => {
    return carbon_offset / 0.133;
  };

  let computeCircumnavigations = (miles_offset) => {
    return miles_offset / 24901;
  };

  useEffect(() => {
    const getHistoricalValues = ref(db, `historical/jackson`);
    onValue(getHistoricalValues, (snapshot) => {
      const data = snapshot.val();
      const currentYear = new Date().getFullYear();
      let currentMonthIndex = new Date().getMonth() + 1;
      const formattedMonthIndex = String(currentMonthIndex).padStart(2, "0");
      const currentMonthOutput = data[currentYear][formattedMonthIndex]; // the current year's most recent month
      setLastOffset(currentMonthOutput.co2);
      setLastPower(currentMonthOutput.mwh);
    });
  });

  return (
    <Container>
      <h3 className="mainText">To put that into perspective...</h3>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <h5 className="smallText">
            During the last month, the Jackson solar farm could have offset the
            emissions from flying{" "}
            <strong>
              {parseInt(computeAirMiles(lastOffset).toFixed(0)).toLocaleString(
                "en-us"
              )}
            </strong>{" "}
            miles!
          </h5>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="offset-md-3">
          <PlaneComponent></PlaneComponent>
        </Col>
      </Row>
    </Container>
  );
}

export default StatsComponent;
