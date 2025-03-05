import React, { useState, useContext  } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";
import '../App.css';


export default function Login() {

        const { user, setUser} = useContext(UserContext);
        console.log(user);

        const notyf = new Notyf();

        // State hooks to store the values of the input fields
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate(); 



        function authenticate(e) {

            // Prevents page redirection via form submission
            e.preventDefault();
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    email: email,
                    password: password

                })
            })
            .then(res => res.json())
            .then(data => {

                // Response from the api
                console.log(data);

                if(data.access) {

                    localStorage.setItem("token", data.access);
                    // Retrieve user details upon login
                    retrieveUserDetails(data.access)

                                   
                    // Clear input fields after submission
                    setEmail('');
                    setPassword('');

                    notyf.success(`Successful login!`);
                
                } else if (data.message === "Incorrect email or password") {

                    notyf.error(`Incorrect credentials: Please try again.`);

                } else {

                    notyf.error(`User Not Found: Try Again.`);
                }

            })

        }
        function retrieveUserDetails(token){
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                });

                // Redirect the user to /workouts after setting user details
                navigate("/workouts");
            });
        }


    return (
        <div className="login-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-lg login-card">
                    <Card.Body>
                        <h2 className="text-center mb-4 fw-bold">Welcome Back!</h2>
                        <p className="text-center text-muted">Login to enjoy your favorite movies</p>
                        <Form onSubmit={authenticate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
