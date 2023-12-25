"use client";
import { useState, useEffect } from "react";
import MarkdownViewer from "./components/markdownView/markdownViewer";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatHistory({ chatHistory }) {
  return (
    <div>
      {chatHistory.map((message, index) => (
        <div key={index}>
          {message?.role}:
          {message?.role === "user" ? (
            <div className="bg-gray-200 px-2">
              <p>{message?.parts[0]?.text}</p>
            </div>
          ) : (
            <MarkdownViewer markdown={message?.parts[0]?.text} />
          )}
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatAnswers, setChatAnswers] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_STUDIO_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  async function run(msg) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(msg);

    for await (const chunk of result.stream) {
      // Update the last user message with the streaming AI response
      setChatHistory((prevState) => {
        const updatedHistory = [...prevState];
        const lastUserMessage = updatedHistory[updatedHistory.length - 1];
        lastUserMessage.parts[0].text += chunk.text();
        return updatedHistory;
      });
    }
  }

  const handleSendMessage = async (msg) => {
    // Update chat history with user message
    setChatHistory((prevState) => [
      ...prevState,
      { role: "user", parts: [{ text: msg }] },
      { role: "model", parts: [{ text: "" }] },
    ]);

    // Clear the input field
    setInputMessage("");

    // Get AI response
    await run(msg);
  };

  return (
    <div>
      <div className="mt-6 mb-20 w-[80%] mx-auto">
        <ChatHistory chatHistory={chatHistory.concat(chatAnswers)} />
      </div>

      <div className="flex fixed bottom-4 justify-center w-[100%]">
        <div className="flex w-[80%]">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />

          <button
            onClick={() => handleSendMessage(inputMessage)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
