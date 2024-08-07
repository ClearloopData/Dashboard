import React, { useEffect } from 'react';
import './VandyClearloop.css';
import TimelineComponent from "./TimelineComponent";
import VandyImage from "../static/images/spring-kirkland-hall.jpg";
import solar_farm from "../static/images/solar-farm.jpg";
import silicon_ranch from "../static/images/silicon-ranch.jpg";
import NavComponent from './Navbar';
import DataImage from './DataImage';
import MapCollaboration from './Map/MapCollaboration';
import news1 from "../static/images/news1.png";
import news2 from "../static/images/solar-farm.jpg"
import JacksonImage from './JacksonImage';
import ParisImage from './ParisImage';
import WhitepineImage from './WhitepineImage';
import { SankeyDiagram } from "./SankeyChart/SankeyDiagram";
import DarkLogo from './DarkLogo';

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
    description: "Vanderbilt officially becomes carbon neutral with Silicon Ranch.",
    date: "2021",
    image: silicon_ranch,
    link: "https://news.vanderbilt.edu/2021/05/24/vanderbilt-announces-new-collaboration-to-accelerate-efforts-to-address-its-carbon-footprint-and-tackle-climate-change/",
  },
  {
    title: "Partnership with Clearloop",
    description:
      "Vanderbilt invested in Panola III Solar Farm with Clearloop to offset carbon footprint for fiscal year 2021–22.",
    date: "2023",
    image: news1,
    link: "https://clearloop.us/ms-panola#impact-ms",
  },
  {
    title: "Continue Offset Carbon Footprint",
    description:
      "Vanderbilt continues carbon neutral collaboration with Clearloop, supporting Brownsville solar farm.",
    date: "2024",
    image: news2,
    link: "https://clearloop.us/2024/04/22/vanderbilt-continues-carbon-neutral-collaboration-with-clearloop/",
  },
];

const VandyClearloop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavComponent />
      <div className="vandy-clearloop">
        <MapCollaboration />
        <h1>Vanderbilt & Clearloop</h1>
        <TimelineComponent events={events} title={"Collaboration Timeline"} />
        <div className='sankey-chart'>
          <SankeyDiagram />

        </div>

        <div className='data-project-container'>
        <h2 className='subtitle'>Clearloop Data and Projects</h2>
        <p>Clearloop develops solar farms that provide carbon offsets for Vanderbilt University and other partners. Carbon credits, or offsets, represent actions that either prevent greenhouse gas (GHG) emissions or remove them from the atmosphere. By investing in Clearloop's renewable energy projects, companies can purchase these credits to offset emissions they are unable to eliminate.</p>
        <h3>All Data and Projects</h3>
        <DataImage />
        <div className='three-projects'>
          <div className='project'>
            <h3>Jackson Project</h3>
            <JacksonImage />
          </div>
          <div className='project'>
            <h3>Paris Project</h3>
            <ParisImage />
          </div>
          <div className='project'>
            <h3>White Pine Project</h3>
            <WhitepineImage />
          </div>
        </div>
        </div>
        {/* <h2>Opportunity and Engagement with Clearloop</h2>
        <h2>Get to know more about Clearloop; Clearloop website</h2>
         */}
      </div>
      <div className='closing-section'>
        <div>
          <h2>Learn More about Carbon Offset</h2>
          <br></br>
          <a href="https://clearloop.us/" target="_blank" rel="noopener noreferrer">Visit Clearloop Website</a>
        
          </div>
          <DarkLogo />

        </div>
    </div>
  );
};

export default VandyClearloop;
