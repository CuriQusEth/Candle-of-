# Candle of Forgotten Names

**Candle of Forgotten Names**, an atmospheric, symbolic orchestration game. You are the last Keeper, tasked with lighting the flames and remembering forgotten souls.

## Features & Capabilities
- **candle-rituals**: Engage in atmospheric, meditative rituals to light candles.
- **light-mechanics**: Interactive particle and dynamic light orchestration.
- **ambient-automation**: Trustless background orchestration loops.
- **symbolic-orchestration**: Orchestrator-driven atmospheric changes.
- **atmospheric-management**: Seamlessly transitions visual depth and states.
- **ritual-automation**: AI-driven ritual executions.
- **mcp-command-execution**: Direct orchestration via Model Context Protocol connections.
- **ERC-8004 Integration**: On-chain agents executing autonomous delegations of ritual logic securely via smart contracts.

## Architecture
Candle is built with the **Model Context Protocol (MCP)** and integrates trustless Agent abstractions, powered by the **Candle Of Orchestrator**:
- **Agent Framework**: ERC-8004 compliant AI agent logic (`/api/agent`, `/api/mcp`).
- **Base Network**: Verified on-chain transactions and score submissions via Base L2 block space.
- **Wagmi & WalletConnect**: Securely interact with smart contracts to issue memorials to the blockchain.

## Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start the game
npm run dev

# Build for production
npm run build
```

### Agent Integration
This application hosts an ERC-8004 compliant intelligent agent (`Candle Of Orchestrator`, version `1.0.0`) available on protocol `eip155:8453`.

- **Agent Identity Card**: `https://candle-of.vercel.app/.well-known/agent-card.json`
- **Agent API**: `https://candle-of.vercel.app/api/agent`

### MCP Connection Guide (Model Context Protocol)
The orchestrator operates an active MCP endpoint to receive commands.
- **Endpoint**: `https://candle-of.vercel.app/api/mcp`
- **Protocol**: `MCP 1.0.0`
- **Supported Endpoints**: standard `tools/list`, `tools/call`, `prompts/list`, `resources/list`.

Connect your client using a standard POST request parsing the available MCP commands.

---
*"Every name remembered is a star returned to the sky."*
