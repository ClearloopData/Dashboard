import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Timeline.css";
import { Container, Row, Col } from "react-bootstrap";
const TimelineComponent = ({ events }) => {
  return (
    <Container className="mx-auto m-4">
      <Row>
        <Col xs={0} sm={0} md={3} lg={3}></Col>
        <Col xs={12} sm={12} md={6} lg={6}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default TimelineComponent;
