import React from "react";
import "../styles/Timeline.css";

const TimelineComponent = ({ events, title }) => {
  

  const handleNavigation = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="timeline-container">
      {/* <h2 className="text-center">{title}</h2> */}
      <div className="timeline">
        {events.map((event, index) => (
          <div 
            key={`${event.title}-${index}`} 
            className="timeline-item"
            style={{ cursor: 'pointer' }} 
            onClick={() => handleNavigation(event.link)}
            data-date={event.date} // Add the data-date attribute here
          >
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {event.image && (
                <div className="timeline-image">
                  <img src={event.image} alt={`Event ${index + 1}`} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineComponent;
