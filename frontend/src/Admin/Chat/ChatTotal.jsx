import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function ChatTotal({ role }) {
  // Déterminer l'interlocuteur en fonction du rôle
  const recipient = role === "CDC" ? "DREF" : "CDC";

  // Messages initiaux en fonction du rôle
  const initialMessages = {
    CDC: [
      { text: "Bonjour, DREF!", sender: "me" },
      { text: "Salut CDC, comment ça va ?", sender: "other" },
    ],
    DREF: [
      { text: "Salut CDC, tout va bien ?", sender: "me" },
      { text: "Oui, merci DREF!", sender: "other" },
    ],
  };

  // État des messages selon le rôle
  const [messages, setMessages] = useState(initialMessages[role] || []);
  const [input, setInput] = useState("");

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput("");

      // Simuler une réponse automatique après 1 seconde
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `Réponse automatique de ${recipient}`, sender: "other" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 sm:ml-64">
      {/* Sidebar (Liste des conversations) */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="flex items-center p-3 bg-orange-500 text-white rounded-lg cursor-pointer">
          <FaUserCircle size={40} className="mr-2" />
          <div>
            <h3 className="font-semibold">{recipient}</h3>
            <p className="text-sm">Dernier message...</p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-3/4 h-full">
        <div className="bg-white p-4 border-b border-gray-300 text-center font-bold text-lg">
          Chat avec {recipient}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                msg.sender === "me"
                  ? "bg-gray-300 text-black self-start"
                  : "bg-orange-500 self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 flex items-center border-t border-gray-300 bg-white">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Écrire un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="ml-2 p-2 bg-orange-500 text-white rounded-lg">
            <IoSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
