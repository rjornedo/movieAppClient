import React, { useState, useEffect, useContext } from "react";
import { Table, Form, Button, Container, Modal } from "react-bootstrap";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";

export default function AdminView() {
    const { user } = useContext(UserContext);
    const notyf = new Notyf();
    
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    const [newMovie, setNewMovie] = useState({
        title: "",
        director: "",
        year: "",
        description: "",
        genre: "",
    });

    useEffect(() => {
        fetchMovies();
    }, []);

   const fetchMovies = () => {
       fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`)
           .then(res => res.json())
           .then(data => {
               console.log("Fetched movies:", data); // Debugging
               if (Array.isArray(data)) {
                   setMovies(data);
               } else {
                   setMovies([]); // Ensure it's an array
                   console.error("Unexpected API response:", data);
               }
           })
           .catch(error => {
               console.error("Error fetching movies:", error);
               setMovies([]); // Avoid breaking the UI
           });
   };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newMovie),
        })
        .then(res => res.json())
        .then(data => {
            if (data._id) {
                notyf.success("Movie added successfully!");
                setNewMovie({ title: "", director: "", year: "", description: "", genre: "" });
                fetchMovies();
            } else {
                notyf.error("Error adding movie.");
            }
        });
    };

    const handleDelete = (movieId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(res => res.json())
        .then(data => {
            notyf.success("Movie deleted!");
            fetchMovies();
        })
        .catch(error => notyf.error("Error deleting movie."));
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setShowModal(true);
    };

    const handleUpdate = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/updateMovie/${editingMovie._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(editingMovie),
        })
        .then(res => res.json())
        .then(data => {
            notyf.success("Movie updated!");
            setShowModal(false);
            fetchMovies();
        })
        .catch(error => notyf.error("Error updating movie."));
    };

    return (
        <Container>
            <h2 className="text-center mt-4">Admin Dashboard</h2>

            <Form onSubmit={handleSubmit} className="mb-4">
                <h4>Add Movie</h4>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={newMovie.title} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" name="director" value={newMovie.director} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" name="year" value={newMovie.year} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={newMovie.description} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" value={newMovie.genre} onChange={handleInputChange} required />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">Add Movie</Button>
            </Form>

            <h4>Manage Movies</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genre}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(movie)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(movie._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Movie Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={editingMovie?.title || ""} onChange={(e) => setEditingMovie(prev => ({ ...prev, title: e.target.value }))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text" value={editingMovie?.director || ""} onChange={(e) => setEditingMovie(prev => ({ ...prev, director: e.target.value }))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" value={editingMovie?.year || ""} onChange={(e) => setEditingMovie(prev => ({ ...prev, year: e.target.value }))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={editingMovie?.description || ""} onChange={(e) => setEditingMovie(prev => ({ ...prev, description: e.target.value }))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" value={editingMovie?.genre || ""} onChange={(e) => setEditingMovie(prev => ({ ...prev, genre: e.target.value }))} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
