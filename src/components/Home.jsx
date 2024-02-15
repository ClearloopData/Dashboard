import "../App.css";
import CardComponent from "./CardComponent";
import MissionStatement from "./MissionStatement";
import StatsComponent from "./StatsComponent";
import TimelineComponent from "./TimelineComponent";
import VandyImage from "../static/images/spring-kirkland-hall.jpg";
import solar_farm from "../static/images/solar-farm.jpg";
import silicon_ranch from "../static/images/silicon-ranch.jpg";
import FAQ from "./FAQ";
import { SankeyDiagram } from "./SankeyChart/SankeyDiagram";
import MapComponent from "./Map/MapComponent";
import NavComponent from "./Navbar";

const events = [
  {
    title: "Start of something great!",
    description:
      "Vanderbilt started its mission to be carbon neutral and power its campus through sustainable energy.",
    date: "2019",
    image: VandyImage,
    link: "https://news.vanderbilt.edu/2019/04/22/vanderbilt-outlines-major-plans-to-reduce-environmental-footprint/",
  },
  {
    title: "Carbon Neutral!",
    description: "Vanderbilt officially becomes carbon neutral.",
    date: "2021",
    image: silicon_ranch,
    link: "https://news.vanderbilt.edu/2021/05/24/vanderbilt-announces-new-collaboration-to-accelerate-efforts-to-address-its-carbon-footprint-and-tackle-climate-change/",
  },
  {
    title: "Partnership with Clearloop",
    description:
      "Vanderbilt announces the start of its partnership with Clearloop.",
    date: "2023",
    image: solar_farm,
    link: "https://clearloop.us/2023/04/19/vanderbilt-to-further-offset-carbon-footprint-by-investing-in-solar-energy-projects-through-clearloop/",
  },
];

// The main control for our application.
function Home() {
  return (
    <div className="App">
      <NavComponent></NavComponent>
      <div className="bgImage">
        <div className="mainPanel">
          <MissionStatement />
        </div>
      </div>

      <CardComponent></CardComponent>
      <StatsComponent></StatsComponent>
      <TimelineComponent
        events={events}
        title={"A timeline of recent sustainability events!"}
      ></TimelineComponent>
      <SankeyDiagram></SankeyDiagram>
      <FAQ></FAQ>
      <MapComponent></MapComponent>
    </div>
  );
}

export default Home;
