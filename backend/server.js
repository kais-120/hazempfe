const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const appStart = require("./app")
const sequelize = require("./config/db")
const path = require("path")
const { Server } = require("socket.io")
const http = require("http")
const jwt = require("jsonwebtoken")

require("./model/index")

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

// 🔥 CRITICAL: Make io global so controllers can access it
global.io = io

// 🔥 Socket.io middleware to verify token (optional for testing)
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  
  console.log("Socket auth attempt:", {
    socketId: socket.id,
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + "..." : "none"
  })

  if (!token) {
    console.log("⚠ No token provided, allowing connection anyway")
    socket.userId = "unknown"
    socket.userRole = "user"
    return next()
  }

  try {
    // 🔥 Try to verify with different possible secrets
    let decoded
    const secrets = [
      process.env.JWT_SECRET,
      "your-secret-key",
      "secret"
    ]

    for (let secret of secrets) {
      try {
        decoded = jwt.verify(token, secret)
        console.log(`✓ Token verified with secret: ${secret ? "env" : "default"}`)
        break
      } catch (e) {
        // Try next secret
      }
    }

    if (decoded) {
      socket.userId = decoded.id
      socket.userRole = decoded.role || "user"
      console.log(`✓ Socket auth successful: user ${socket.userId}`)
      return next()
    } else {
      throw new Error("Token verification failed with all secrets")
    }
  } catch (err) {
    console.log("⚠ Token verification failed:", err.message)
    // Allow connection anyway for testing
    socket.userId = "unknown"
    socket.userRole = "user"
    next()
  }
})

// 🔥 Socket.io connection handler
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, "User ID:", socket.userId)

  // Handle join event
  socket.on("join", (userId) => {
    socket.join(String(userId))
    console.log(`✓ Socket joined room: ${userId}`)
  })

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id)
  })

  // Handle errors
  socket.on("error", (error) => {
    console.log("⚠ Socket error:", error)
  })
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// 🔥 Initialize database
sequelize.sync({ alter: true })

sequelize.authenticate()
  .then(() => console.log("✓ PostgreSQL Connected"))
  .catch(err => console.error("✗ DB Error:", err))

app.use("/api", appStart)

server.listen(5000, () => {
  console.log("✓ Server running on port 5000")
  console.log("✓ Socket.io ready")
})

module.exports = { server, io }