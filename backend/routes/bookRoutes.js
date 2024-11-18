// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
});


// Add new book
router.post('/', async (req, res) => {
  try {
    const { title, description, price, quantity, imageUrl } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !quantity || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new book
    const newBook = new Book({
      title,
      description,
      price,
      quantity,
      imageUrl
    });

    // Save to database
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

module.exports = router;