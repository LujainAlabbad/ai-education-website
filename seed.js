require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

const courses = [
    {
        title: "AI Fundamentals",
        description: "Learn the basics of artificial intelligence and its applications.",
        imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813a743e",
        link: "/course/ai-fundamentals",
        difficulty: "Beginner"
    },
    {
        title: "Machine Learning 101",
        description: "Introduction to machine learning algorithms and techniques.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        link: "/course/machine-learning-101",
        difficulty: "Beginner"
    },
    {
        title: "Neural Networks Explained",
        description: "Understand how neural networks work and how to build them.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
        link: "/course/neural-networks",
        difficulty: "Intermediate"
    }
];

async function seedDatabase() {
    try {
        await Course.deleteMany({});
        await Course.insertMany(courses);
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();