import { useState, useEffect } from "react";
import { app } from "../../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { Chart } from "react-google-charts";

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
    ["Batesville, MS", 0.2, 100],
  ];

  const links = [
    "https://clearloop.us/tn-jackson/",
    "https://clearloop.us/tn-paris/",
    "https://clearloop.us/ms-panola/",
  ];

  useEffect(() => {
    const checkCurrentValue = ref(db, `jackson2/realtimeData/lastHour`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      const tvaMOER = data.lastValue.moer.TVA;
      let currentPower = data.summed.kwh / 1000;
      setJacksonPower(currentPower);
      setJackson2(tvaMOER * currentPower);
    });
  });

  useEffect(() => {
    const checkCurrentValue = ref(db, `paris/realtimeData/lastHour`);
    // When the current value changes, recalculate the TVA MOER value.
    onValue(checkCurrentValue, (snapshot) => {
      const data = snapshot.val();
      const tvaMOER = data.lastValue.moer.TVA;
      let currentPower = data.summed.kwh / 1000;
      setParisPower(currentPower);
      setParis(tvaMOER * currentPower);
    });
  });
  return (
    <div>
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
              google.visualization.events.addListener(chart, "select", () => {
                if (chart.getSelection()[0] !== undefined) {
                  window.open(links[chart.getSelection()[0].row], "_blank");
                }
              });
            },
          },
        ]}
      />
    </div>
  );
}

export default MapComponent;
