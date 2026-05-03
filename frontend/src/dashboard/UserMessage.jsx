import React, { useEffect, useState, useRef } from "react"
import { AxiosToken } from "../Api/Api"
import { useProfile } from "../utils/context/useProfile"
import socket from "../utils/context/socket"

const UserMessage = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("connecting...")
  const { user } = useProfile()
  const bottomRef = useRef()
  const sentMessagesRef = useRef(new Set()) // 🔥 Track sent message text

  // 🔥 Fetch old messages
  useEffect(() => {
    if (!user?.id) return

    const fetchMessages = async () => {
      try {
        const res = await AxiosToken.get("/message/user")
        const formatted = res.data.messages.map(m => ({
          id: m.id,
          text: m.message,
          sender: m.type
        }))
        setMessages(formatted)
        console.log("User initial messages loaded:", formatted.length)
      } catch (err) {
        console.log(err)
      }
    }

    fetchMessages()
  }, [user?.id])

  // 🔥 Socket connection
  useEffect(() => {
    if (!user?.id) {
      console.log("No user ID yet")
      return
    }

    console.log("==== SOCKET SETUP (User) ====")
    console.log("User ID:", user.id)

    // Connect
    if (!socket.connected) {
      socket.connect()
      console.log("Socket connected:", socket.id)
    }

    // 🔥 Join user's room
    socket.emit("join", String(user.id))
    console.log(`User joined room: ${user.id}`)
    setStatus(`Connected - Room: ${user.id}`)

    // 🔥 Listen for messages
    const handleReceiveMessage = (data) => {
      console.log("=== User receiveMessage fired ===")
      console.log("Received:", data)
      console.log("Is this our sent message?", sentMessagesRef.current.has(data.message))

      setMessages(prev => {
        // 🔥 Check if this exact message text already exists from us
        if (sentMessagesRef.current.has(data.message) && data.type === "user") {
          console.log("⚠ This is our sent message, skipping (already in UI)")
          sentMessagesRef.current.delete(data.message) // Clear it after matching
          return prev
        }

        // 🔥 Also check if message ID already exists
        const existsById = prev.some(m => m.id === data.id)
        if (existsById) {
          console.log("⚠ Message ID already exists, skipping")
          return prev
        }

        console.log("✓ Adding new message to state")
        return [
          ...prev,
          {
            id: data.id,
            text: data.message,
            sender: data.type
          }
        ]
      })
    }

    socket.on("receiveMessage", handleReceiveMessage)
    console.log("User listener registered")

    return () => {
      console.log("Cleaning up user socket listener")
      socket.off("receiveMessage", handleReceiveMessage)
    }
  }, [user?.id])

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔥 Send message
  const sendMessage = async () => {
    if (!input.trim()) return

    const text = input

    console.log("User sending message:", text)

    // 🔥 Mark this message text as sent (to ignore it when socket returns)
    sentMessagesRef.current.add(text)

    // Show immediately
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(), // Temp ID
        text,
        sender: "user"
      }
    ])

    try {
      const res = await AxiosToken.post("/message/user", {
        message: text
      })
      console.log("User message sent:", res.data)
    } catch (err) {
      console.error("Error:", err)
      setMessages(prev => prev.filter(m => m.text !== text || m.sender !== "user"))
      sentMessagesRef.current.delete(text)
    }

    setInput("")
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border">
      {/* HEADER */}
      <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
        <div>
          <div>Messagerie Admin</div>
          <div className="text-xs mt-1">{status}</div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Aucun message</p>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-green-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Écrire un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default UserMessage