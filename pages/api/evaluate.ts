import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userCode, correctAnswer } = req.body;
    const prompt = `Check if the following pseudo-code is correct:\nUser code: ${userCode}\nCorrect Answer: ${correctAnswer}\nProvide feedback.`;

    try {
      const response = await openai.createCompletion({
        model: "gpt-4",
        prompt,
        max_tokens: 100,
      });

      res.status(200).json({ feedback: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: "Failed to evaluate solution" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
