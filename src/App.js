import "./App.css";
import CardComponent from "./components/CardComponent";
import MissionStatement from "./components/MissionStatement";
import StatsComponent from "./components/StatsComponent";
import TimelineComponent from "./components/TimelineComponent";

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
      <StatsComponent></StatsComponent>
      <TimelineComponent></TimelineComponent>
    </div>
  );
}

export default App;
