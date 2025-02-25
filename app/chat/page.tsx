"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey team! How's the project going?",
    sender: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    timestamp: new Date("2024-02-25T10:00:00"),
  },
  {
    id: "2",
    content: "Making good progress on the frontend!",
    sender: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
    timestamp: new Date("2024-02-25T10:05:00"),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: "Current User",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Team Chat</h1>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={message.sender.avatar} />
                  <AvatarFallback>
                    {message.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Card className="flex-1 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.sender.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1">{message.content}</p>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
