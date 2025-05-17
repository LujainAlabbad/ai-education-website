console.log('>>> OpenRouter /api/demo route loaded');

const express = require('express');
const axios = require('axios');
const Question = require('../models/Question');
const router = express.Router();

// Middleware to validate question input
const validateQuestionInput = (req, res, next) => {
  const { question } = req.body;
  
  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    console.log('Invalid question input:', question);
    return res.status(400).json({ 
      msg: 'Please provide a valid question (minimum 3 characters)',
      error: 'INVALID_INPUT'
    });
  }
  
  req.validatedQuestion = question.trim();
  next();
};

// Rate limiting middleware (simple version)
const rateLimiter = (() => {
  const requests = new Map();
  const WINDOW_SIZE = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 10; // 10 requests per minute per IP

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, startTime: currentTime });
      return next();
    }

    const window = requests.get(ip);

    if (currentTime - window.startTime > WINDOW_SIZE) {
      // Reset window
      requests.set(ip, { count: 1, startTime: currentTime });
      return next();
    }

    if (window.count >= MAX_REQUESTS) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({ 
        msg: 'Too many requests. Please try again later.',
        error: 'RATE_LIMIT_EXCEEDED'
      });
    }

    window.count++;
    next();
  };
})();

router.post('/ask', rateLimiter, validateQuestionInput, async (req, res) => {
  const question = req.validatedQuestion;
  
  try {
    console.log('Processing question:', question);
    
    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'AI EduHub Demo'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response structure from OpenRouter');
    }

    const answer = response.data.choices[0].message.content;
    console.log('Successfully generated answer:', answer.substring(0, 50) + '...');

    // Save to database
    const savedQuestion = await Question.create({ 
      question, 
      answer,
      metadata: {
        model: 'gpt-3.5-turbo',
        tokens: response.data.usage?.total_tokens
      }
    });

    console.log('Question saved to DB with ID:', savedQuestion._id);

    // Send response
    res.json({ 
      success: true,
      answer,
      questionId: savedQuestion._id,
      tokens: response.data.usage?.total_tokens
    });

  } catch (err) {
    console.error('Error in /ask endpoint:', {
      message: err.message,
      stack: err.stack,
      responseData: err.response?.data
    });

    const statusCode = err.response?.status || 500;
    const errorMessage = err.response?.data?.error?.message || 
                        'Error generating answer. Please try again.';

    res.status(statusCode).json({ 
      success: false,
      msg: errorMessage,
      error: err.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Additional endpoint to get question history
router.get('/history', async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('question answer createdAt');
    
    res.json({ success: true, questions });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ 
      success: false,
      msg: 'Error fetching question history'
    });
  }
});

module.exports = router;