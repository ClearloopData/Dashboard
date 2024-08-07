import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../static/images/long-logo.png";

function NavComponent() {
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "white",
        fontFamily: "Garamond",
        boxShadow: "0 4px 2px -2px gray", // Adding shadow
      }}
    >
      <Container>
        <Navbar.Brand href="./">
          <img
            src={logo}
            height="50" // Increased height for larger logo
            className="d-inline-block align-top"
            alt="Clearloop + Vandy Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ paddingLeft: 0 }}>
            <Nav.Link href="./" style={{ fontWeight: "bold", paddingLeft: "0.5rem" }}>Home</Nav.Link> {/* Bold text */}
            <Nav.Link href="/data" style={{ fontWeight: "bold", paddingLeft: "0.5rem" }}>Data</Nav.Link> {/* Bold text */}
            <NavDropdown title="Resources" id="basic-nav-dropdown" style={{ fontWeight: "bold", paddingLeft: "0.5rem" }}> {/* Bold text */}
              <NavDropdown.Item href="/resources">Start here!</NavDropdown.Item>
              <NavDropdown.Item href="#dropdown/3.2">FAQs</NavDropdown.Item>
              <NavDropdown.Item href="https://clearloop.us">
                Clearloop website
              </NavDropdown.Item>
              <NavDropdown.Item href="/image-collection">Logo Reference</NavDropdown.Item> {/* New item */}
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
