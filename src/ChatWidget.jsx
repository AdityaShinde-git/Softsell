import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const EXAMPLES = [
  "How do I sell my license?",
  "Is my software eligible?",
  "How long does payment take?",
  "How secure is the process?",
];

const MOCK_RESPONSES = {
  "How do I sell my license?":
    "Just click 'Sell My Licenses', upload your details, and we'll handle the rest!",
  "Is my software eligible?":
    "Most commercial software is eligible. Contact us with your details for a quick check.If you are blessed with eyes you can also determine if it's eligible or not.",
  "How long does payment take?":
    "Payment is usually processed within 24 hours after agreement.",
  "How secure is the process?":
    "We use encrypted channels and never share your data with third parties.Trust the Almighty.",
};

export default function ChatWidget({ openAIApiKey }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text) {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);
    let aiResponse = "";

    if (openAIApiKey) {
      try {
        const res = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful support agent for a software license resale platform." },
              ...messages.map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
              })),
              { role: "user", content: text },
            ],
            max_tokens: 100,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openAIApiKey}`,
            },
          }
        );
        aiResponse = res.data.choices[0].message.content.trim();
      } catch (err) {
        aiResponse = "Sorry, I'm having trouble connecting right now.";
      }
    } else {
      aiResponse = MOCK_RESPONSES[text] || "I'm here to help! Please ask another question.";
    }

    setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    setLoading(false);
  }

  function handleExampleClick(q) {
    sendMessage(q);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl border-4 border-white/70 focus:outline-none transition-all duration-300"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-80 max-w-[95vw] rounded-2xl shadow-2xl border border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg flex flex-col overflow-hidden animate-fade-in"
             style={{ height: "440px" }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 flex justify-between items-center">
            <span className="font-bold tracking-wide">AI Chat</span>
            <button onClick={() => setOpen(false)} className="text-white text-2xl hover:text-gray-200 transition-colors">&times;</button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-transparent scrollbar-thin scrollbar-thumb-blue-200">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow ${
                  m.sender === "user"
                    ? "ml-auto bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-none"
                    : "mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 rounded-bl-none border border-blue-100"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-xl text-sm border border-blue-100 animate-pulse">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Example Questions */}
          <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-200 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
            {EXAMPLES.map((q) => (
              <button
                key={q}
                onClick={() => handleExampleClick(q)}
                className="bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 hover:from-blue-200 hover:to-purple-200 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm transition"
              >
                {q}
              </button>
            ))}
          </div>
          {/* Input */}
          <form onSubmit={handleSubmit} className="flex px-3 py-2 border-t border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Type your question..."
              autoFocus
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
              disabled={!input.trim() || loading}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* CSS for fade-in animation and custom scrollbar */}
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #c7d2fe;
          border-radius: 6px;
        }
      `}</style>
    </>
  );
}
