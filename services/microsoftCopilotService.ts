
// fix: Implement the analysis service using Google Gemini API.
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// The instructions say to use process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeWithCopilot = async (text: string): Promise<AnalysisResult> => {
  const model = "gemini-2.5-flash"; // A good model for this kind of task.

  const prompt = `Analyze the following document for regulatory compliance. 
  1. Reformat the text for clarity and professionalism, maintaining the original language.
  2. Provide a list of actionable suggestions to improve compliance.
  
  Return the result in JSON format.
  
  Document:
  ---
  ${text}
  ---
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      formattedText: {
        type: Type.STRING,
        description: 'The reformatted text of the document.'
      },
      suggestions: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: 'A list of suggestions to improve regulatory compliance.'
      }
    },
    required: ["formattedText", "suggestions"],
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonText);
    
    if (!result || typeof result.formattedText !== 'string' || !Array.isArray(result.suggestions)) {
      throw new Error("Invalid response format from AI model.");
    }
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the document.");
  }
};
