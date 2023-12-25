// utils/generativeAI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_STUDIO_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(msg) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async function run(msg) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // const chat = model.startChat({
  //   history: [],
  // });
  // Use streaming with text-only input
  const result = await model.generateContentStream(msg);
  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  // const result = await chat.sendMessage(msg);
  // const response = await result.response;
  // const text = response.text();
  // const history = await chat.getHistory();

  return { text, history };
}
  // Use streaming with text-only input
  const result = await model.generateContentStream(msg);
  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  // const result = await chat.sendMessage(msg);
  // const response = await result.response;
  // const text = response.text();
  // const history = await chat.getHistory();

  return { text, history };
}

export default run;
