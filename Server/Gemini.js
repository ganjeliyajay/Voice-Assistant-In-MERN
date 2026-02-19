import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const geminiResponse = async (command, assistantName) => {
  try {
    const apiUrl = process.env.GEMINI_URL;
    const author = "Ganjeliya Jay";

    if (!apiUrl) {
      throw new Error("GEMINI_URL not found in .env");
    }

    const prompt = `
You are a virtual assistant named ${assistantName} created by ${author}.
You are not Google. You behave like a voice-enabled assistant.

Respond ONLY in this JSON format:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<clean user input>",
  "response": "<short spoken reply>"
}

Important:
- If someone asks who created you, say ${author}.
- Only respond with JSON.
- Keep response short.

User Input: ${command}
`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        timeout: 10000,
      }
    );

    const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty Gemini response");
    }

    return text;
  } catch (error) {
    console.error("🔥 Gemini API Error:", error.response?.data || error.message);

    // Handle Rate Limit
    if (error.response?.status === 429) {
      return JSON.stringify({
        type: "general",
        userInput: command,
        response: "Too many requests. Please wait a few seconds."
      });
    }

    // Handle other errors
    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "Assistant is temporarily unavailable."
    });
  }
};
