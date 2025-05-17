require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const LearningPath = require('./server/models/LearningPath');

const paths = [
  {
    title: "Intro to Artificial Intelligence",
    description: "Learn the fundamentals of AI including history, concepts, and real-world applications.",
    link: "https://www.coursera.org/learn/introduction-to-ai"
  },
  {
    title: "Machine Learning by Andrew Ng",
    description: "Stanford’s most popular course on supervised learning, neural networks, and deep learning.",
    link: "https://www.coursera.org/learn/machine-learning"
  },
  {
    title: "Deep Learning Specialization",
    description: "A 5-course specialization to master deep learning using TensorFlow and real-world projects.",
    link: "https://www.coursera.org/specializations/deep-learning"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await LearningPath.deleteMany(); // Optional: Clear existing
    await LearningPath.insertMany(paths);
    console.log('Learning paths inserted!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));