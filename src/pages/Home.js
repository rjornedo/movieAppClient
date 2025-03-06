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
         <div className="video-container" style={{ display: 'flex', justifyContent: 'center' }}>
           <iframe 
             width="560" 
             height="315" 
             src="https://www.youtube.com/embed/9sLQaR0TpvM?si=hkByxY5t0jz3CEAp" 
             title="YouTube video player" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
             referrerPolicy="strict-origin-when-cross-origin" 
             allowFullScreen>
           </iframe>
         </div>
         <Carousel.Caption>
           <h3>Halloween Special</h3>
           <p>Watch the latest trailer.</p>
         </Carousel.Caption>
       </Carousel.Item>

          {/* Second Slide - YouTube Video */}
          <Carousel.Item>
            <div className="video-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe 
                width="560" 
                height="315" src="https://www.youtube.com/embed/Fa8_Vh1Yn6E?si=PDcfFcry8urIwMYl"
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
            </div>
            <Carousel.Caption>
              <h3>Cover #1</h3>
              <p>Watch the latest trailer.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Movie Categories Section */}

<section className="movie-categories">
  <h2 className="section-title">Browse by Category</h2>
  <Row>
    <Col xs={12} md={4}>
      <div className="category-card interactive-card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9LBHpDDM202VdP_TI7m55Glh5Npz-4GvhvQ&s" alt="Action Movies" />
        <h3>Action</h3>
        <Button as={Link} to="/action" className="category-button">Explore</Button>
      </div>
    </Col>
    <Col xs={12} md={4}>
      <div className="category-card interactive-card">
        <img src="https://i.guim.co.uk/img/media/5f2bdaed5f7ba49681d32ee8b67df5d37c16c176/0_0_2203_3543/master/2203.jpg?width=700&quality=85&auto=format&fit=max&s=58373f6ce2fbcb0b40918a13c95b579c" alt="Comedy Movies" />
        <h3>Comedy</h3>
        <Button as={Link} to="/comedy" className="category-button">Explore</Button>
      </div>
    </Col>
    <Col xs={12} md={4}>
      <div className="category-card interactive-card">
        <img src="https://m.media-amazon.com/images/M/MV5BODY2YWYwM2YtZTVlNC00MjgyLTgzYTgtNmFmYWE5ZmY1MDM5XkEyXkFqcGc@._V1_.jpg" alt="Drama Movies" />
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
