const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { authenticate } = require('./middleware/authenticate');

const app = express();

// Middlewares
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/users', userRoutes);
app.use('/session', authenticate, sessionRoutes);

module.exports = app;
