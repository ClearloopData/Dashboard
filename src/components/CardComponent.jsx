import React, { useEffect, useState } from "react";
import { Card, CardGroup, Container, Row, Col } from "react-bootstrap";
import "../styles/CardStyles.css";

// The images to import for the cards.
import solar_panel from "../static/images/solarpanel.png";
import co2 from "../static/images/co2.png";
import month from "../static/images/month.png";
import jackson from "../static/images/jackson.png";
import paris from "../static/images/paris.png";
import whitepine from "../static/images/whitepine.png";
// The code for the database connection.
import { app } from "../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase(app);

// This is used to determine the current month based on the formatted data from the Firebase db.
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CardComponent() {
  const [jacksonData, setJacksonData] = useState({ power: 0, emissions: 0, monthOutput: 0 });
  const [parisData, setParisData] = useState({ power: 0, emissions: 0, monthOutput: 0 });
  const [whitepineData, setWhitepineData] = useState({ power: 0, emissions: 0, monthOutput: 0 });

  useEffect(() => {
    const fetchData = (plant, setData) => {
      const currentPowerRef = ref(db, `realtime/lastHour/${plant}`);
      const historicalValuesRef = ref(db, `historical/${plant}`);

      onValue(currentPowerRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setData((prevData) => ({
            ...prevData,
            power: data.mwh || 0,
            emissions: data.co2 || 0,
          }));
        }
      });

      onValue(historicalValuesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const currentYear = new Date().getFullYear();
          let currentMonthIndex = new Date().getMonth() + 1;
          const formattedMonthIndex = String(currentMonthIndex).padStart(2, "0");
          const currentMonthOutput = data[currentYear]?.[formattedMonthIndex];
          if (currentMonthOutput) {
            setData((prevData) => ({
              ...prevData,
              monthOutput: currentMonthOutput.co2 || 0,
            }));
          }
        }
      });
    };

    fetchData("jackson", setJacksonData);
    fetchData("paris", setParisData);
    fetchData("whitepine", setWhitepineData);
  }, []);

  const plantsData = [
    {
      plantName: "Jackson, TN",
      plantImage: jackson,
      data: jacksonData,
      url: "https://clearloop.us/tn-jackson/",
    },
    {
      plantName: "Paris",
      plantImage: paris,
      data: parisData,
      url: "https://clearloop.us/tn-paris/",
    },
    {
      plantName: "Whitepine",
      plantImage: whitepine,
      data: whitepineData,
      url: "https://clearloop.us/tn-white-pine/",
    },
  ];

  return (
    <Container className="container">
      <br />
      <br />
      <h2 className="mainText">Live stats</h2>
      {plantsData.map((plant, rowIndex) => (
        <Row className="align-items-center" key={rowIndex}>
          <Col xs={2}>
            <div className="plant-image-container">
              <img
                src={plant.plantImage}
                alt="Plant"
                className="plant-image"
                onClick={() => window.open(plant.url, "_blank")}
                style={{ height: "100%", width: "100%", cursor: "pointer" }}
              />
            </div>
          </Col>
          <Col xs={10}>
            <CardGroup className="card-container">
              <Card className="card">
                <Card.Img src={solar_panel} className="img-fluid" />
                <Card.Body>
                  <Card.Title className="mainText">{plant.data.power.toFixed(2)} MWh</Card.Title>
                  <Card.Text className="sectionName">
                    {`Clearloop's ${plant.plantName} solar farm is currently producing ${plant.data.power.toFixed(2)} MWh of energy.`}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Img src={co2} className="img-fluid" />
                <Card.Body>
                  <Card.Title className="mainText">{plant.data.emissions.toFixed(0)} lbs</Card.Title>
                  <Card.Text className="sectionName">
                    {`During the last hour, the ${plant.plantName} solar farm has offset ${plant.data.emissions.toFixed(0)} lbs of carbon emissions!`}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Img src={month} className="img-fluid" />
                <Card.Body>
                  <Card.Title className="mainText">{parseInt(plant.data.monthOutput.toFixed(0)).toLocaleString("en-us")} lbs</Card.Title>
                  <Card.Text className="sectionName">
                    {`During the month of ${monthArray[new Date().getMonth()]}, the ${plant.plantName} solar farm has offset ${parseInt(plant.data.monthOutput.toFixed(0)).toLocaleString("en-us")} lbs of carbon.`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default CardComponent;
