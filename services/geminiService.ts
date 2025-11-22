import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiExplanation = async (topic: string, userCode: string): Promise<string> => {
  try {
    const prompt = `
      You are a helpful coding tutor for a Vue.js internal implementation course.
      The student is stuck on a challenge about: "${topic}".
      
      Here is their current code:
      \`\`\`javascript
      ${userCode}
      \`\`\`
      
      Please provide a short, helpful hint (max 2 sentences) to guide them towards the correct implementation without giving away the full answer directly.
      Focus on the logic or syntax they might be missing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate a hint right now. Try reviewing the previous reading section!";
  } catch (error) {
    console.error("Error fetching hint from Gemini:", error);
    return "The wizard is currently offline (API Error). Check your internet or API key.";
  }
};