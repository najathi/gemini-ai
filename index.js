import 'dotenv/config'

import express from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const app = express()
app.use(express.static('public'));
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const prompt = req.body.prompt;
  const result = await model.generateContent(prompt);
  const modelResponse = await result.response;
  const text = modelResponse.text();
  res.json({ text });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
