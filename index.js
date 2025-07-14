import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // ✅ 新增

const app = express();

// ✅ 允许 GitHub Pages 域名访问你的中转接口（更安全）
app.use(cors({
  origin: 'https://twinkle-ally.github.io'
}));

// 解析 JSON 请求体
app.use(express.json());

// 路由
app.post('/api/coze', async (req, res) => {
  const { query } = req.body;
  const COZE_KEY = process.env.COZE_KEY;
  const COZE_BOT_ID = process.env.COZE_BOT_ID;

  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await fetch("https://api.coze.cn/v3/chat", {
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

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy API running on port ${PORT}`));
