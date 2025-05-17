console.log('>>> OpenRouter /api/demo route loaded');

const express = require('express');
const axios = require('axios');
const Question = require('../models/Question'); // <== import model

const router = express.Router();

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  console.log('>>> /ask route triggered');
  console.log('Received question:', question);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'AI EduHub Demo'
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    console.log('OpenRouter Answer:', answer);

    const saved = await Question.create({ question, answer });
    console.log('Saved to MongoDB:', saved);

    res.json({ answer });
  } catch (err) {
    console.error('Error in /ask:', err.response?.data || err.message);
    res.status(500).json({ msg: 'Error generating answer', error: err.message });
  }
});

module.exports = router;