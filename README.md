# Candle of Forgotten Names

**Candle of Forgotten Names**, an atmospheric, symbolic orchestration game. You are the last Keeper, tasked with lighting the flames and remembering forgotten souls.

## Features

- **Candle Rituals**: Engage in atmospheric, meditative rituals to light candles spanning forgotten memory shards.
- **Ambient Automation**: Trustless background orchestration handles ritualistic progression safely.
- **Symbolic Leaderboards**: Ascend rankings by demonstrating dedication and capturing the most "Souls Remembered."
- **ERC-8004 Integration**: On-chain agents execute autonomous delegations of ritual logic securely via smart contracts.

## Architecture & Integration

Candle is built with the **Model Context Protocol (MCP)** and integrates trustless Agent abstractions, powered by the Candle Of Orchestrator:

- **Agent Framework**: ERC-8004 compliant AI agent logic (`/api/agent`, `/api/mcp`).
- **Base Network**: Verified on-chain transactions and score submissions via Base L2 block space.
- **Wagmi & WalletConnect**: Securely interact with smart contracts to issue memorials to the blockchain.

## Developer Quickstart

```bash
# Install dependencies
npm install

# Start the game
npm run dev

# Build for production
npm run build
```

## Security

Please do not commit or leak API Keys, RPC Endpoints, or Base contract private keys into public branches. The application reads runtime secrets from environment variables natively.

---

*"Every name remembered is a star returned to the sky."*
