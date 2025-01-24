import React, { useState, useEffect } from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Button, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import MovieAppLogo from '/movie.svg';
import { useAuth } from '../context/AuthProvider';
import { Plus, PanelsRightBottom } from 'lucide-react';
import AddMovie from './../components/AddMovie';
import ModalForm from './../components/ModalForm';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } else {
            setUser(null);
        }
        // setUser(loggedInUser ? loggedInUser: null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/auth/login');
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    return (
        <>
            <Navbar
                sticky="top"
                expand="sm"
                data-bs-theme="dark"
                // className="p-2 bg-dark text-white"
                style={{ 
                    backgroundColor: 'rgb(11, 49, 79)' 
                }}
            >
                <Container fluid>
                    {/* Brand Logo */}
                    <Navbar.Brand>
                        <NavLink to="/" className="text-white text-decoration-none d-flex align-items-center">
                            <img
                                alt="Movie App Logo"
                                src={MovieAppLogo}
                                width="40"
                                height="40"
                                className="d-inline-block align-top me-2"
                            />
                            {/* Movie App */}
                        </NavLink>
                    </Navbar.Brand>

                    {/* Offcanvas Toggle */}
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />

                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="bg-dark"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                                Navigation
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <Nav className="me-auto d-flex align-items-center">
                                <NavLink to="/" className="nav-link text-light">Home</NavLink>
                                <NavLink to="/movies" className="nav-link text-light">Movies</NavLink>
                                {/* <NavLink to="/tv-shows" className="nav-link text-light">
                                    TV Shows
                                </NavLink> */}
                            </Nav>

                            <Nav className="ms-auto">
                                {user ? (
                                    <>
                                        <Button size="md" variant="outline-info me-2" onClick={handleModalShow}>
                                            <Plus size={20} /> Movie
                                        </Button>
                                        <NavDropdown
                                            title={
                                                <span className="text-light gap-2">
                                                    {user.photo && (
                                                        <img
                                                            src={user.photo}
                                                            alt="Profile"
                                                            className="rounded-circle border border-light me-1"
                                                            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                    <span>Hello, {user.username || 'User'}</span>
                                                </span>
                                            }
                                            id="userDropdown"
                                            align="end"
                                        >
                                            <NavDropdown.Item>
                                                <NavLink to="/profile" className="text-decoration-none text-white">
                                                    Profile
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <NavLink to="/settings" className="text-decoration-none text-white">
                                                    Settings
                                                </NavLink>
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />

                                            <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                    <NavLink to="/auth/login" className="text-decoration-none">
                                        <Button variant="outline-info me-2">Login</Button>
                                    </NavLink>
                                    <NavLink to="/auth/register" className="text-decoration-none">
                                        <Button variant="outline-info">Register</Button>
                                    </NavLink>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            <ModalForm show={showModal} handleClose={handleModalClose} />
        </>
    );
};

export default NavbarComponent;