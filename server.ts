import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // MCP API
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Candle Of MCP Endpoint",
      status: "active",
      description: "Active MCP server for Candle Of Orchestrator Agent",
      capabilities: ["candle-rituals", "light-mechanics", "ambient-automation", "symbolic-orchestration"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { method } = body;

      // Handle MCP required tools mapping
      if (method === "tools/list") {
        return res.json({
          tools: [
            {
              name: "get_race_status",
              description: "Get the current status of the race",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "start_race",
              description: "Start the race",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_leaderboard",
              description: "Get the current leaderboard",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "optimize_speed",
              description: "Optimize speed parameters",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_track_info",
              description: "Get information about the track",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        });
      }

      if (method === "tools/call") {
        const { tool } = body;
        return res.json({
          status: "success",
          tool_called: tool,
          result: `Executed ${tool} successfully.`,
        });
      }

      if (method === "prompts/list" || method === "resources/list") {
        return res.json({
          [method === "prompts/list" ? "prompts" : "resources"]: []
        });
      }

      return res.json({
        status: "success",
        message: "MCP command received",
        agent: "Candle Of Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  // Agent API
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Candle Of Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Candle Of",
      version: "1.0.0"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
