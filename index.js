import 'dotenv/config'

import express from 'express';
import path from 'path';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const app = express()
app.use(express.static('public'));
app.use(express.json());

// Text-only input
app.post('/api/gemini/text-only', async (req, res) => {
  const prompt = req.body.prompt;
  const result = await model.generateContent(prompt);
  const modelResponse = await result.response;
  const text = modelResponse.text();
  res.json({ text });
});

app.post('/api/gemini/multi-turn-conversations', async (req, res) => {
  const prompt = req.body.prompt;
  const chat = model.startChat();
  const result = await await chat.sendMessage(prompt);
  const modelResponse = await result.response;
  const text = modelResponse.text();
  res.json({ text });
});

app.get('/chat', (req, res) => {
  res.sendFile('./public/chat.html', { root: '.' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gemini Ai app listening on port ${port}`)
});
