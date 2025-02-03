import OpenAI from "openai";

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

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try asking your question differently.";
  } catch (error) {
    console.error("Error getting chatbot response:", error);

    // Check if it's a quota exceeded error
    if (error?.status === 429) {
      return "I apologize, but our AI service is currently experiencing high demand. Please try again later or contact support for assistance with your fraud-related questions.";
    }

    // For model-related errors
    if (error?.error?.code === "model_not_found") {
      return "I apologize, but there's a temporary issue with our AI service. In the meantime, you can find fraud prevention resources in our Education Center.";
    }

    // Generic error
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
  }
}