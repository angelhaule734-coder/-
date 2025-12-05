import { GoogleGenAI } from "@google/genai";

// Shim process.env for TypeScript to avoid "Cannot find name 'process'" errors during build.
// Vite replaces `process.env.API_KEY` with the string literal at build time.
declare const process: {
  env: {
    API_KEY: string | undefined;
  };
};

let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (aiClient) return aiClient;

  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey.includes("API_KEY")) { 
    // Check if it's undefined or if the replacement failed (still holds variable name)
    console.warn("Gemini API Key is missing or invalid.");
    throw new Error("Missing API Key");
  }

  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
};

/**
 * Sends a message to the Gemini model acting as a historical guide.
 */
export const sendChatMessage = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    // Lazy init: This prevents the entire app from crashing on load if the key is missing
    const ai = getAiClient();

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          你是一位北京焦庄户地道战遗址纪念馆的资深AI讲解员。
          你的名字叫“红星向导”。
          你的职责是向游客介绍焦庄户地道战的历史、战术特点、英雄事迹以及参观注意事项。
          
          关键信息：
          1. 焦庄户位于北京市顺义区龙湾屯镇，被誉为“人民第一堡垒”。
          2. 地道战起源于1943年，全长约11.5公里，目前供参观的约830米（需确保数据准确）。
          3. 语气要庄重、热情、富有爱国主义情怀，同时通俗易懂。
          4. 如果用户询问非历史/参观相关的问题，请礼貌地将话题引回地道战或红色历史。
          5. 回答尽量控制在200字以内，除非用户要求详细解释。
        `,
        temperature: 0.7,
      },
    });

    // Send message
    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "讲解员正在思考，请稍后再试...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    const err = error as Error;
    if (err.message === "Missing API Key") {
      return "请在 Vercel 设置中配置 API_KEY 环境变量以启用 AI 功能。";
    }
    
    return "网络连接不稳定或服务暂不可用，请稍后重试。";
  }
};