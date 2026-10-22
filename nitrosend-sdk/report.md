# Nitrosend TypeScript SDK First-Send Run Report

- **Install & Commands Run:** On Windows 11 x64 (`10.0.26100`) with npm `10.9.2`, ran:
  1. `npm init -y`
  2. `npm install @nitrosend/sdk@latest`
  3. `npm install -D typescript@latest @types/node@latest`
  4. `npx tsc --strict` (compiled `send.ts` to `dist/send.js` with `"types": ["node"]` in `tsconfig.json`, zero errors).
  5. `node dist/send.js` with `NITROSEND_API_KEY` set in the environment -> returned message id `5169276`, status `queued`, `createdAt: "2026-10-22T17:06:21.420Z"`.
- **Runtime & Version:** Node.js `v22.17.0` on Windows 11 x64 (`10.0.26100`).
- **SDK & TypeScript Versions:** `@nitrosend/sdk` `0.11.7`, `typescript` `7.0.2`, `@types/node` `26.6.5`.
- **Time from Install to First Send:** 0.79 minutes (47.6 seconds: install started at `2026-10-22T17:05:45.648Z`, send queued at `2026-10-22T17:06:21.420Z`, script finished at `2026-10-22T17:06:33.219Z`, receipt issued at `2026-10-22 17:06 UTC`).
- **Slowest Step:** Installing `typescript@7.0.2` and `@types/node@26.6.5` and configuring `tsconfig.json` (`"module": "NodeNext"`, `"types": ["node"]`) before running `npx tsc --strict`.
- **Defect or Doc Gap:** None found. I tested `new Nitrosend(apiKey)` environment narrowing, `ns.messages.send({ channel: "email", to, subject, html }, idempotencyKey)` against `dist/resources/messages.d.ts` and the SDK `README.md`, and strict compilation under TypeScript `7.0.2`; all types, runtime payloads, and docs matched cleanly.
- **One Change I Would Make:** Update the `## Pagination` and `## Error Handling` code snippets in `https://github.com/nitrosend/typescript-sdk/blob/main/README.md` to pass `process.env.NITROSEND_API_KEY!` instead of hardcoded `'nskey_live_...'` string literals so every example follows the `Server (secret key)` guidance.
