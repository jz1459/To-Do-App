import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar expand="md" className= "navbar">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" className= "navbar-link">Today</Nav.Link>
                        <Nav.Link href="/work"  className="navbar-link">Work</Nav.Link>
                        <Nav.Link href="/school" className= "navbar-link">School</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;