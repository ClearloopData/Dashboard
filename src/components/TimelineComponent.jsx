import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Timeline.css";
import VandyImage from "../static/images/Vandy.jpg";
import jackson_farm from "../static/images/jackson_solar_farm.jpg";

const TimelineComponent = () => {
  const events = [
    {
      title: "Start of something great!",
      description:
        "Vanderbilt started its mission to be carbon neutral and power its campus through sustainable energy.",
      date: "2019",
      image: VandyImage,
    },
    {
      title: "Partnership with Clearloop",
      description:
        "Vanderbilt announces the start of its partnership with Clearloop.",
      date: "2021",
      image: jackson_farm,
    },
    // Add more events as needed
  ];
  return (
    <div className="timeline">
      <h3>A timeline of recent sustainability trends!</h3>
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-content">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <span>{event.date}</span>
            {event.image && (
              <div className="timeline-image">
                <img src={event.image} alt={`Event ${index + 1}`} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineComponent;
