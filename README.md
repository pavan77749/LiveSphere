# 🌟 LiveSphere

**LiveSphere** is a full-stack **language exchange platform** where learners find partners, send friend requests, chat in real time, and jump into video calls, all in a UI with 32 switchable themes.

🔗 **Live Demo:** https://livesphere-0l8t.onrender.com/

![LiveSphere video call](frontend/public/VideoCall.png)

---

## 🚀 Features

* 🔐 **Authentication**: sign up, log in, and log out with JWT stored in an HTTP-only cookie (7-day expiry, bcrypt-hashed passwords)
* 🧭 **Onboarding**: set your name, bio, native language, learning language, location, and avatar before using the app
* 🤝 **Find language partners**: recommended users, friend requests (send / accept), and a notifications page for incoming and accepted requests
* 💬 **Real-time chat**: 1-on-1 messaging with threads, typing indicators, and reactions, powered by [Stream Chat](https://getstream.io/chat/)
* 📹 **Video calls**: start a call from any chat, with screen sharing, recording, and standard call controls from the [Stream Video SDK](https://getstream.io/video/)
* 🎨 **32 UI themes**: built with DaisyUI and saved to localStorage through a Zustand store
* 🛡️ **Protected routes**: unauthenticated users go to login, and users who haven't onboarded go to onboarding
* 🔔 **Toast notifications** and error handling on both frontend and backend

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                                            |
| ------------ | --------------------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite, React Router 7, TailwindCSS + DaisyUI, TanStack Query, Zustand, Axios    |
| **Backend**  | Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, cookie-parser                       |
| **Real-time**| Stream Chat (`stream-chat`, `stream-chat-react`), Stream Video (`@stream-io/video-react-sdk`) |
| **Deploy**   | Render (Express serves the built frontend in production)                                 |

---

## 📁 Project Structure

```
LiveSphere/
├── package.json            # Root scripts: build (installs both apps + builds frontend) & start
├── backend/
│   └── src/
│       ├── server.js       # Express app entry point
│       ├── controllers/    # auth, user, chat controllers
│       ├── middleware/     # protectRoute (JWT auth)
│       ├── models/         # User, FriendRequest (Mongoose)
│       ├── routes/         # /api/auth, /api/users, /api/chat
│       └── lib/            # MongoDB connection, Stream client
└── frontend/
    └── src/
        ├── pages/          # Home, Login, Signup, Onboarding, Notifications, Chat, Call
        ├── components/     # Layout, Navbar, Sidebar, FriendCard, ThemeSelector, ...
        ├── hooks/          # useAuthUser, useLogin, useSignup, useLogout
        ├── lib/            # Axios instance & API functions
        ├── store/          # Zustand theme store
        └── constants/      # Themes, languages, flags
```

---

## 🔧 Environment Variables

You need a [MongoDB](https://www.mongodb.com/atlas) database and a [Stream](https://getstream.io/) account (for the API key and secret).

### Backend (`backend/.env`)

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

> In development the frontend calls the API at `http://localhost:5001/api`, so keep `PORT=5001` locally. The backend exits on startup if `STREAM_API_KEY` or `STREAM_API_SECRET` is missing.

### Frontend (`frontend/.env`)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🖥️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/pavan77749/LiveSphere.git
cd LiveSphere
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev        # nodemon on http://localhost:5001
```

### 3. Start the frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev        # Vite on http://localhost:5173
```

Open http://localhost:5173 in your browser. The backend's CORS config allows this origin.

---

## 📦 Production Build

From the project root:

```bash
npm run build      # installs backend + frontend deps and builds frontend/dist
npm start          # starts the backend (node src/server.js)
```

When `NODE_ENV=production`, Express serves `frontend/dist` and routes all other requests to `index.html`, so the whole app runs as a single service (this is how it's deployed on Render).

---

## 📡 API Reference

All routes are prefixed with `/api`. 🔒 = requires authentication (JWT cookie).

### Auth (`/api/auth`)

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| POST   | `/signup`      | Create an account             |
| POST   | `/login`       | Log in                        |
| POST   | `/logout`      | Log out (clears cookie)       |
| POST   | `/onboarding`  | 🔒 Complete profile onboarding |
| GET    | `/me`          | 🔒 Get the current user        |

### Users (`/api/users`) 🔒

| Method | Endpoint                          | Description                          |
| ------ | --------------------------------- | ------------------------------------ |
| GET    | `/`                               | Recommended users                    |
| GET    | `/friends`                        | Your friends                         |
| POST   | `/friend-request/:id`             | Send a friend request                |
| PUT    | `/friend-request/:id/accept`      | Accept a friend request              |
| GET    | `/friend-requests`                | Incoming and accepted requests       |
| GET    | `/outgoing-friend-requests`       | Requests you've sent                 |

### Chat (`/api/chat`) 🔒

| Method | Endpoint  | Description                          |
| ------ | --------- | ------------------------------------ |
| GET    | `/token`  | Get a Stream token for chat & video  |

---

## ✨ Future Improvements

* 🔔 Push notifications
* 👥 Group chats and advanced group management
* 📱 Mobile app version
* 🌐 More language-learning tools

---

## 📜 License

This project is open source and free to use.
