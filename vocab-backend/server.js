require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeFirebaseAdmin } = require('./config/firebase-admin'); // Firebase initialization

// Route imports
const authRoutes = require('./routes/authRoutes');
const vocabRoutes = require('./routes/vocabRoutes');

// Initialize Express app
const app = express();

// Initialize Firebase Admin
//initializeFirebaseAdmin();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vocabs', vocabRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});