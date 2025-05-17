🚀 Ai-education-websit

A web-based application designed to guide users who want to learn new technologies through curated learning journeys with a focus on demonstrating how specific technologies are applied in the context of a simple scenario.

---

📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- ⁠-[Test](#tset)
- [File Structure](#file-structure)


---

📝 Overview

Ai-education-websit: allows users to:
- Register and log in securely.
- Select from predefined learning paths.
- understanding the applications of new technologies as they progress.

This Website provides a structured and interactive way to master new skills a understand technology fundamentals through practical examples.

---

✨ Features

- User Authentication: Secure Sign Up, Login, and Session Management.
- Learning Paths: Curated sets of materials and topics to guide learner discovery.
- Technology Demonstrations: Practical test pages/descriptions that show how technology operates using simple, real-world scenarios
- Responsive Interface: Clean and user-friendly HTML/CSS frontend.

---

🏗 Architecture

- Frontend: HTML, CSS, and JavaScript for UI and interaction.
- Backend: Node.js/Express for API, authentication, and data management.
- Database: MongoDB
- Data Models: User, Learning Path.

---

💻 Technologies Used

- Node.js & Express.js
- MongoDB
- HTML5
- CSS3
- JavaScript (Client-side)
- Other tools/libra (package.json, … )

---

🚦 Getting Started

Prerequisites

- Node.js and npm installed
- MongoDB running locally or in the cloud

Installation:

https://github.com/LujainAlabbad/ai-education-website.git

 :Configuration

- Update environment variables (e.g., database URI) if needed.

Running the Project

node server/server.js


 Seed Data (Optional)

To seed initial learning paths:
node seedLearningPaths.js

---
🧪 Test: How Defined Technology Works 

One of the goals of this project is to demonstrate how technology concepts can be applied practically.  
Within the platform, you’ll find descriptions or interactive sections illustrated by the scenario of a simple question and answer example . 
This demonstrates both the application of learning path content and the function of the underlying technologies, making concepts tangible for users.

---

📁 File Structure

.
├── about.html
├── index.html
├── login.html
├── signup.html
├── style.css
├── main.js
├── server.js
├── auth.js
├── learningPaths.js
├── LearningPath.js
├── User.js
├── seedLearningPaths.js
└── demo.js

- HTML/CSS/JS: Frontend files
- server.js: Main Express server
- auth.js: Authentication logic
- learningPaths.js, LearningPath.js: Learning path models & routes
- User.js: User model
- seedLearningPaths.js: Data seeding script

---
