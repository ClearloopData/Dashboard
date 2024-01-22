import "./App.css";
import Caller from "./components/Caller";
import CardComponent from "./components/CardComponent";
import CurrentPowerEmissions from "./components/CurrentPowerEmissions";
import HistoricalPowerEmissions from "./components/HistoricalPowerEmissions";
import MissionStatement from "./components/MissionStatement";
import PlaneComponent from "./components/PlaneComponent";

// The main control for our application.
function App() {
  return (
    <div className="App">
      <div className="bgImage">
        <div className="mainPanel">
          <MissionStatement />
        </div>
      </div>
      <CardComponent></CardComponent>
      <PlaneComponent mileage={5000}></PlaneComponent>
    </div>
  );
}

export default App;
