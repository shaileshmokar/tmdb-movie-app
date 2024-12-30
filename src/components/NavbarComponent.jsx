import React from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        // <Navbar sticky="bottom" key="sm" expand="sm" className="bg-body-tertiary">
        <Navbar sticky="bottom" key="sm" expand="sm" bg="dark" data-bs-theme="dark" className="bg-body-tertiary text-white">
            <Container>
                <Navbar.Brand href="#home">
                    <img alt="" src="vite.svg" width="30" height="30" className="d-inline-block align-top" />{' '} Movie App
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
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
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