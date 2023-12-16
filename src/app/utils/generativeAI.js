// utils/generativeAI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_STUDIO_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyBATTOzxBi8u6YR9FtfsCOLL2xgRlMLreg");

async function run(msg) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [],
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  const history = await chat.getHistory();

  return { text, history };
}

export default run;
