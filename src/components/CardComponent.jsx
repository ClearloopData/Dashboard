import React from "react";
import "../styles/CardStyles.css";
import carbon_neutral from "../static/images/carbon-neutral.png";
import LEED from "../static/images/LEED.png";
import water_icon from "../static/images/waterIcon.svg";
const cards = [
  {
    imageUrl: carbon_neutral,
    mainStat: "Carbon Neutral",
    desc: "Vanderbilt has been carbon neutral since 2021.",
  },
  {
    imageUrl: LEED,
    mainStat: "24+",
    desc: "Vanderbilt has 24+ LEED certified projects and was the first university in TN to earn LEED certification.",
  },
  {
    imageUrl: water_icon,
    mainStat: "253M gallons",
    desc: "As of 2022, the University's water usage was down over 60% compared to 10 years ago.",
  },
];

const liveCards = [
  {
    imageUrl: carbon_neutral,
    mainStat: "Carbon Neutral",
    desc: "Vanderbilt has been carbon neutral since 2021.",
  },
  {
    imageUrl: carbon_neutral,
    mainStat: "Carbon Neutral",
    desc: "Vanderbilt has been carbon neutral since 2021.",
  },
  {
    imageUrl: carbon_neutral,
    mainStat: "Carbon Neutral",
    desc: "Vanderbilt has been carbon neutral since 2021.",
  },
];

function CardComponent() {
  return (
    <div className="container">
      <p className="sectionName">STATISTICS</p>
      <h2 className="mainText">
        Some of Vanderbilt's most significant sustainabililty metrics
      </h2>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.imageUrl} className="card">
            <img src={card.imageUrl} />
            <h2 className="mainText">{card.mainStat}</h2>
            <p className="sectionName">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardComponent;
