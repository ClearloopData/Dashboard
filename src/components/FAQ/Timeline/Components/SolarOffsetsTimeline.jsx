import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { app } from "../../../../firebase/firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase, ref, onValue } from "firebase/database";
import "./Timeline.css";
import _ from "lodash";

// Panel imports
import panel_0 from "../images/panels/panel-0.png";
import panel_1 from "../images/panels/panel-1.png";
import panel_2 from "../images/panels/panel-2.png";
import panel_3 from "../images/panels/panel-3.png";
import panel_4 from "../images/panels/panel-4.png";
import panel_5 from "../images/panels/panel-5.png";

// Plant imports
import plant_0 from "../images/powerplants/plant-0.png";
import plant_1 from "../images/powerplants/plant-1.png";
import plant_2 from "../images/powerplants/plant-2.png";
import plant_3 from "../images/powerplants/plant-3.png";
import plant_4 from "../images/powerplants/plant-4.png";
import plant_5 from "../images/powerplants/plant-5.png";

import reclaimed from "../images/reclaimed.png";

// The slider
import SliderTest from "./SliderTest";
import StateStats from "./StateStats";

const SolarOffsetsTimeline = ({ solar_farm_name }) => {
  const db = getDatabase(app);
  const [TVA, setTVA] = useState(0);
  const [ERCOT, setERCOT] = useState(0);
  const [CAISO_NORTH, setCAISO_NORTH] = useState(0);
  const [health_damage, setHealth_damage] = useState(0);
  const [production, setProduction] = useState(0);
  const [index, setIndex] = useState(5);

  const SOLAR_THRESHOLDS = [0, 0.1, 0.25, 0.4, 0.65, 0.85]; // Average around 0.5 MWh.
  const MOER_THRESHOLDS = [0, 875, 1100, 1150, 1205, 1250]; // Average around 1150-1175 lbs/MWh
  const PANEL_IMAGES = [panel_0, panel_1, panel_2, panel_3, panel_4, panel_5];
  const PLANT_IMAGES = [plant_0, plant_1, plant_2, plant_3, plant_4, plant_5];

  const lowerBoundPanelIndex =
    _.sortedLastIndex(SOLAR_THRESHOLDS, production) - 1;

  const lowerBoundPlantIndex = _.sortedLastIndex(MOER_THRESHOLDS, TVA) - 1;

  const events = [
    {
      title: "Step 1: Solar Farm Energy Production",
      description: `Depending on the time of day, weather, and many other factors, the solar farm production is gathered and reported. The Jackson solar farm production ${
        index === 5
          ? "is currently"
          : `${5 - index} hour${5 - index !== 1 ? "s" : ""} ago was`
      }`,
      number: `${production.toFixed(2)}`,
      units: `  megawatts per hour.`,
      image: PANEL_IMAGES[lowerBoundPanelIndex],
    },
    {
      title: "Step 2: Marginal Emissions Calculation",
      description: `Using data from WattTime, Clearloop calculates the marginal emissions. Marginal emissions are the rate at which emissions would change with a small change to electricity load (like turning on a light switch). 
      The marginal emissions rate ${
        index === 5
          ? "is currently"
          : `${5 - index} hour${5 - index !== 1 ? "s" : ""} ago was`
      }`,
      number: `${parseInt(TVA.toFixed(0)).toLocaleString("en-us")}`,
      units: `lbs of carbon offset/MWh. `,
      shortUnits: `lbs of carbon`,
      image: PLANT_IMAGES[lowerBoundPlantIndex],
      texasNumber: `${parseInt(ERCOT.toFixed(0)).toLocaleString("en-us")}`,
      californiaNumber: `${parseInt(CAISO_NORTH.toFixed(0)).toLocaleString(
        "en-us"
      )}`,
    },
    {
      title: "Step 3: Carbon Offset",
      description: `The CO2 emissions offset by the solar farm are calculated by multiplying together the marginal emissions rate and the energy production. For a more accurate estimate,
       the marginal emissions data is acquired every 5 minutes.
        The carbon reclaimed from the Jackson solar farm ${
          index === 5
            ? "this hour is "
            : `${5 - index} hour${5 - index !== 1 ? "s" : ""} ago was`
        }  approximately `,
      number: `${(TVA * production).toFixed(0)}`,
      texasNumber: `${(ERCOT * production).toFixed(0)}`,
      californiaNumber: `${(CAISO_NORTH * production).toFixed(0)}`,
      units: ` pounds per hour.`,
      shortUnits: `lbs/hour`,
      image: reclaimed,
    },
    {
      title: "Step 4: Health Benefits Provided",
      description: `Seven million people a year die from air pollution. Fossil-fueled power plants emit pollutants that damage health like sulfur dioxide. These pollutants cause people living close to power plants to experience higher rates of health problems, such as asthma, heart disease, stroke, and premature death caused by breathing these pollutants. The Jackson solar farm prevented approximately `,
      number: `$${(production * health_damage).toFixed(2)}`,
      units: `of damage to human health ${
        index === 5
          ? "during the last hour"
          : `${5 - index} hour${5 - index !== 1 ? "s" : ""} ago`
      }.`,
    },
  ];

  // Get the TVA MOER value.
  useEffect(() => {
    const checkCurrentValue = ref(
      db,
      `/realtime/lastSixHours/jackson/moers/TVA`
    );
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      if (data && data[index] !== undefined) {
        setTVA(data[index]);
      }
    });
  }, [index, db]);

  // Get ERCOT moer
  useEffect(() => {
    const checkCurrentValue = ref(
      db,
      `/realtime/lastSixHours/jackson/moers/ERCOT_NORTHCENTRAL`
    );
    // When the current value changes, recalculate the value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      if (data && data[index] !== undefined) {
        setERCOT(data[index]);
      }
    });
  }, [index, db]);

  // Get CAISO_NORTH moer
  useEffect(() => {
    const checkCurrentValue = ref(
      db,
      `/realtime/lastSixHours/jackson/moers/CAISO_NORTH`
    );
    // When the current value changes, recalculate the value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      if (data && data[index] !== undefined) {
        setCAISO_NORTH(data[index]);
      }
    });
  }, [index, db]);

  // Get the production value for the current selected hour.
  useEffect(() => {
    const checkCurrentValue = ref(db, `/realtime/lastSixHours/jackson/mwh`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      if (data && data[index] !== undefined) {
        setProduction(data[index]);
      }
    });
  }, [index, db]);

  useEffect(() => {
    const checkCurrentValue = ref(db, `/health_data/CAISO_NORTH`);
    // Get the health_damage data.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let sum = 0;
        Object.values(data).forEach((entry) => {
          sum += entry.value;
        });
        setHealth_damage(sum / 288);
      }
    });
  }, [db]);

  useEffect(() => {
    ["TVA", "SOCO", "MISO_LOWER_MS_RIVER", "CAISO_NORTH"].forEach((elem) => {
      const checkCurrentValue = ref(db, `/health_damage/${elem}`);
      // Get the health_damage data.
      onValue(checkCurrentValue, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let sum = 0;
          Object.values(data).forEach((entry) => {
            sum += entry.value;
          });
          console.log(`${sum} ${elem}`);
        }
      });
    });
  }, [db]);

  const renderSliderMarks = () => {
    const currentHour = new Date().getHours();
    const marks = [];
    let currValue = 90;
        /*
     The maximum of this code seems to be 100. 90 - 5 * 16 = 10, 
     leaving equal spacing on both sides of the slider. Can probably clean this up at some point. TODO
    */
     marks.push({ value: currValue, label: "Now" });
     for (let i = currentHour - 1; i >= Math.max(0, currentHour - 5); i--) {
       currValue -= 16; // Ensures even spacing.
       marks.push({
         value: currValue, // What is compared to sort the entries.
         label: (i > 12 ? i % 12 : i) + (i >= 12 ? "PM" : "AM"), // The text shown.
       });
     }
     return marks;
   };
 
   const handleSliderChange = (e) => {
     setIndex(Math.round(e.target.value - 10) / 16);
   };
 
   return (
     <Container className="solar-timeline-container mx-auto m-4">
       <Row>
         <Col xs={0} sm={0} md={2} lg={2}></Col>
         <Col xs={12} sm={12} md={8} lg={8}>
           <h2 className="mainText">
             So how does Clearloop calculate carbon offsets?
           </h2>
           <p>
             Use the slider to see what's been happening in the past few hours.
           </p>
           <SliderTest
             marks={renderSliderMarks()}
             onSliderChange={handleSliderChange}
           />
           <div className="solar-timeline text-center">
             {events.map((event, index) => (
               <div key={index} className="solar-timeline-item">
                 <div className="solar-timeline-content">
                   <h3>
                     <strong>{event.title}</strong>
                   </h3>
                   <p>
                     {event.description} <span>{event.number}</span>{" "}
                     {event.units}
                   </p>
                   {event.image && (
                     <div className="solar-timeline-image">
                       <img src={event.image} alt="Solar Panel" />
                     </div>
                   )}
                   {event.texasNumber && event.californiaNumber && (
                     <div>
                       <p>
                         <span>In other states, this would be...</span>
                       </p>
                       <StateStats
                         texasNum={event.texasNumber}
                         californiaNum={event.californiaNumber}
                         units={event.shortUnits}
                       ></StateStats>
                     </div>
                   )}
                 </div>
               </div>
             ))}
           </div>
         </Col>
       </Row>
     </Container>
   );
 };
 
 export default SolarOffsetsTimeline;
 