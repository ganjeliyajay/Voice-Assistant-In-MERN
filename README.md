# 🎙️ Voice Assistant — MERN Stack

A modern AI-powered Voice Assistant built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application enables users to interact through voice commands using Speech Recognition and Text-to-Speech technologies, creating a seamless hands-free experience.

---

## 🚀 Live Demo

🌐 Live Application: https://virtual-voice-assistant.netlify.app

---

## 📌 Overview

Voice Assistant is a full-stack web application that allows users to communicate with the system using natural voice commands. It integrates browser speech APIs with a scalable MERN backend to provide intelligent responses and interactive voice-based features.

For the best experience, it is recommended to use Google Chrome because of its stable support for the Web Speech API.

---

## ✨ Features

* 🎤 Real-time Speech Recognition
* 🔊 Text-to-Speech Responses
* 🤖 Intelligent Voice Command Processing
* 🔐 User Authentication & Authorization
* 🗄️ MongoDB Database Integration
* ⚡ RESTful API Architecture
* 📱 Fully Responsive User Interface
* 🚀 Scalable MERN Stack Backend

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie Parser
* CORS

### Database

* MongoDB
* Mongoose

### Voice Technologies

* Web Speech API
* Speech Recognition
* Speech Synthesis

---

## 📂 Project Structure

voice-assistant-in-mern/

├── backend/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── middleware/

│   └── server.js

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── Redux/

│   │   ├── assets/

│   │   └── App.jsx

│   └── package.json

│

└── README.md

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/ganjeliyajay/Voice-Assistant-In-MERN.git

cd Voice-Assistant-In-MERN
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## 🧪 How to Use

1. Start Backend Server
2. Start Frontend Application
3. Open http://localhost:5173
4. Grant microphone permission
5. Interact using voice commands

### Example Commands

* What's the current time?
* Open YouTube
* Search JavaScript tutorials
* Open Google
* Tell me today's date

---

## 🚀 Deployment

### Backend Deployment (Render)

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=https://virtual-voice-assistant.netlify.app
```

---

### Frontend Deployment (Netlify)

Build Command:

```bash
npm run build
```

Publish Directory:

```bash
dist
```

Environment Variable:

```env
VITE_API_URL=https://voice-assistant-in-mern-1.onrender.com/assistant
```

---

## 🐛 Troubleshooting

### CORS Error

Ensure the frontend URL is included in the backend CORS configuration.

### Speech Recognition Not Working

Use the latest version of Google Chrome and allow microphone permissions.

### React Refresh 404 Error

Add a `_redirects` file with:

```text
/ * /index.html 200
```

(remove spaces)

---

## 📈 Future Improvements

* OpenAI / Gemini Integration
* Multi-language Support
* Chat History Storage
* Voice Customization
* AI-Powered Conversations
* Smart Task Automation

---

## 👨‍💻 Author

Ganjeliya Jay

GitHub:
https://github.com/ganjeliyajay

Live Demo:
https://virtual-voice-assistant.netlify.app

---

⭐ If you found this project useful, consider giving it a star on GitHub.
