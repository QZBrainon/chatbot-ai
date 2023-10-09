"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import userIcon from "../../public/user.png";
import botIcon from "../../public/bot.png";
import { useChat } from "ai/react";
import { useRef, useEffect } from 'react'

export default function Home() {

  const dialogElement = useRef<HTMLDivElement>(null)

  
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  const scrollToBottom = () => {
    const chatContainer = dialogElement.current!
    chatContainer.scrollTop = chatContainer?.scrollHeight 
  }
  
  useEffect(()=>{
    scrollToBottom()
  }, [messages] )

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Fale Conosco</CardTitle>
          <CardDescription>Como podemos ajudar?</CardDescription>
        </CardHeader>
        <CardContent ref={dialogElement} className="space-y-4 overflow-y-scroll scrollable">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                } items-start gap-2 text-slate-600 text-sm`}
              >
                {message.role === "user" && (
                  <Avatar className="min-w-fit">
                    <AvatarFallback>User</AvatarFallback>
                    <AvatarImage src={userIcon.src} />
                  </Avatar>
                )}

                {message.role === "assistant" && (
                  <Avatar className="min-w-fit">
                    <AvatarFallback>Bot</AvatarFallback>
                    <AvatarImage src={botIcon.src} />
                  </Avatar>
                )}
                <div className="relative inline-block bg-gray-200 p-3 rounded-lg">
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <form className="w-full gap-2 flex mt-4" onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua pergunta"
            />
            <Button type="submit">Enviar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
