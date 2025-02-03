import OpenAI from "openai";
import { getFallbackResponse } from "./chatbot-fallback";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key is missing. Please ensure VITE_OPENAI_API_KEY is set in your environment.');
}

const openai = new OpenAI({ 
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Allow client-side usage
});

export async function getChatbotResponse(message: string, context: string = ""): Promise<string> {
  try {
    if (!OPENAI_API_KEY) {
      return getFallbackResponse(message);
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert AI assistant specializing in insurance fraud detection and prevention. 
          Your role is to help users understand and prevent insurance fraud, answer their questions about fraud detection,
          and provide guidance on best practices. Always maintain a professional and helpful tone.
          Keep responses concise and focused on insurance fraud topics.
          ${context}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || getFallbackResponse(message);
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return getFallbackResponse(message);
  }
}