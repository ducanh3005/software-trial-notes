# Nitrosend Safe Mode & MAP Campaign Send Approval Report

- **Environment & Commands Run:** Windows 11 x64 (`10.0.26100`), Node.js `v22.17.0`, npm `10.9.2`, `mailschema` `0.3.2`. Executed:
  1. `nitro_set_brand_kit({"fields":{"company_name":"DucAnh Engineering","physical_address":"123 Nguyen Hue Blvd, District 1, Ho Chi Minh City 700000, Vietnam"}})`
  2. `PATCH https://api.nitrosend.com/v1/my/account {"safe_mode_enabled":true}` (`200 OK` at `2026-10-24T04:35:40.254Z`).
  3. With API key: `POST /v1/my/lists` (`id: 12783`), `POST /v1/my/contacts` (own address in list `12783`), `nitro_compose_campaign` (campaign `15179`, no merge tags), `nitro_review_delivery`, `nitro_control_delivery` `approve`, and `nitro_control_delivery({"target_type":"campaign","target_id":15179,"operation":"schedule","scheduled_at":"2026-10-24T04:55:44.197Z"})` -> held as `awaiting_approval`.
  4. Saved email `"Review send request: Note from DucAnh Engineering"` as `approval.eml`, ran `npm i mailschema@0.3.2`, and extracted `npx mailschema@0.3.2 message approval.eml > description.json`.
- **Minutes from Safe Mode On to Decision:** 0.18 minutes (`2026-10-24T04:35:40.254Z` to approval at `2026-10-24T04:35:50.949Z`).
- **Validate Command & Exact Output:** `npx mailschema@0.3.2 description description.json --contract campaign-send-approval-0.1.json` ->
  `Valid MAP 0.3 description urn:uuid:e9a2ff6d-56fe-5ac3-962b-5bb2ace963b0`
  `sha-256:751577b24bcf700925ef1e61ccc1cf1f250448f7a3cfb3b01542a7d1090a3b4e`
- **Recomputed `terms.version`:** Deleted `terms.version` on a clone of `description.json` and ran `digest(copy)` from `import { digest } from "mailschema"`, getting `sha-256:a135b5c4638ab6f7bbf4d29a99d3a906b9055fe3b6cf5cb59545bf1a1d4c42fd` (exact match).
- **Decision & Why:** Approved (`POST /v1/my/map/approvals/315` with `{"decision":"approve","version":"sha-256:a135b5c4638ab6f7bbf4d29a99d3a906b9055fe3b6cf5cb59545bf1a1d4c42fd"}` for `https://app.nitrosend.com/my/map/reviews/315`) because the description passed contract validation, `terms.version` matched, `details.audience.count` was `1` (only my address), and `details.content.digest` matched the composed campaign.
- **Slowest Step:** Completing the multi-step `nitro_compose_campaign` contract flow (`intent` -> `validate` -> `draft`) to obtain the issued draft `idempotency_key` before scheduling.
- **Defect (Exact Repro):** Calling `nitro_control_delivery` with `operation: "schedule"` under Safe Mode returns `delivery.status: "awaiting_approval"`, but top-level `next_action` says `"Scheduled for 2026-10-24T04:55:44.197Z — monitor via nitro_get_insights"` and `delivery.poll_with.arguments.operation` is hardcoded to `"live"`.
- **One Change I Would Make:** When `delivery.status === "awaiting_approval"`, set `next_action` to report the Safe Mode hold and preserve `"schedule"` in `poll_with.arguments.operation`.
