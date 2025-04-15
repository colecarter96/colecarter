"use client";

import { useState } from "react";

export default function FirestoreInput() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("/api/firestore-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Success! Document ID: " + data.id);
      } else {
        setStatus("Error: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div>
      <input
        className="border px-2 py-1 rounded mr-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSend}
      >
        Send to Firestore
      </button>
      <div className="mt-2 text-sm">{status}</div>
    </div>
  );
} 