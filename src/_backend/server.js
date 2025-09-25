import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

dotenv.config();  

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
   res.send("Welcome to Study Sphere Chatbot backend! Use POST /api/chat to chat.");
  try {
    const { messages = [] } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: "You are Study Sphere, a concise student helper." }],
        },
        ...messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      ],
      config: { thinkingConfig: { thinkingBudget: 0 } },
    });

    res.json({ reply: response.text });
  } catch (e) {
    console.error("Error interacting with Gemini API:", e);
    res.status(500).json({
      error: "Server error",
      details: process.env.NODE_ENV === 'development' ? e.stack : "An error occurred. Please try again later.",
    });
  }
});

// Move this outside the route handler, so the server starts immediately
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
