import React, { useEffect, useState } from 'react'
import { AxiosToken } from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../utils/context/useProfile'
import socket from '../../utils/context/socket'

const MessageAdmin = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { user } = useProfile()

  // 🔥 fetch users
  const fetchUsers = async () => {
    try {
      const res = await AxiosToken.get("/message/list")
      setUsers(res.data.users || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!user?.id) return

    socket.connect()
    socket.emit("join", user.id)

    // 🔥 listen new messages
    socket.on("receiveMessage", (data) => {
      setUsers(prev => {
        const exist = prev.find(u => u.user_id === data.user_id)

        // إذا user موجود → نبدلو last message
        if (exist) {
          return prev.map(u =>
            u.user_id === data.user_id
              ? { ...u, lastMessage: data.message }
              : u
          )
        }

        // إذا user جديد → نزيدوه
        return [
          {
            user_id: data.user_id,
            nom: "User",
            prenom: "",
            lastMessage: data.message
          },
          ...prev
        ]
      })
    })

    return () => {
      socket.off("receiveMessage")
      socket.disconnect()
    }
  }, [user?.id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Conversations
      </h1>

      {users.length === 0 ? (
        <p className="text-gray-500">
          Aucun message
        </p>
      ) : (
        <div className="space-y-3">

          {users.map(u => (
            <div
              onClick={() => navigate(`/admin/messages/${u.user_id}`)}
              key={u.user_id}
              className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <div className="font-semibold">
                {u.nom} {u.prenom}
              </div>

              <div className="text-sm text-gray-500">
                {u.lastMessage}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default MessageAdmin