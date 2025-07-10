# Coze Proxy API for Render

This is a Node.js proxy API that hides your Coze API key and forwards queries securely.

## How to deploy to Render

1. Fork this repo to your GitHub
2. Go to https://render.com and create a new Web Service
3. Set the following environment variables:

- `COZE_KEY` = your Coze API key (without Bearer)
- `COZE_BOT_ID` = your Coze bot ID

4. Build command: `npm install`
5. Start command: `node index.js`
6. Done! Use the URL `/api/coze` to access it.
