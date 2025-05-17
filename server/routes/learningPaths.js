const express = require('express');
const LearningPath = require('../models/LearningPath');

const router = express.Router();

// Get all paths
router.get('/', async (req, res) => {
  try {
    const paths = await LearningPath.find();
    res.json(paths);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add new path (optional - can be added manually from Compass too)
router.post('/', async (req, res) => {
  const { title, description, link } = req.body;
  try {
    const path = await LearningPath.create({ title, description, link });
    res.status(201).json(path);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;