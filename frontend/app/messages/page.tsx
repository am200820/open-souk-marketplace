'use client'

import { useState, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'

interface Message {
  _id: string
  sender: { name: string }
  receiver: { name: string }
  content: string
  createdAt: string
  isRead: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setMessages(data.data || [])
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedUser) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ receiver: selectedUser, content: newMessage })
      })

      const data = await response.json()
      if (data.success) {
        setMessages([...messages, data.data])
        setNewMessage('')
      }
    } catch (error) {
      console.error('خطأ:', error)
    }
  }

  if (loading) return <p className="text-center py-8">جاري التحميل...</p>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">💬 الرسائل</h1>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 md:col-span-1">
            <h3 className="font-bold mb-4">المحادثات</h3>
            {messages.length === 0 ? (
              <p className="text-gray-600">لا توجد رسائل</p>
            ) : (
              <div className="space-y-2">
                {messages.map((msg) => (
                  <button
                    key={msg._id}
                    onClick={() => setSelectedUser(msg.sender._id)}
                    className="w-full text-right p-2 hover:bg-gray-100 rounded transition"
                  >
                    <p className="font-semibold text-sm">{msg.sender.name}</p>
                    <p className="text-gray-600 text-xs truncate">{msg.content}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:col-span-3">
            {selectedUser ? (
              <div className="flex flex-col h-96">
                <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                  {messages
                    .filter((m) => m.sender._id === selectedUser || m.receiver._id === selectedUser)
                    .map((msg) => (
                      <div
                        key={msg._id}
                        className={`p-3 rounded-lg max-w-xs ${
                          msg.sender._id === selectedUser
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-primary text-white ml-auto'
                        }`}
                      >
                        {msg.content}
                      </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="اكتب رسالة..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    <FiSend />
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">اختر محادثة</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}