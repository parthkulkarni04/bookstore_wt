// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = 5009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});