import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

export default function MoviePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setMovies(data.movies || []);
        })
        .catch(err => {
            console.error('Error fetching movies:', err);
            setMovies([]); // Prevent `undefined`
        });
    }, []);

    // Default poster image
    const defaultPoster = "https://via.placeholder.com/300x450?text=No+Image";

    return (
        <div className="movie-page">
            <Container className="py-5">
                <h2 className="movie-title text-center mb-4">Available Movies</h2>
                <Row>
                    {movies.map(movie => (
                        <Col md={4} key={movie._id} className="mb-4">
                            <Card className="movie-card">
                                <Card.Img variant="top" 
                                    src={"https://cdn-icons-png.flaticon.com/512/7239/7239994.png" || defaultPoster} 
                                    alt={movie.title} 
                                    className="movie-poster"
                                />
                                <Card.Body className="movie-card-body">
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.description}</Card.Text>
                                    <Button as={Link} to={`/movies/getMovie/${movie._id}`} variant="danger" className="w-100">View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
