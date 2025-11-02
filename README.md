# 🎙️ Voice Assistant — MERN

![Voice Assistant](https://img.shields.io/badge/Voice--Assistant-MERN-blue)

## 🚀 Short Description

A modern **Voice Assistant** application built with the **MERN** stack (MongoDB, Express, React, Node.js).  
It provides **speech recognition**, **text-to-speech**, and **intelligent assistant** features so users can control parts of the app and query information using voice commands.

> 💡 **Note:** For the best experience, use **Google Chrome**, as it provides the most stable support for the Web Speech API.

---

## 🌐 Live Demo

🎯 **Try it here:**  
👉 [https://virtual-voice-assistant.netlify.app](https://virtual-voice-assistant.netlify.app)

---

## ✨ Key Features

- 🎤 Speech recognition  
- 🔊 Text-to-speech  
- 🧠 Smart assistant logic  
- 🗂️ Full MERN backend  
- 🔐 Authentication ready  
- 💬 Responsive and modern UI  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite, Redux Toolkit) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Voice APIs** | Web Speech API |
| **Other Tools** | Axios, dotenv, cors, cookie-parser |

---

## 📁 Folder Structure

```
voice-assistant-in-mern/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ Redux/
│  │  └─ assets/
│  └─ package.json
└─ README.md
```

---

## 🧭 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ganjeliyajay/Voice-Assistant-In-MERN.git
cd Voice-Assistant-In-MERN
```

### 2️⃣ Setup Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Backend `.env` example:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 🧪 Usage

1. Run both frontend and backend servers.
2. Visit [http://localhost:5173](http://localhost:5173).
3. Try voice commands like:
   - "What’s the time?"
   - "Search for JavaScript tutorials"
   - "Open YouTube"

---

## 🚀 Deployment Guide

### 🌍 Backend (Render)
1. Go to [https://render.com](https://render.com) and create an account.
2. Click **“New +” → “Web Service”**.
3. Connect your **GitHub repo** and select the **Server** (or **Backend**) folder.
4. Set build and start commands:
   ```
   Build Command: npm install
   Start Command: npm start
   ```
5. Add your backend environment variables in Render:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLIENT_URL=https://virtual-voice-assistant.netlify.app
   ```
6. Deploy → You’ll get a URL like:
   ```
   https://voice-assistant-in-mern-1.onrender.com
   ```

---

### 💻 Frontend (Netlify)
1. Go to [https://app.netlify.com](https://app.netlify.com).
2. Click **“Add new site” → “Import from Git”**.
3. Choose your repo and configure:
   ```
   Base directory: Client
   Build command: npm run build
   Publish directory: Client/dist
   ```
4. Add this environment variable in Netlify:
   ```
   VITE_API_URL=https://voice-assistant-in-mern-1.onrender.com/assistant
   ```
5. Deploy → You’ll get your live site at:
   ```
   https://virtual-voice-assistant.netlify.app
   ```

---

## 🧠 Troubleshooting

| Issue | Solution |
|-------|-----------|
| **CORS Error** | Add your Netlify URL to `cors` in backend: `origin: 'https://virtual-voice-assistant.netlify.app'` |
| **Speech not working** | Use **Google Chrome** browser. |
| **404 after refresh** | Add `_redirects` file in `Client/public` with: `/index.html 200` |

---

## 🙋 Author

👨‍💻 **Ganjeliya Jay**  
🔗 GitHub: [@ganjeliyajay](https://github.com/ganjeliyajay)  
🌐 Live Demo: [https://virtual-voice-assistant.netlify.app](https://virtual-voice-assistant.netlify.app)

---

*Generated with ❤️ for your repository — Voice-Assistant-In-MERN*
