require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Ошибка на сервере" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
