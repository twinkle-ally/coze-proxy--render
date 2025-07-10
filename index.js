import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.post('/api/coze', async (req, res) => {
  const { query } = req.body;
  const COZE_KEY = process.env.COZE_KEY;
  const COZE_BOT_ID = process.env.COZE_BOT_ID;

  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await fetch("https://api.coze.com/open_api/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COZE_KEY}`
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user: "user-001",
        query
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Error', detail: err.message });
  }
});

app.listen(3000, () => console.log('Proxy API running on port 3000'));
