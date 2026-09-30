const express = require('express');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Set View Engine to EJS as specified by assignment
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON and Form URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, client JS, images) from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Mount Application Routes
app.use('/', postRoutes);
app.use('/api', apiRoutes);

// 404 Not Found Middleware
app.use(notFoundHandler);

// Centralized Error Handler Middleware
app.use(errorHandler);

module.exports = app;
