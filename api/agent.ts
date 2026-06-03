export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Candle Of Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Candle Of",
      version: "1.0.0"
    });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    return res.status(200).json({
      status: "success",
      message: "Agent endpoint parsed payload",
      agent: "Candle Of Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
