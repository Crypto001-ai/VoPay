import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for parsing transaction intent (Secure Server-side)
  app.post("/api/parse", async (req, res) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Parse the following transaction intent and return a JSON object with the following structure:
        {
          "recipient": "string (name or address)",
          "amount": "string (numeric value)",
          "token": "string (USDC, SOL, etc.)",
          "riskLevel": "Safe | Medium Risk | High Risk",
          "explanation": "short human-readable explanation",
          "recommendation": "Safe to proceed | Proceed with caution | DO NOT SIGN"
        }

        Input: "${text}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipient: { type: Type.STRING },
              amount: { type: Type.STRING },
              token: { type: Type.STRING },
              riskLevel: { type: Type.STRING },
              explanation: { type: Type.STRING },
              recommendation: { type: Type.STRING }
            },
            required: ["recipient", "amount", "token", "riskLevel", "explanation", "recommendation"]
          }
        }
      });

      const result = JSON.parse(response.text);
      res.json(result);
    } catch (error: any) {
      console.error("AI Parse Error:", error);
      res.status(500).json({ 
        error: "Failed to parse transaction intent",
        message: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
