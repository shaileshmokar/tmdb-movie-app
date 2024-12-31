import React from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import reactLogo from './../assets/react.svg'
import viteLogo from '/vite.svg'

const NavbarComponent = () => {
    return (
        // <Navbar sticky="bottom" key="sm" expand="sm" className="bg-body-tertiary">
        <Navbar sticky="bottom" key="sm" expand="sm" bg="dark" data-bs-theme="dark" className="bg-body-tertiary text-white">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="text-white text-decoration-none">
                        <img alt="" src={viteLogo} width="30" height="30" className="d-inline-block align-top" />{' '} Movie App
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-sm`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                        Offcanvas
                    </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link><NavLink to="/" className="text-decoration-none text-light">Home</NavLink></Nav.Link>
                        <Nav.Link><NavLink to="/about" className="text-decoration-none text-light">About</NavLink></Nav.Link>
                        <NavDropdown
                            title="Dropdown"
                            id={`offcanvasNavbarDropdown-expand-sm`}
                        >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;