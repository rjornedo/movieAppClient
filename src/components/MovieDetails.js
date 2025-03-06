import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal, Spinner, Container } from 'react-bootstrap';
import '../App.css'; // Import CSS

export default function MovieDetails() {
    const { movieId } = useParams();
    console.log("Extracted movieId:", movieId);

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        if (!movieId) {
            console.error("movieId is undefined!");
            setError("Invalid movie ID.");
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovie/${movieId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch movie");
            return res.json();
        })
        .then(data => {
            console.log("Fetched movie data:", data);
            setMovie(data);
        })
        .catch(err => {
            console.error('Error fetching movie:', err);
            setError("Movie not found.");
        });
    }, [movieId]);

    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!movie) return (
        <Container className="loading-container">
            <Spinner animation="border" variant="warning" />
        </Container>
    );

    return (
        <Container className="movie-details-container">
            <Card className="movie-cards">
                <Card.Body className="text-center">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button variant="light" onClick={() => setShowModal(true)}>Watch Trailer</Button>
                </Card.Body>
            </Card>

            {/* Pop-up Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title} - Trailer</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {movie.trailerUrl ? (
                        <iframe 
                            width="100%" 
                            height="300" 
                            src={movie.trailerUrl} 
                            title={`${movie.title} Trailer`} 
                            allowFullScreen 
                        />
                    ) : (
                        <p>No trailer available.</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
