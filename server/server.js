console.log('>>> demo.js route file is ACTIVE');
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
console.log('authRoutes loaded:', typeof authRoutes);
const demoRoutes = require('./routes/demo'); 
const learningPathRoutes = require('./routes/learningPaths');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client')));

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/paths', learningPathRoutes);
app.use(express.json()); // For parsing JSON bodies
app.use('/api/demo', require('./routes/demo'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});
console.log('All routes are loaded.');



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });