import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar } from 'react-icons/fa';
import '../App.css';  

const MovieHomePage = () => {
  const [showModal, setShowModal] = useState(false); // State to toggle modal or video player (Optional)

  return (
    <div className="movie-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MovieManiac</h1>
          <p className="hero-tagline">The Ultimate Destination for Movies</p>
          <Button className="cta-button" onClick={() => setShowModal(true)}>
            <FaPlay /> Watch Now
          </Button>
        </div>
      </section>

      {/* Featured Movies Carousel */}
      <section className="featured-movies">
        <h2 className="section-title">Featured Movies</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1500x600?text=Movie+1"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Movie Title 1</h3>
              <p>Some description about Movie 1.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1500x600?text=Movie+2"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Movie Title 2</h3>
              <p>Some description about Movie 2.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1500x600?text=Movie+3"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Movie Title 3</h3>
              <p>Some description about Movie 3.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Movie Categories Section */}
      <section className="movie-categories">
        <h2 className="section-title">Browse by Category</h2>
        <Row>
          <Col xs={12} md={4}>
            <div className="category-card">
              <img src="https://via.placeholder.com/300x200?text=Action" alt="Action Movies" />
              <h3>Action</h3>
              <Button as={Link} to="/action" className="category-button">Explore</Button>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="category-card">
              <img src="https://via.placeholder.com/300x200?text=Comedy" alt="Comedy Movies" />
              <h3>Comedy</h3>
              <Button as={Link} to="/comedy" className="category-button">Explore</Button>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="category-card">
              <img src="https://via.placeholder.com/300x200?text=Drama" alt="Drama Movies" />
              <h3>Drama</h3>
              <Button as={Link} to="/drama" className="category-button">Explore</Button>
            </div>
          </Col>
        </Row>
      </section>    
    </div>
  );
};

export default MovieHomePage;
