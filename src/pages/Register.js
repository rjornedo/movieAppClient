import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-lg register-card">
                    <Card.Body>
                        <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
                        <p className="text-center text-muted">Explore the world of movies with us!</p>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <Form onSubmit={handleSubmit}>
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
                                Register
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
