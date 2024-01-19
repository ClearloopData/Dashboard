import "./App.css";
import Caller from "./components/Caller";
import CurrentPowerEmissions from "./components/CurrentPowerEmissions";
import HistoricalPowerEmissions from "./components/HistoricalPowerEmissions";

function App() {
  return (
    <div className="App">
      <Caller />
      <CurrentPowerEmissions />
      <HistoricalPowerEmissions></HistoricalPowerEmissions>
    </div>
  );
}

export default App;
