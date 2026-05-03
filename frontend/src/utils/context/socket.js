import { io } from "socket.io-client"

const socket = io("http://localhost:5000", {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})

// 🔥 Socket event listeners for debugging
socket.on("connect", () => {
  console.log("✓ Socket connected:", socket.id)
})

socket.on("disconnect", () => {
  console.log("✗ Socket disconnected")
})

socket.on("connect_error", (error) => {
  console.log("✗ Socket connection error:", error)
})

socket.on("error", (error) => {
  console.log("✗ Socket error:", error)
})

export default socket