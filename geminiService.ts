import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are Curio, a helpful and curious AI assistant for the CurioGalaxy platform. You help users explore technology, learn new skills, and discover tools. Your tone is encouraging, slightly whimsical (space-themed metaphors are okay but keep it subtle), and very knowledgeable about tech.",
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having trouble connecting to the galaxy right now.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Communication with the stars has been interrupted. Please try again later.";
  }
};

export const analyzeResumeWithGemini = async (
  jd: string,
  resume: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
      Role: Expert Technical Recruiter.
      Task: Analyze the fit between the following Job Description and Resume.
      
      Job Description:
      ${jd}
      
      Resume:
      ${resume}
      
      Output Format:
      Provide a concise response in Markdown with:
      1. **Match Score**: A qualitative rating (Low, Medium, High) with a short rationale.
      2. **Strengths**: 3 key alignment points.
      3. **Gaps**: 3 missing or weak areas based on the JD.
      4. **Recommendation**: One actionable tip to improve the resume for this specific role.
      
      Keep the tone professional, encouraging, and objective.
    `;

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return result.text || "Unable to perform AI analysis.";
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return "Unable to perform AI analysis at this time. Please rely on the keyword match score.";
  }
};
