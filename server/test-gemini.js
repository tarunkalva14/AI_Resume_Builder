import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAa.... Your full key"; // Your full key

const genAI = new GoogleGenerativeAI(API_KEY);

const modelsToTry = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro-latest", 
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-3-flash-preview",
    "gemini-2.5-flash"
];

async function findWorkingModel() {
    console.log("🔍 Testing models to find one that works...\n");
    
    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing: ${modelName}...`);
            
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say: Working!");
            const text = result.response.text();
            
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log(`Response: ${text}\n`);
            console.log("🎉 ========================================");
            console.log(`🎉 USE THIS MODEL: ${modelName}`);
            console.log("🎉 ========================================\n");
            
            return modelName;
            
        } catch (error) {
            console.log(`❌ ${modelName} failed: ${error.message.split('\n')[0]}\n`);
        }
    }
    
    console.log("❌ No working model found. Please check your API key.");
}

findWorkingModel();
