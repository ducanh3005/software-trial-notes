# Nitrosend Safe Mode & MAP Campaign Send Approval Report

- **Environment & Commands Run:** Windows 11 x64 (`10.0.26100`), Node.js `v22.17.0`, npm `10.9.2`, `mailschema` `0.3.2`. Executed:
  1. `nitro_set_brand_kit({"fields":{"company_name":"DucAnh Engineering","physical_address":"123 Nguyen Hue Blvd, District 1, Ho Chi Minh City 700000, Vietnam"}})`
  2. `PATCH https://api.nitrosend.com/v1/my/account {"safe_mode_enabled":true}` (`200 OK` at `2026-10-22T17:12:52.858Z`).
  3. With API key: `POST /v1/my/lists` (`id: 12698`), `POST /v1/my/contacts` (own address in list `12698`), `nitro_compose_campaign` (campaign `14967`, template `23872`, no merge tags), `nitro_review_delivery`, `nitro_control_delivery` `approve`, and `nitro_control_delivery({"target_type":"campaign","target_id":14967,"operation":"schedule","scheduled_at":"2026-10-22T17:34:52Z","idempotency_key":"map-campaign-schedule-ducanh3005-20261022"})` -> held as `awaiting_approval`.
  4. Saved email `"Review send request: Note from DucAnh Engineering"` as `approval.eml`, ran `npm i mailschema@0.3.2`, and extracted `npx mailschema@0.3.2 message approval.eml > description.json`.
- **Minutes from Safe Mode On to Decision:** 4.73 minutes (`2026-10-22T17:12:52.858Z` to approval at `2026-10-22T17:17:36Z`).
- **Validate Command & Exact Output:** `npx mailschema@0.3.2 description description.json --contract campaign-send-approval-0.1.json` ->
  `Valid MAP 0.3 description urn:uuid:26de510b-2890-5473-8f05-c088e9043e89`
  `sha-256:7b53a2e1bf3e8d2ac0211ebb451895e2a8551542b034b828adbeeb5ad24c1fac`
- **Recomputed `terms.version`:** Deleted `terms.version` on a clone of `description.json` and ran `digest(copy)` from `import { digest } from "mailschema"`, getting `sha-256:38d454905290fb7852e748a166d5603d5adc118c8bae7122adef900b01dd1332` (exact match).
- **Decision & Why:** Approved (`POST /v1/my/map/approvals/189` with `{"decision":"approve","version":"sha-256:38d454905290fb7852e748a166d5603d5adc118c8bae7122adef900b01dd1332"}` for `https://app.nitrosend.com/my/map/reviews/189`) because the description passed contract validation, `terms.version` matched, `details.audience.count` was `1` (only my address), and `details.content.digest` matched template `23872`.
- **Slowest Step:** Re-issuing `nitro_compose_campaign` after `nitro_set_brand_kit` invalidated the prior `contract_id` (`contract_context_stale`).
- **Defect (Exact Repro):** Calling `nitro_control_delivery` with `operation: "schedule"` under Safe Mode returns `delivery.status: "awaiting_approval"`, but top-level `next_action` says `"Scheduled for 2026-10-22T17:34:52Z — monitor via nitro_get_insights"` and `delivery.poll_with.arguments.operation` is hardcoded to `"live"`.
- **One Change I Would Make:** When `delivery.status === "awaiting_approval"`, set `next_action` to report the Safe Mode hold and preserve `"schedule"` in `poll_with.arguments.operation`.
