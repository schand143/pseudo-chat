import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  try {
    const { language } = req.body;

    if (!language) {
      return res.status(400).json({ error: "Programming language is required" });
    }

    const prompt = `Generate a pseudo-code task for a beginner practicing ${language}. The task should start simple and gradually become more complex.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const task = response.choices[0]?.message?.content || "No task generated.";

    res.status(200).json({ task });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate task" });
  }
}
