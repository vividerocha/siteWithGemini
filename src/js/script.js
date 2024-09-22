import{GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm';

const MODEL_NAME = 'gemini-1.5-pro-latest';
const API_KEY = 'AIzaSyCNAWn3ytCsd9LCWgirQES34Qw8DYAZs5A';


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

const button = document.getElementById('botaoSubmit');

button.addEventListener('click', event => {
    consultaGemini();
})

async function consultaGemini(){
    const textInput = document.getElementById('inputText');
    const textOut = document.getElementById('outText');

    if(textInput.value.length){
        const texto = textInput.value;
        limparConsultaTela();
        const genAi = new GoogleGenerativeAI(API_KEY);
        const model = genAi.getGenerativeModel({model: MODEL_NAME});

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        const mensagemChat = `Me responda a pergunta: ${texto} de forma resumida em texto simples e poucas linhas`;

        try {
            const result = await chat.sendMessage(mensagemChat);
            const textResult = result.response.text();
            document.getElementById('outText').innerHTML = textResult;
          } catch (error) {
            console.error('Erro na solicitação:', error);
          }

    }

}

function limparConsultaTela(){
    const textInput = document.getElementById('inputText');  // Reobter o inputText
    const textOut = document.getElementById('outText');  // Reobter o textOut
    textInput.value = "";
    textOut.innerHTML = "";
}