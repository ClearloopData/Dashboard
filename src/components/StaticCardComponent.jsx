import carbon_neutral from "../static/images/carbon-neutral.png";
import LEED from "../static/images/LEED.png";
import water_icon from "../static/images/waterIcon.svg";
import { Card, CardGroup, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CardStyles.css";
const cards = [
  {
    imageUrl: carbon_neutral,
    mainStat: "Carbon Neutral",
    desc: "Vanderbilt has been carbon neutral since 2021.",
    link: "https://www.vanderbit.edu/sustainabililty",
  },
  {
    imageUrl: LEED,
    mainStat: "25",
    desc: "Vanderbilt has 25 LEED certified buildings on campus.",
    link: "https://www.vanderbilt.edu/sustainability/annual-sustainability-report-fy22-23/",
  },
  {
    imageUrl: water_icon,
    mainStat: "253M gallons",
    desc: "As of 2022, the University's water usage was down 60% compared to 10 years ago.",
    link: "https://www.vanderbilt.edu/sustainability/annual-sustainability-report-2021-2/",
  },
];

function StaticCardComponent() {
  return (
    <Container>
      <h2 className="mainText">What has Vanderbilt been working on?</h2>
      <CardGroup className="card-container">
        {cards.map((card) => (
          <Card key={card.imageUrl} className="card">
            <img src={card.imageUrl}></img>
            <Card.Body>
              <Card.Title className="mainText">{card.mainStat}</Card.Title>
              <Card.Text className="sectionName">{card.desc}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href={card.link}>Read more here</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <h2 className="mainText">What's happening now?</h2>
          <h3 className="smallerText">
            Vanderbilt recently partnered with Clearloop, a Silicon Ranch
            company, to hold to the University's commitment to powering its
            campus entirely through renewable energy and maintaining carbon
            neutrality. The investment will initally support a solar farm in
            Panola County, Mississippi, powering over 1,000 homes in the area.
          </h3>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="offset-md-3">
          <h3 className="mainText">Want to read more?</h3>
          <Button
            variant="primary"
            href="https://clearloop.us/about-clearloop/"
            target="_blank"
          >
            Click here
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default StaticCardComponent;
