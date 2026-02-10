
import { GoogleGenAI, Type } from "@google/genai";
import { RiverMetric, Prescription } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiPrescription = async (latestData: RiverMetric): Promise<Prescription> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 'River Prescription' based on the following data for the Barak River:
      Dissolved Oxygen: ${latestData.do}
      pH Level: ${latestData.ph}
      Water Temp: ${latestData.temp}
      Community Mood: ${latestData.mood}
      Meditation Count: ${latestData.meditation}
      Dharma Score: ${latestData.dharma}
      
      The prescription should include a specific action, a message, a priority level (low, medium, high), and optionally a mantra or technical advice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            message: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
            mantra: { type: Type.STRING },
            technical: { type: Type.STRING },
            duration: { type: Type.STRING },
          },
          required: ["action", "message", "priority"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as Prescription;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      action: "System Recalibration",
      message: "AI analysis currently unavailable. Perform standard morning arati.",
      priority: "medium",
      mantra: "Om Shanti"
    };
  }
};

export const getVedicInsight = async (metric: RiverMetric): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short, 1-sentence Vedic insight or traditional wisdom based on a river health integrated score of ${metric.dharma}/100 and DO level of ${metric.do}. Focus on the connection between water and spirit.`,
    });
    return response.text.trim();
  } catch (error) {
    return "The river flows as the pulse of the divine.";
  }
};
