# 💬 Real-Time Chat App (MERN + Socket.IO)

Modern **real-time chat application** built with **React (Vite)** + **Node.js/Express** + **Socket.IO**  
Featuring secure authentication, online status, and cloud image upload support.

---

## 🚀 Live Features

- 🔐 JWT Authentication
- 💬 Real-time messaging with Socket.IO
- 🟢 Online / offline user status
- 👤 User Profile pictures (Cloudinary)
- 📱 Responsive design (mobile-first)
- ⚡ Fast Vite development experience
- 🌙 Scalable MERN architecture

---

## 🛠️ Tech Stack

### Frontend

- React 18 + Vite
- React Context API
- Tailwind CSS
- Socket.IO client
- Axios

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (with proper rooms/namespaces)
- JWT + refresh tokens
- Cloudinary for image uploads
- express-rate-limit + helmet, cors

---

## 🚀 Quick Start (Local)

```bash
# Clone & enter project
git clone https://github.com/yourusername/chat-app.git
cd chat-app

# ── Backend ───────────────────────────────────────
cd server
npm install
cp .env.example .env          # ← fill it!
npm run server               # or npm start

# ── Frontend (open second terminal) ───────────────
cd client
npm install
cp .env.example .env          # ← fill API url
npm run dev
```

Open http://localhost:5173

---

## 📂 Project Structure

```bash
chat-app/
├── client/          # React frontend (Vite)
│   ├── context/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   └── pages/
├── server/          # Node.js backend (Express)
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## ⚙️ Socket.IO Implementation

Current main events:

```bash
// Client emits
socket.emit('message', { content, to })
socket.emit('typing', receiverId)
socket.emit('join', userId)

// Server listens & broadcasts
io.on('connection', (socket) => {
  socket.on('message', handleNewMessage)
  socket.on('typing', handleTyping)
  // user online/offline handling with disconnect event
})
```

---

## ✨ Key Highlights (Recruiter Section)

- Built a **real-time system** using WebSockets (Socket.IO)
- Implemented **secure JWT authentication**
- Used **React Context API** for global state management
- Designed **REST APIs** alongside real-time events
- Followed **production-ready project structure**
- Environment-based configuration using `.env` files

---

## 📦 Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

## 🧪 Setup (Local Development)

#### 1️⃣ Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

---

#### 2️⃣ Environment Variables

### 🔹 Backend (server/.env)

```env
# server/.env.example
MONGODB_URI =  your_mongodb_connection_string
PORT = 5000 / your_preferred_port_number
JWT_SECRET = your_jwt_secret_key

CLOUDINARY_CLOUD_NAME= 'your_cloudinary_cloud_name'
CLOUDINARY_API_KEY= 'your_cloudinary_api_key'
CLOUDINARY_API_SECRET= 'your_cloudinary_api_secret'

```

### 🔹 Frontend (client/.env)

```env
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files to GitHub.

---

#### 3️⃣ Run the app

```bash
# Start backend
cd server
npm run server

# Start frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🏗️ Build for Production

```bash
cd client
npm run build
```

---

## 🧠 What I Learned

1. Implemented real-time communication using Socket.IO
2. Managed global state efficiently with React Context API
3. Built secure authentication using JWT
4. Structured a scalable MERN-stack application
5. Combined REST APIs with real-time systems
6. Used environment variables for security and flexibility

---

## 📈 Future Improvements

- Typing indicators + "seen" status
- Message reactions (😀, 😂, etc)
- Group chats & channels
- Read / delivered receipts
- Message search & pinning
- Voice messages / attachments
- End-to-end encryption (very advanced showcase)

---

## 🤝 Contributing

Contributions are welcome!

- Fork the repository
- Create a new branch
- Commit your changes
- Open a Pull Request

---

## 📄 License

MIT

---

## ❤️ Show some love

If you find this project useful → please star the repository! ⭐🌟✨
