"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MessageCircle } from "lucide-react"

interface Message {
  id: string
  message: string
  user_id: string
  created_at: string
  user_email: string
  user_name: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      fetchMessages()
      subscribeToMessages()
    }
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          message,
          user_id,
          created_at,
          user_email,
          user_name
        `)
        .order("created_at", { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages((prev) => [...prev, newMessage])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setSending(true)

    try {
      const { error } = await supabase.from("messages").insert([
        {
          message: newMessage.trim(),
          user_id: user?.id,
          user_email: user?.email,
          user_name: user?.user_metadata?.full_name || user?.email?.split("@")[0],
        },
      ])

      if (error) throw error

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Team Messages</h1>
            <p className="text-gray-600 mt-2">Communicate with your team in real-time</p>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Team Chat
              </CardTitle>
              <CardDescription>Real-time messaging for your supply management team</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-96">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-600">Start the conversation by sending the first message</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-xs lg:max-w-md ${
                          message.user_id === user?.id ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{getInitials(message.user_name)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`mx-2 px-4 py-2 rounded-lg ${
                            message.user_id === user?.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.user_id === user?.id ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {message.user_id === user?.id ? "You" : message.user_name} •{" "}
                            {formatTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={sending}
                  className="flex-1"
                />
                <Button type="submit" disabled={sending || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
