require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');



// Correct MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ai-education', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

// Rest of your server code...
app.listen(3000, () => console.log('Server running'));
// Course Model
const Course = mongoose.model('Course', new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    link: String,
    difficulty: String
}));

// AI Demo Model
const AiQuestion = mongoose.model('AiQuestion', new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: { type: Date, default: Date.now }
}));

// Routes
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/ai-demo', async (req, res) => {
    const { question } = req.body;
    
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    
    try {
        const answer = `This is a simulated response to your question about AI: "${question}". In a real application, this would connect to an AI model like OpenAI's GPT.`;
        
        const newQuestion = new AiQuestion({ question, answer });
        await newQuestion.save();
        
        res.json({ answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});