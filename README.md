# sorostream-app

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

Next.js 14 streaming dashboard for **SoroStream** — real-time USDC payment streaming on Stellar Soroban.

## Live Demo

https://sorostream-app.vercel.app

## Screenshots

Visit the [live demo](https://sorostream-app.vercel.app) to see the app in action.

## Local Setup

```bash
# 1. Clone and install
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your contract ID

# 3. Run dev server
npm run dev
# Open http://localhost:3000
```

## Env Vars

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes | `testnet` or `mainnet` |
| `NEXT_PUBLIC_CONTRACT_ID` | Yes | Deployed StreamContract address |
| `NEXT_PUBLIC_RPC_URL` | No | Custom Soroban RPC (defaults to testnet) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Web3 | @sorostream/sdk, @stellar/freighter-api |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero and how-it-works |
| `/dashboard` | Stream list with live balances |
| `/stream/new` | Create stream form |
| `/stream/[id]` | Stream detail with withdraw/cancel |

## Contributing via Drips Wave

This project participates in the **Stellar Wave Program** on [Drips Wave](https://drips.network/wave). Earn rewards for resolving issues during weekly Wave sprints.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

> **Note:** Do not start coding until assigned to an issue by a maintainer.
