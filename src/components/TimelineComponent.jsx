import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Timeline.css";

const TimelineComponent = ({ events, title }) => {
  return (
    <div className="timeline">
      <h3>{title}</h3>
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
