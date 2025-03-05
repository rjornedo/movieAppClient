import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  // State hook for the user to allow it to have a global scope
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  // Function for clearing the local storage
  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    console.log(user);
    console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data && data._id) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>

      {/* Footer */}
      <footer className="movie-footer">
        <Container>
          <Row>
            <Col>
              <p>&copy; 2025 MovieManiac. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </UserProvider>
  );
}

export default App;
