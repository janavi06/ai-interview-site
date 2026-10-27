import {GoogleGenerativeAI,} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

// primary model

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

// fallback model
export const fallbackModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

