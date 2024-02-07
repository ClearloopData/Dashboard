import { Accordion, Container } from "react-bootstrap";

function FAQ() {
  return (
    <Container className="my-4">
      <h2 className="mainText">Some FAQs:</h2>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How can I get involved?</Accordion.Header>
          <Accordion.Body>...</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What can I recycle?</Accordion.Header>
          <Accordion.Body>
            View the{" "}
            <a
              href="https://www.vanderbilt.edu/sustainability/reduce-waste/campus-recycling-program/"
              target="_blank"
              rel="noreferrer"
            >
              Vanderbilt recycling page
            </a>{" "}
            to learn more.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQ;
