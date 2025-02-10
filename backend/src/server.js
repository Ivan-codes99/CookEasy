require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON requests

//connectDB();

// Routes
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
