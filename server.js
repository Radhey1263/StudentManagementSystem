// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import database configuration
const connectDB = require('./server/config/db');

// Import routes
const studentRoutes = require('./server/routes/studentRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});