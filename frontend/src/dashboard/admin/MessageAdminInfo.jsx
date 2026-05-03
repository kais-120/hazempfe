import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { AxiosToken } from "../../Api/Api"
import socket from "../../utils/context/socket"
import { useProfile } from "../../utils/context/useProfile"

const MessageAdminInfo = () => {
  const { id } = useParams() // user_id we're chatting with

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState("connecting...")
  const bottomRef = useRef()

  const { user } = useProfile() // Admin user
  const sentMessagesRef = useRef(new Set()) // 🔥 Track sent message text

  // 🔥 Fetch initial messages
  useEffect(() => {
    if (!id) return

    const fetchMessages = async () => {
      try {
        const res = await AxiosToken.get(`/message/${id}`)

        const formatted = res.data.messages.map(m => ({
          id: m.id,
          text: m.message,
          sender: m.type
        }))

        setMessages(formatted)
        console.log("Initial messages loaded:", formatted.length)

        const first = res.data.messages?.[0]
        if (first?.userMessage) {
          setName(first.userMessage.nom + " " + first.userMessage.prenom)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchMessages()
  }, [id])

  // 🔥 Socket connection
  useEffect(() => {
    if (!user?.id || !id) {
      console.log("Missing user or id:", { userId: user?.id, paramId: id })
      return
    }



    // Connect socket
    if (!socket.connected) {
      socket.connect()
    }

    // 🔥 Join the USER's room
    socket.emit("join", String(id))
    setStatus(`Connected - Room: ${id}`)

    // 🔥 Listen for receiveMessage
    const handleReceiveMessage = (data) => {
      if (String(data.user_id) !== String(id)) {
        console.log("✗ Message is for different user, ignoring")
        return
      }

      setMessages(prev => {
        if (sentMessagesRef.current.has(data.message) && data.type === "admin") {
          console.log("⚠ This is our sent message, skipping (already in UI)")
          sentMessagesRef.current.delete(data.message) // Clear it after matching
          return prev
        }

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
    console.log("Listener registered for receiveMessage")

    return () => {
      console.log("Cleaning up socket listener")
      socket.off("receiveMessage", handleReceiveMessage)
    }
  }, [id, user?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔥 Send message
  const sendMessage = async () => {
    if (!input.trim()) return

    const text = input

    console.log("Admin sending message:", text, "to user:", id)

    // 🔥 Mark this message text as sent (to ignore it when socket returns)
    sentMessagesRef.current.add(text)

    // Show immediately
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(), // Temp ID
        text,
        sender: "admin"
      }
    ])

    try {
      const res = await AxiosToken.post("/message/admin", {
        user_id: id,
        message: text
      })
      console.log("Message sent successfully:", res.data)
    } catch (err) {
      console.error("Error sending message:", err)
      setMessages(prev => prev.filter(m => m.text !== text || m.sender !== "admin"))
      sentMessagesRef.current.delete(text)
    }

    setInput("")
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border">
      {/* HEADER */}
      <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
        <div>
          <div>Conversation avec {name || "Utilisateur"}</div>
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
            className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "admin"
                  ? "bg-blue-500 text-white"
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
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Écrire un message..."
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

export default MessageAdminInfo