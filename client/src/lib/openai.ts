import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
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
      return "Chat functionality is currently unavailable. Please try again later.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try asking your question differently.";
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I apologize, but I'm having trouble connecting to the AI service. Please try again later.";
  }
}