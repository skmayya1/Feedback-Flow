import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export const getSentiment = async (text: string) => {
    if (!API_KEY) {
        throw new Error("API key not found");
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the sentiment of the following review and label it 'genuine' or 'not genuine'. Return only a single word.\n\nReview: "${text}"`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};
