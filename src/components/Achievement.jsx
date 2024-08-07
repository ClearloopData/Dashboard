import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate for navigation
import './Achievements.css';
import ClickableImage from './ClickableImage';

const Achievements = () => {
  const navigate = useNavigate(); // use useNavigate for navigation

  const handleCircleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="achievements">
      <h1>Achievements</h1>
      <div className="achievement-circles">
        <div className="circle" onClick={() => handleCircleClick('/vandy-clearloop')}>
          <div className="circle-content">
            <p className="achievement-number">2021-2023</p>
            <p className="achievement-title">Carbon Neutrality</p>
            <p className="achievement-description">Achieved by offset carbon footprint with Clearloop</p>
            <ClickableImage />
          </div>
        </div>
        <div className="circle">
          <div className="circle-content">
            <p className="achievement-number">11%</p>            
            <p className="achievement-title">Emissions Reductions</p>
            <p className="achievement-description">from last year</p>
          </div>
        </div>
        <div className="circle">
          <div className="circle-content">
            <p className="achievement-number">24</p>
            <p className="achievement-title">LEED Buildings</p>
            <p className="achievement-description">LEED Certified</p>
          </div>
        </div>
        <div className="circle">
          <div className="circle-content">
            <p className="achievement-number">5,838MT=</p>
            <p className="achievement-number">12,867,86LBS CO2E</p>
            <p className="achievement-title">Reduced by Solar Farm</p>
            <p className="achievement-description">Vanderbilt solar farm</p>
          </div>
        </div>
        <div className="circle">
          <div className="circle-content">
            <p className="achievement-number">32%</p>            
            <p className="achievement-title">Food Waste Diversion</p>
            <p className="achievement-description">in fiscal year 2022-2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
