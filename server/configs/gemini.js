import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL || "gemini-3-flash-preview"
});

export default genAI;