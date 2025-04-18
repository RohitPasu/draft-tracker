require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const draftPicksRouter = require('./routes/draftPicks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/draft-picks', draftPicksRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/draft-tracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 