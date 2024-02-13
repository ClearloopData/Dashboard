import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../static/images/long-logo.png";

function NavComponent() {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#AEB3C4", fontFamily: "FiraCode" }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#Data">Data</Nav.Link>
            <NavDropdown title="More Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Start here!
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">FAQs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Clearloop website
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Vanderbilt sustainability website
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
