# Nitrosend Remote MCP Server Onboarding & First-Send Report

- **Goal Sentence Given to Agent:** `"Connect the Nitrosend MCP server at https://api.nitrosend.com/mcp, set up a Nitrosend account with a hosted sender, and send a short email to proof@dogfood.nitrosend.net."`
- **Client, Version, Model & Runtime:** Claude Code `2.1.224` (`claude --version` -> `2.1.224 (Claude Code)`) driving `claude-sonnet-4-20250514` on Windows 11 x64 (`10.0.26100`), Node.js `v22.17.0`, npm `10.9.2`.
- **Install & Exact Commands Run:** The agent used the headless API-key path and connected to `https://api.nitrosend.com/mcp` with Bearer auth:
  1. `claude mcp add --transport http nitrosend https://api.nitrosend.com/mcp --header "Authorization: Bearer <redacted>"` and `claude mcp list` (`nitrosend: https://api.nitrosend.com/mcp (HTTP) - Connected`).
  2. MCP `initialize` handshake (`protocolVersion: "2024-11-05"` -> server `nitro` `1.7.0`) and `tools/list` (`25` tools).
  3. `nitro_get_status({})` and `nitro_manage_domains({"operation":"prepare_brand_subdomain","params":{"subdomain":"ducanh3005"}})` -> `hello@ducanh3005.nitrosend.net` (`status: "ready"`).
  4. `nitro_send_message({"channel":"email","to":"proof@dogfood.nitrosend.net","subject":"MCP first-send verification from ducanh3005","body":"Testing remote MCP first send via Claude Code 2.1.224 to proof@dogfood.nitrosend.net.","idempotency_key":"mcp-first-send-ducanh3005-20261022"})` -> message id `5169290`, status `queued` at `2026-10-22T17:11:00.848Z`.
- **Time from Connecting to First Send:** 0.49 minutes (29.3 seconds: MCP connect started at `2026-10-22T17:10:43.154Z`, send queued at `2026-10-22T17:11:00.848Z`, finished at `2026-10-22T17:11:12.500Z`).
- **Human Intervention Points:** Zero points of human intervention; the agent took the headless REST signup and API-key Bearer header path without a browser OAuth step.
- **Slowest Step:** Retrying `nitro_send_message` after the first call with an `html` field failed input schema validation.
- **Doc Gap (Exact Repro):** `https://docs.nitrosend.com/agent-onboarding` shows `{ "channel": "email", "to", "subject", "html" }` for headless sends, but calling MCP `nitro_send_message` with `html` returns `Invalid arguments: object property at '/html' is a disallowed additional property` (`isError: true`) because `nitro_send_message` sets `"additionalProperties": false` and only accepts `body` or `template_id`.
- **One Change I Would Make:** Note in `https://docs.nitrosend.com/agent-onboarding` and `https://nitrosend.com/SKILL.md` that `nitro_send_message` accepts `body` or `template_id` (not `html`), or add optional `html` support to `nitro_send_message`.
