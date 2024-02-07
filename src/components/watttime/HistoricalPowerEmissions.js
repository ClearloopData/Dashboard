import { useEffect, useState } from "react";
import { app } from "../../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import PlaneComponent from "../PlaneComponent";

const db = getDatabase(app);
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

function HistoricalPowerEmissions() {
  const [lastOutput, setLastOutput] = useState(0);
  const [currentMonthString, setCurrentMonthString] = useState("");
  useEffect(() => {
    const getHistoricalValues = ref(db, `jackson2/historicalData`);
    onValue(getHistoricalValues, (snapshot) => {
      const data = snapshot.val();
      const currentYear = new Date().getFullYear();
      const currentMonthIndex = data[currentYear].length - 1;
      const currentMonthOutput = data[currentYear][currentMonthIndex]; // the current year's most recent month
      setLastOutput(currentMonthOutput.lbs);
      setCurrentMonthString(monthArray[currentMonthIndex]);
    });
  });
  return (
    <div>
      <h3>
        During the month of {currentMonthString}, Clearloop's Jackson, TN solar
        farm has offset {lastOutput.toFixed(2)} lbs of carbon!
      </h3>
      <h3>
        This is equal to the carbon emissions produced from an individual flying{" "}
        {(lastOutput / 0.133).toFixed(0)} miles! That's over{" "}
        {(lastOutput / 0.133 / 24855).toFixed(0)} trips around the globe.
        <PlaneComponent
          mileage={(lastOutput / 0.133).toFixed(0)}
        ></PlaneComponent>
      </h3>
    </div>
  );
}

export default HistoricalPowerEmissions;
