import React, { useState } from "react";
import {
  Maximize2,
  Minimize2,
  Send,
  MessageSquare,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! How can I assist you with oncology-related questions today?",
    sender: "ai",
    timestamp: new Date(),
  },
  {
    id: "2",
    content: "Can you help me find treatment guidelines for breast cancer?",
    sender: "user",
    timestamp: new Date(),
  },
  {
    id: "3",
    content:
      "I can help you with that. The latest breast cancer treatment guidelines include several key recommendations...",
    sender: "ai",
    timestamp: new Date(),
  },
];

const AIChatbot = ({
  isOpen = true,
  onClose = () => {},
  messages = defaultMessages,
  onSendMessage = () => {},
}: AIChatbotProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 h-12 px-6 font-semibold shadow-lg
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600
          text-white transition-all duration-300 animate-pulse hover:animate-none
          rounded-full z-50"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        AI Assistant
      </Button>
    );
  }

  return (
    <Card
      className={`fixed ${isExpanded ? "inset-4" : "bottom-4 right-4 w-[380px] h-[500px]"} 
        bg-white shadow-xl transition-all duration-300 flex flex-col z-50`}
    >
      <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground">
        <h2 className="font-semibold">AI Assistant</h2>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="text-primary-foreground hover:text-primary-foreground/90"
            >
              <MinusCircle size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-foreground hover:text-primary-foreground/90"
            >
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <Send size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatbot;
