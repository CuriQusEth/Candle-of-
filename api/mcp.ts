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
      const { jsonrpc, method, id, params } = body;

      if (method === "initialize") {
         return res.status(200).json({
           jsonrpc: jsonrpc || "2.0",
           id: id,
           result: {
             protocolVersion: "2024-11-05",
             capabilities: {
               tools: {},
               prompts: {},
               resources: {}
             },
             serverInfo: {
               name: "candle-of-orchestrator",
               version: "1.0.0"
             }
           }
         });
      }

      if (method === "tools/list") {
        return res.status(200).json({
          jsonrpc: jsonrpc || "2.0",
          id: id,
          result: {
            tools: [
              { name: "get_race_status", description: "Get the current status of the race", inputSchema: { type: "object", properties: {} } },
              { name: "start_race", description: "Start the race", inputSchema: { type: "object", properties: {} } },
              { name: "get_leaderboard", description: "Get the current leaderboard", inputSchema: { type: "object", properties: {} } },
              { name: "optimize_speed", description: "Optimize speed parameters", inputSchema: { type: "object", properties: {} } },
              { name: "get_track_info", description: "Get information about the track", inputSchema: { type: "object", properties: {} } }
            ]
          }
        });
      }

      if (method === "tools/call") {
        const { name } = params || {};
        return res.status(200).json({
          jsonrpc: jsonrpc || "2.0",
          id: id,
          result: {
            content: [
              {
                type: "text",
                text: `Executed ${name || body.tool || 'tool'} successfully.`
              }
            ],
            isError: false
          }
        });
      }

      if (method === "prompts/list") {
        return res.status(200).json({
          jsonrpc: jsonrpc || "2.0",
          id: id,
          result: { prompts: [] }
        });
      }

      if (method === "resources/list") {
        return res.status(200).json({
          jsonrpc: jsonrpc || "2.0",
          id: id,
          result: { resources: [] }
        });
      }

      if (method === "ping") {
        return res.status(200).json({
          jsonrpc: jsonrpc || "2.0",
          id: id,
          result: {}
        });
      }

      return res.status(200).json({
        jsonrpc: jsonrpc || "2.0",
        id: id,
        result: {
          status: "success",
          message: "MCP command received",
          payload: body
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
