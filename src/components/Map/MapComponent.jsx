import { useState, useEffect } from "react";
import { app } from "../../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { Chart } from "react-google-charts";
import { Container, Row, Col } from "react-bootstrap";

const options = {
  region: "US-TN",
  resolution: "provinces",
  displayMode: "markers",
  datalessRegionColor: "#EAEAEF",
  colorAxis: { colors: ["#FDF5B4", "#F7E15D"] },
  sizeAxis: { minValue: 0, maxSize: 20 },
  defaultColor: "#F7E15D",
  legend: "none",
};

const db = getDatabase(app);

function MapComponent() {
  const [jackson2, setJackson2] = useState(0);
  const [paris, setParis] = useState(0);
  const [jacksonPower, setJacksonPower] = useState(0);
  const [parisPower, setParisPower] = useState(0);

  const data = [
    ["City", "Current Power Production (MWh)", "CO2 saved (lbs)"],
    ["Jackson", jacksonPower, jackson2],
    ["Paris", parisPower, paris],
    ["Batesville, MS", 0, 0],
  ];

  const links = [
    "https://clearloop.us/tn-jackson/",
    "https://clearloop.us/tn-paris/",
    "https://clearloop.us/ms-panola/",
  ];

  useEffect(() => {
    const checkCurrentValue = ref(db, `realtime/lastHour/jackson`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      setJacksonPower(data.mwh);
      setJackson2(data.co2);
    });
  });

  useEffect(() => {
    const checkCurrentValue = ref(db, `realtime/lastHour/paris`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      setParisPower(data.mwh);
      setParis(data.co2);
    });
  });
  return (
    <Container>
      <h2 className="mainText">Where are these solar farms located?</h2>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Chart
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            mapsApiKey={"AIzaSyBualKZmr8vXmaUolaLyOS3DsiyOglv0is"}
            chartEvents={[
              {
                eventName: "ready",
                callback: ({ chartWrapper, google }) => {
                  const chart = chartWrapper.getChart();
                  google.visualization.events.addListener(
                    chart,
                    "select",
                    () => {
                      if (chart.getSelection()[0] !== undefined) {
                        window.open(links[chart.getSelection()[0].row]);
                      }
                    }
                  );
                },
              },
            ]}
          />
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="offset-md-1">
          <h3 className="smallerText">
            The current Clearloop solar farms are located in Jackson, TN, and
            Paris, TN. In addition, Vanderbilt's solar farm is being built in
            Panola County, Mississippi, eventually powering over 1,000 homes in
            the area.
          </h3>
          <h3 className="smallerText">
            Click on any of the dots on the map to read more!
          </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default MapComponent;
