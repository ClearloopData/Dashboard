import "./App.css";
import Caller from "./components/Caller";
import CurrentPowerEmissions from "./components/CurrentPowerEmissions";

function App() {
  return (
    <div className="App">
      <Caller />
      <CurrentPowerEmissions />
    </div>
  );
}

export default App;
