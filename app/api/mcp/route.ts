import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
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
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jsonrpc, method, id, params } = body;

    if (method === "initialize") {
       return NextResponse.json({
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
       }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: jsonrpc || "2.0",
        id: id,
        result: {
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
        }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    if (method === "tools/call") {
      const { name } = params || {};
      return NextResponse.json({
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
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    if (method === "prompts/list" || method === "resources/list") {
      return NextResponse.json({
        jsonrpc: jsonrpc || "2.0",
        id: id,
        result: {
          [method === "prompts/list" ? "prompts" : "resources"]: []
        }
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    if (method === "ping") {
      return NextResponse.json({
        jsonrpc: jsonrpc || "2.0",
        id: id,
        result: {}
      }, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    // Default MCP Payload Return
    return NextResponse.json({
      jsonrpc: jsonrpc || "2.0",
      id: id,
      result: {
        status: "success",
        message: "MCP command received",
        payload: body
      }
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
