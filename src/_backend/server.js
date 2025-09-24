import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
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
    console.error(e);
    res.status(500).json({ error: "Server error", details: String(e) });
  }
});

app.listen(3000, () =>
  console.log("Study Sphere (Gemini) on http://localhost:3000")
);
