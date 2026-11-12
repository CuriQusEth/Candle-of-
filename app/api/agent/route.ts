export async function GET() {
  return Response.json({
    name: "Candle Of Orchestrator",
    status: "active",
    network: "Base Mainnet (Denim - 200ms canonical blocks)",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Candle Of",
    version: "1.0.0"
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
    return Response.json({
      status: "success",
      message: "Agent endpoint parsed payload",
      agent: "Candle Of Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    return Response.json({ error: "Invalid agent request" }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
