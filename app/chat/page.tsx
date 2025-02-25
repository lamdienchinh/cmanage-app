"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = {
  id: string
  content: string
  sender: {
    name: string
    avatar: string
  }
  timestamp: Date
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey team, how's the progress on the dashboard?",
    sender: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    timestamp: new Date("2024-02-25T10:00:00"),
  },
  {
    id: "2",
    content: "I've completed the sidebar navigation",
    sender: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
    timestamp: new Date("2024-02-25T10:05:00"),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("general")

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: "John Doe",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Chat</h1>
          <p className="text-muted-foreground">Communicate with your team members</p>
        </div>
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 overflow-y-auto rounded-lg border p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>
                  {message.sender.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit">
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </form>
    </div>
  )
}

