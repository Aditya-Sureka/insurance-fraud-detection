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
    console.log('Attempting to call OpenAI API with key:', OPENAI_API_KEY ? 'Key present' : 'Key missing');

    if (!OPENAI_API_KEY) {
      console.warn('No API key available, using fallback response');
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

    const content = response.choices[0].message.content;
    console.log('Successfully received OpenAI response');
    return content || getFallbackResponse(message);
  } catch (error: any) {
    // Log detailed error information
    console.error("Error getting chatbot response:", {
      error,
      status: error?.status,
      message: error?.message,
      type: error?.type,
      code: error?.code
    });

    // If we hit rate limits, wait briefly and retry once
    if (error?.status === 429) {
      try {
        console.log('Rate limited, waiting 2s before retry...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const retryResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          temperature: 0.7,
          max_tokens: 500
        });
        return retryResponse.choices[0].message.content || getFallbackResponse(message);
      } catch (retryError) {
        console.error("Retry also failed:", retryError);
        return getFallbackResponse(message);
      }
    }

    return getFallbackResponse(message);
  }
}