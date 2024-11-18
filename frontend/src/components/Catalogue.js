// src/components/Catalogue.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5009/api';

const Catalogue = () => {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/books/${bookId}`);
      // Refresh the book list after deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert price and quantity to numbers
      const bookData = {
        ...newBook,
        price: parseFloat(newBook.price),
        quantity: parseInt(newBook.quantity)
      };

      await axios.post(`${API_BASE_URL}/books`, bookData);
      
      // Reset form and fetch updated books
      setNewBook({
        title: '',
        description: '',
        price: '',
        quantity: '',
        imageUrl: ''
      });
      setShowAddForm(false);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Book Catalogue</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Book
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

<div className="row">
  {books.map((book) => (
    <div key={book._id} className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src={book.imageUrl} 
          className="card-img-top" 
          alt={book.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.description}</p>
          <p className="card-text">
            <strong>Price: </strong>${book.price.toFixed(2)}
          </p>
          <p className="card-text">
            <strong>In Stock: </strong>{book.quantity}
          </p>
        </div>
        <div className="card-footer text-end">
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Add Book Modal */}
      {showAddForm && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Book</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      name="description"
                      value={newBook.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="price"
                      value={newBook.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="quantity"
                      value={newBook.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      name="imageUrl"
                      value={newBook.imageUrl}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Book'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;