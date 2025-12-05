import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Note: In a real production app, ensure strict backend proxying for keys.
// Here we use the environment variable as per instructions.
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("API Key not found in process.env.API_KEY");
}

/**
 * Sends a message to the Gemini model acting as a historical guide.
 */
export const sendChatMessage = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  if (!apiKey || !ai) {
    return "系统提示：未检测到API密钥，AI导游暂时无法连接。请检查环境配置。";
  }

  try {
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

    // Reconstruct history for context (simplified for single-turn or simple memory)
    // For robust chat, we would append history to the chat session, 
    // but here we just send the latest message for simplicity in this demo structure.
    
    // Using simple sendMessage for this stateless service wrapper
    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "讲解员正在思考，请稍后再试...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络连接不稳定，请稍后重试。";
  }
};