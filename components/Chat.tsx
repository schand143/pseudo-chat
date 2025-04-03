import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: "user", text: message }, { role: "ai", text: "Processing..." }]);
    setMessage("");

    setTimeout(() => {
      setChatHistory((prev) =>
        prev.map((msg, index) =>
          msg.text === "Processing..." ? { ...msg, text: `AI Response for: ${message}` } : msg
        )
      );
    }, 1500);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">AI Chat</h2>

      <div className="h-64 bg-gray-100 p-4 rounded-lg overflow-y-auto border">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`mb-3 p-3 rounded-lg w-fit ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300 text-black self-start mr-auto"}`}>
              {msg.role === "user" ? "👤 You: " : "🤖 AI: "} {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Type your pseudo-code..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-5 py-3 rounded-r-lg hover:bg-green-700 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
