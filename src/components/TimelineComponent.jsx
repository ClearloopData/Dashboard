import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Timeline.css";
import { Container } from "react-bootstrap";
const TimelineComponent = ({ events }) => {
  return (
    <Container className="mx-auto m-4">
      <h2 className="mainText">A timeline of recent sustainability events!</h2>
      <div className="timeline text-center">
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
    </Container>
  );
};

export default TimelineComponent;
