import{GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm';

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "SUA KEY AQUI";


const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    //responseMimeType: "text/plain",
  };


  //BLOQUEIOS DE CONTEÚDOS SENSÍVEIS
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
]