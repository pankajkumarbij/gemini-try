"use client";
import { useState, useEffect } from "react";
import run from "./utils/generativeAI";
import MarkdownViewer from "./components/markdownView/markdownViewer";

function HomePage() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    // Get AI response
    const { text, history } = await run(inputMessage);

    setChatHistory(history);

    // Clear the input field
    setInputMessage("");
  };

  return (
    <div className="w-[80%] mx-auto my-8">
      <div className="mb-4">
        {chatHistory.map((message, index) => {
          if (message?.role && message?.parts?.length)
            return (
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
            );
        })}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />

        <button
          onClick={handleSendMessage}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default HomePage;
