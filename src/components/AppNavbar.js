import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilm, FaSearch, FaUserCircle, FaHome } from 'react-icons/fa';
import UserContext from "../context/UserContext";
import '../App.css'; // Import the custom CSS file for styling

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    MovieManiac <FaFilm />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">
                            <FaHome />Home 
                        </Nav.Link>

                        <Nav.Link as={Link} to="/about" className="nav-link">
                            About 
                        </Nav.Link>

                        <Nav.Link as={Link} to="/movies" className="nav-link">
                            Movies <FaSearch />
                        </Nav.Link>

                        {user.id ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className="nav-link">
                                    <FaUserCircle /> Profile
                                </Nav.Link>
                                <Button as={Link} to="/logout" className="nav-button">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" className="nav-button">
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
