/**
 * Navbar.jsx
 * Implements a Navbar with the following structure:
 * 1) Home
 * 2) /data (Data)
 * 3) A dropdown with 3 options to learn more.
 */

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
        <Navbar.Brand href="./">
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top"
            alt="Clearloop + Vandy Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="./">Home</Nav.Link>
            <Nav.Link href="/data">Data</Nav.Link>
            <NavDropdown title="Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="/resources">Start here!</NavDropdown.Item>
              <NavDropdown.Item href="#dropdown/3.2">FAQs</NavDropdown.Item>
              <NavDropdown.Item href="https://clearloop.us">
                Clearloop website
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://vanderbilt.edu/sustainability">
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
