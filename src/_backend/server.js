import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
console.log("Google API Key Loaded:", process.env.GOOGLE_API_KEY ? "✅ Yes" : "❌ No");

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
          parts: [{
            text: "You are Study Sphere, a concise and structured student assistant. Rules: 1. Reply ONLY to study- related questions. 2. Politely redirect if the topic is unrelated to studies. 3. ALWAYS reply in clean bullet points(use '-' or '1', '2.', etc.). 4. Do NOT use asterisks(*), bold(**), or italics. 5. Do NOT write full paragraphs — only short, clear points. 6. Example output: - Point one- Point two - Point three" }],
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
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
