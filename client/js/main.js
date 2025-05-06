// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const demoInput = document.getElementById('demo-input');
const demoSubmit = document.getElementById('demo-submit');
const demoOutput = document.getElementById('demo-output');

// Fetch courses from backend
async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:3000/api/courses');
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Display courses in the DOM
function displayCourses(courses) {
    coursesContainer.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-image" style="background-image: url('${course.imageUrl}')"></div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.link}">Start Course</a>
            </div>
        </div>
    `).join('');
}

// Simple AI Demo - This would connect to your backend API
demoSubmit.addEventListener('click', async () => {
    const question = demoInput.value.trim();
    if (!question) return;
    
    demoOutput.textContent = "Thinking...";
    
    try {
        const response = await fetch('http://localhost:3000/api/ai-demo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        
        const data = await response.json();
        demoOutput.textContent = data.answer || "Sorry, I couldn't process your question.";
    } catch (error) {
        console.error('Error:', error);
        demoOutput.textContent = "An error occurred. Please try again.";
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
});