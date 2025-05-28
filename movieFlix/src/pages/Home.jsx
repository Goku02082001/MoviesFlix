import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CineTracker</h1>
          <p>Your personal movie collection manager</p>
          <div className="cta-buttons">
            <Link to="/movies" className="cta-btn primary">Browse Movies</Link>
            <Link to="/register" className="cta-btn secondary">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Track Your Movies</h3>
            <p>Keep a comprehensive list of all your favorite films.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Rate & Review</h3>
            <p>Give ratings and add descriptions to remember why you loved a movie.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Discovery</h3>
            <p>Find movies quickly with organized categorization by genre and year.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Account</h3>
            <p>Your movie collection is protected with secure authentication.</p>
          </div>
        </div>
      </div>

      <div className="getting-started-section">
        <h2>Getting Started</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up with a username, email, and password.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Movies</h3>
            <p>Start building your collection by adding your favorite movies.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Organize & Enjoy</h3>
            <p>Keep track of what you've watched and what you want to watch next.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;