
# 🌟 LiveSphere

**LiveSphere** is a powerful full-stack platform for **real-time chatting**, **1-on-1 & group video calls**, **screen sharing**, and **language exchange** — all packed in a beautiful UI with 32 dynamic themes!

🔗 Live Demo: https://livesphere-0l8t.onrender.com/

---

## 🚀 Features

* 🌐 Real-time Messaging with Typing Indicators & Reactions
* 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
* 🔐 Secure JWT Authentication & Protected Routes
* 🌍 Language Exchange Platform with 32 Unique UI Themes
* 🧠 Global State Management with Zustand
* 🚨 Robust Error Handling (Frontend & Backend)
* ⚡ Powered by React, Express, MongoDB, TailwindCSS, and TanStack Query
* 🎥 Video & Chat APIs integrated with [Stream](https://getstream.io/)
* 🧪 Easy .env Setup for Environment Variables
* 🚀 Deployed for Free (Frontend + Backend)

---

## 🛠️ Tech Stack

* **Frontend:** React.js, TailwindCSS, TanStack Query, Zustand
* **Backend:** Node.js, Express.js, MongoDB
* **Real-Time APIs:** Stream API
* **Deployment:**  Render 

---

## 📁 Project Structure

```
/backend     → Express.js API with MongoDB
/frontend    → React.js Application with TailwindCSS
```

---

## 🔧 Environment Variables Setup

Create your `.env` files in both the **backend** and **frontend** directories:

### Backend (`/backend/.env`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend/.env`)

```
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🖥️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/pavan77749/livesphere.git

```

### 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌟 Highlights

* Typing indicators and emoji reactions on messages
* 1-on-1 and group video calls
* Screen sharing and call recording
* Protected routes and user authentication using JWT
* Dynamic 32 language exchange themes
* Global error handling and toast notifications
* Scalable and production-ready setup
* Deployment-ready configuration

---

## ✨ Future Improvements

* Push Notifications 🔔
* Mobile App Version 📱
* Advanced Group Management 📚
* More Language Learning Tools 🌐

---

## 📜 License

This project is open-source and free to use.

---

