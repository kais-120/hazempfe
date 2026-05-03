const { body, validationResult } = require("express-validator");
const { User } = require("../model");
const Message = require("../model/Message");

// 🔥 USER sends a message
exports.createMessage = [
  body("message").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { message } = req.body
      const userId = req.userId

      console.log(`\n📨 USER MESSAGE`)
      console.log(`User ${userId} sending: "${message}"`)

      const newMsg = await Message.create({
        message,
        user_id: userId,
        type: "user"
      })

      console.log(`✓ Saved to DB, message ID: ${newMsg.id}`)

      // 🔥 EMIT TO SOCKET
      if (!global.io) {
        console.log("❌ ERROR: global.io is not defined")
        return res.json({ message: "sent (no socket)" })
      }

      console.log(`🔥 Emitting to room: ${userId}`)
      
      const messageData = {
        id: newMsg.id,
        message: newMsg.message,
        user_id: String(userId),
        type: "user"
      }

      console.log(`📤 Broadcast data:`, messageData)
      global.io.to(String(userId)).emit("receiveMessage", messageData)
      console.log(`✓ Emitted to room ${userId}\n`)

      return res.json({ message: "sent", data: newMsg })
    } catch (err) {
      console.log("❌ ERROR:", err)
      return res.status(500).json({ message: "error" })
    }
  }
]

// 🔥 ADMIN sends a message
exports.createMessageAdmin = [
  body("message").notEmpty(),
  body("user_id").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { message, user_id } = req.body

      console.log(`\n💬 ADMIN MESSAGE`)
      console.log(`Admin sending to user ${user_id}: "${message}"`)

      const newMsg = await Message.create({
        message,
        user_id,
        type: "admin"
      })

      console.log(`✓ Saved to DB, message ID: ${newMsg.id}`)

      // 🔥 EMIT TO SOCKET
      if (!global.io) {
        console.log("❌ ERROR: global.io is not defined")
        return res.json({ message: "message sent (no socket)" })
      }

      console.log(`🔥 Emitting to room: ${user_id}`)

      const messageData = {
        id: newMsg.id,
        message: newMsg.message,
        type: "admin",
        user_id: String(user_id)
      }

      console.log(`📤 Broadcast data:`, messageData)
      global.io.to(String(user_id)).emit("receiveMessage", messageData)
      console.log(`✓ Emitted to room ${user_id}\n`)

      return res.json({ message: "message sent", data: newMsg })
    } catch (err) {
      console.log("❌ ERROR:", err)
      return res.status(500).json({ message: "error server" })
    }
  }
]

// Get messages for current user
exports.getUserMessage = async (req, res) => {
  try {
    const userId = req.userId
    const messages = await Message.findAll({
      where: { user_id: userId },
      order: [["createdAt", "ASC"]]
    })
    return res.json({ message: "list messages", messages })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error server" })
  }
}

// Get list of users with messages (for admin dashboard)
exports.getListMessage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        {
          model: User,
          as: "userMessage",
          attributes: ["id", "nom", "prenom"]
        }
      ],
      order: [["createdAt", "DESC"]]
    })

    const usersMap = {}

    messages.forEach(m => {
      if (!usersMap[m.user_id]) {
        usersMap[m.user_id] = {
          user_id: m.user_id,
          nom: m.userMessage.nom,
          prenom: m.userMessage.prenom,
          lastMessage: m.message
        }
      }
    })

    const users = Object.values(usersMap)

    return res.json({ message: "list messages", users })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error server" })
  }
}

// Get all messages with a specific user (for admin viewing conversation)
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params
    const messages = await Message.findAll({
      where: { user_id: id },
      include: [
        {
          model: User,
          as: "userMessage",
          attributes: ["nom", "prenom"]
        }
      ],
      order: [["createdAt", "ASC"]]
    })
    return res.json({ message: "list messages", messages })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error server" })
  }
}