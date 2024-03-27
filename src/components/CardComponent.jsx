import { useEffect, useState } from "react";
import { Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import "../styles/CardStyles.css";

// The images to import for the cards.
import solar_panel from "../static/images/solarpanel.png";
import co2 from "../static/images/co2.png";
import month from "../static/images/month.png";
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
  const [currentPower, setCurrentPower] = useState(0);
  const [currentEmissions, setCurrentEmissions] = useState(0);
  const [lastOutput, setLastOutput] = useState(0);
  const [currentMonthString, setCurrentMonthString] = useState("");

  const liveCards = [
    {
      imageUrl: co2,
      mainStat: `${currentEmissions.toFixed(0)} lbs`,
      desc: `During the last hour, the Jackson, TN solar farm has offset ${currentEmissions.toFixed(
        0
      )} lbs of carbon emissions!`,
    },
    {
      imageUrl: solar_panel,
      mainStat: `${currentPower.toFixed(2)} MWh`,
      desc: `Clearloop's Jackson, TN solar farm is currently producing 
      ${currentPower.toFixed(2)} MWh of energy.`,
    },
    {
      imageUrl: month,
      mainStat: `${parseInt(lastOutput.toFixed(0)).toLocaleString(
        "en-us"
      )} lbs`,
      desc: `During the month of ${
        monthArray[new Date().getMonth()]
      }, the Jackson, TN solar farm has offset 
      ${parseInt(lastOutput.toFixed(0)).toLocaleString(
        "en-us"
      )} lbs of carbon.`,
    },
  ];

  useEffect(() => {
    const checkCurrentValue = ref(db, `realtime/lastHour/jackson`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      setCurrentPower(data.mwh);
      setCurrentEmissions(data.co2);
    });
  });

  useEffect(() => {
    const getHistoricalValues = ref(db, `historical/jackson`);
    onValue(getHistoricalValues, (snapshot) => {
      const data = snapshot.val();
      const currentYear = new Date().getFullYear();
      let currentMonthIndex = new Date().getMonth() + 1;
      const formattedMonthIndex = String(currentMonthIndex).padStart(2, "0");
      const currentMonthOutput = data[currentYear][formattedMonthIndex]; // the current year's most recent month
      setLastOutput(currentMonthOutput.co2);
      setCurrentMonthString(monthArray[formattedMonthIndex]);
    });
  });

  return (
    <div className="container">
      <p className="sectionName">STATISTICS</p>

      <h2 className="mainText">Live stats</h2>
      <CardGroup className="card-container">
        {liveCards.map((card) => (
          <Card key={card.imageUrl} className="card">
            <Card.Img src={card.imageUrl} className="img-fluid" />
            <Card.Body>
              <Card.Title className="mainText">{card.mainStat}</Card.Title>
              <Card.Text className="sectionName">{card.desc}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default CardComponent;
