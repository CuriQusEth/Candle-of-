export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Candle Of MCP Endpoint",
      status: "active",
      description: "Active MCP server for Candle Of Orchestrator Agent",
      capabilities: [
        "candle-rituals", 
        "light-mechanics", 
        "ambient-automation", 
        "symbolic-orchestration",
        "mcp-command-execution"
      ],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { method } = body;

      if (method === "tools/list") {
        return res.status(200).json({
          tools: [
            { name: "get_race_status", description: "Get the current status of the race", inputSchema: { type: "object", properties: {} } },
            { name: "start_race", description: "Start the race", inputSchema: { type: "object", properties: {} } },
            { name: "get_leaderboard", description: "Get the current leaderboard", inputSchema: { type: "object", properties: {} } },
            { name: "optimize_speed", description: "Optimize speed parameters", inputSchema: { type: "object", properties: {} } },
            { name: "get_track_info", description: "Get information about the track", inputSchema: { type: "object", properties: {} } }
          ]
        });
      }

      if (method === "tools/call") {
        const { tool } = body;
        return res.status(200).json({
          status: "success",
          tool_called: tool,
          result: `Executed ${tool} successfully.`
        });
      }

      if (method === "prompts/list" || method === "resources/list") {
        return res.status(200).json({
          [method === "prompts/list" ? "prompts" : "resources"]: []
        });
      }

      return res.status(200).json({
        status: "success",
        message: "MCP command received",
        agent: "Candle Of Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
