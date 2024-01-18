import { useEffect, useState } from "react";
import { app } from "../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase(app);

function CurrentPowerEmissions() {
  const [currentPower, setCurrentPower] = useState(0);
  const [currentEmissions, setCurrentEmissions] = useState(0);

  useEffect(() => {
    const checkCurrentValue = ref(db, `jackson2/realtimeData/lastHour`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      const tvaMOER = data.lastValue.moer.TVA;
      console.log(data);
      console.log(tvaMOER);

      setCurrentPower(data.summed.kwh / 1000);
      setCurrentEmissions(tvaMOER * currentPower);
    });
  });
  return (
    <div>
      <h3>
        {currentPower.toFixed(2)} MWh current power. This avoids{" "}
        {currentEmissions.toFixed(0)} lbs of carbon.
      </h3>
    </div>
  );
}

export default CurrentPowerEmissions;
