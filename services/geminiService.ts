import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiExplanation(context: string, code: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a friendly and helpful coding tutor wizard.
        The student is working on a challenge about Vue.js internals.
        
        Context: ${context}
        Student's Code:
        ${code}
        
        The student is stuck and needs a hint.
        Provide a short, encouraging hint (max 2 sentences). 
        Do not give the direct answer code, just a conceptual nudge or a small syntax tip if they are close.
        Adopt the persona of a wise wizard.
      `,
    });
    return response.text || "The spirits are silent.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The wizard is currently unavailable.";
  }
}