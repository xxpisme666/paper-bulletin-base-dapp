# Paper Bulletin

A pocket-sized Base app for bulletin posts. Not a platform, not a feed, not a giant dashboard. Open it, connect, pinning a short notice, and walk away with a bulletin.

## Merchant's note

The proof is on the counter: Build ID, Builder Wallet, Builder Code, live URL, and source repo. No email matching trick is required.

Build `6a0838fa4c3f57496e8396b8` · Wallet `0x1541fd2F976aA88e37bfd6433632FEAAe7a40CCe` · Code `bc_0c1pi66x` · Base · Vercel

Live: https://paper-bulletin.vercel.app

Source: https://github.com/xxpisme666/paper-bulletin-base-dapp

## What is inside

- A short Base wallet flow
- A public `/builder` proof surface
- Source code prepared without local secrets
- A tiny product scope around bulletin posts

## Start

```bash
npm install
npm run dev
```

Stack: Next.js UI plus wagmi/viem for wallet and Base chain behavior.

Do not commit `.env`, private keys, seed phrases, RPC keys, GitHub tokens, or Vercel tokens. Use `.env.example` only for placeholders.
