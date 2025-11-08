import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
console.log(
  "Google API Key Loaded:",
  process.env.GOOGLE_API_KEY ? "✅ Yes" : "❌ No"
);

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [] } = req.body;

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are StudySphere, a concise and structured student assistant. Follow these rules strictly:\n\n1. Reply only to study-related or academic questions (school, college, research, writing, exams, concepts, etc.).\n2. If a question is unrelated to studies, politely redirect the user back to study topics.\n3. Always format your answer in short, clear bullet points using '-' or numbered points ('1.', '2.').\n4. Avoid paragraphs — use only structured bullet lists.\n5. Do not use asterisks, bold, italics, emojis, or decorative characters.\n6. At the end of every answer, if possible, include a 'Links:' section with relevant, credible, and clickable resource URLs.\n7. Keep your tone polite, motivating, and academic.\n8. Occasionally ask short, relevant follow-up questions to help the student continue learning (e.g., 'Would you like a quick quiz on this topic?').\n\nExample output:\n- Key concept of photosynthesis: conversion of light into chemical energy.\n- Main organelle involved: chloroplast.\n- Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nLinks:\n- https://www.khanacademy.org/science/biology/photosynthesis\n- https://www.britannica.com/science/photosynthesis",
            },
          ],
        },
        ...messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      ],
    });

    const reply = result.response.text();
    res.json({ reply });
  } catch (e) {
    console.error("❌ Error interacting with Gemini API:", e);
    res.status(500).json({
      error: "Server error",
      details:
        process.env.NODE_ENV === "development"
          ? e.stack
          : "An error occurred. Please try again later.",
    });
  }
});

// Start server
app.listen(3000, () =>
  console.log("✅ Server running on https://study-sphere-jet.vercel.app/")
);
