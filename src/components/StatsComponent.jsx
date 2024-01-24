import { useState, useEffect } from "react";
import PlaneComponent from "./PlaneComponent";
import { app } from "../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import electric_car from "../static/images/electric-car.png";

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
    const getHistoricalValues = ref(db, `jackson2/historicalData`);
    onValue(getHistoricalValues, (snapshot) => {
      const data = snapshot.val();
      const currentYear = new Date().getFullYear();
      const currentMonthIndex = data[currentYear].length - 1;
      const currentMonthOutput = data[currentYear][currentMonthIndex]; // the current year's most recent month
      setLastOffset(currentMonthOutput.lbs);
      setLastPower(currentMonthOutput.mwh);
    });
  });

  return (
    <div className="container">
      <h3 className="mainText">To put that into perspective...</h3>
      <div className="flex-container">
        <h5 className="smallText">
          During the last month, the Jackson solar farm could have offset the
          emissions from flying{" "}
          <strong>{computeAirMiles(lastOffset).toFixed(0)}</strong> miles!
        </h5>
        <PlaneComponent></PlaneComponent>
      </div>
    </div>
  );
}

export default StatsComponent;
