// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setUser({ name: formData.fullName });
    setShowSignup(false);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="container py-5 position-relative">
      {/* User Greeting */}
      {user && (
        <div className="position-absolute top-0 end-0 mt-3 me-3">
          <h5 className="text-primary">Hello, {user.name}!</h5>
        </div>
      )}

      {/* Hero Section */}
      <div className="px-4 py-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">Welcome to BookStore</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Discover your next favorite book from our vast collection of titles spanning every genre.
            From bestsellers to rare finds, we have something for every reader.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/catalogue" className="btn btn-primary btn-lg px-4 me-sm-3">Browse Books</Link>
            {!user && (
              <button 
                className="btn btn-outline-secondary btn-lg px-4" 
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 py-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Free Shipping</h3>
              <p className="card-text">On orders over $50. Delivery within 2-5 business days.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Student Discount</h3>
              <p className="card-text">10% off with valid student ID. Perfect for textbooks and study materials.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Rewards Program</h3>
              <p className="card-text">Earn points with every purchase. Redeem for future books.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="py-5">
        <h2 className="text-center mb-4">Featured Books</h2>
        <div className="row">
          {[
            {
              title: "The Great Gatsby",
              author: "F. Scott Fitzgerald",
              description: "A timeless classic about the American Dream"
            },
            {
              title: "To Kill a Mockingbird",
              author: "Harper Lee",
              description: "A powerful story of racial injustice and childhood innocence"
            },
            {
              title: "1984",
              author: "George Orwell",
              description: "A dystopian masterpiece that remains relevant today"
            }
          ].map((book, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                  <p className="card-text">{book.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowSignup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Create a password" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password" 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowSignup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;