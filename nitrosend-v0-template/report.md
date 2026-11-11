# Nitrosend v0 Template Gallery & MCP Send Trial Notes

- **Agent & Model**: Claude Code 2.1.224 (claude-opus-4-6) connected over Streamable HTTP MCP with OAuth 2.1 PKCE (https://api.nitrosend.com/mcp?receipt=1).
- **Source Template**: Selected **Linear · welcome** (study_linear_welcome_01, 	emplate_id: 26391) from the Nitrosend v0 email template gallery (https://nitrosend.com/email-templates/v0).
- **Brand & Product Adapted**: Customized the template into an onboarding welcome email for **Beacon Wars** (https://ducanh3005.github.io/beacon-wars/), our live browser- and HTTP-API-playable turn-based strategy game.
- **Palette & Visual Customization**: Applied the **Midnight** dark palette (rand: #0ea5e9, ackground: #0b1120, surface: #111827, 	ext: #f8fafc) and replaced the stock illustration with a custom 1200x480 tactical grid hero banner (https://raw.githubusercontent.com/ducanh3005/beacon-wars/main/assets/beacon-wars-email-hero.png).
- **Copy & CTA Changes**: Rewrote the hero headline (Welcome to the Tactical Grid), subheadline, 3-step quickstart checklist (Create Match, Connect Agent Bot via JSON API, Capture 3 Beacons), and primary CTA button (Launch Beacon Wars Arena -> https://ducanh3005.github.io/beacon-wars/).
- **Saved Template & Account**: Saved directly to our Nitrosend workspace (ducanh3005@taskmarket.dev, ccount_id: 14586) via POST /v1/public/template_gallery/study_linear_welcome_01/use as **	emplate_id: 27717** (Beacon Wars — Welcome).
- **MCP Dispatch & Sealed Receipt**: Dispatched 	emplate_id: 27717 via mcp_send_template to proof@dogfood.nitrosend.net (message_id: 5513201, status: queued at 2026-11-11T14:26:29.753Z), producing sealed receipt https://runx.ai/r/85f80caab0d729643fcb0f2b91f1ad110a2db35a0379ef50d270ab34d963f9c7.
- **Actionable Finding #1 (signup_sending_capacity_reached global throttle opacity)**: When new accounts hit the platform-wide signup sending capacity window (429 signup_sending_capacity_reached), the error payload returns 
etry_after_seconds and 
etry_at in the REST response, but mcp_list_templates / mcp_get_account does not expose whether the global new-account send window is currently open before attempting mcp_send_template. Surfacing sending_window_open and 
ext_window_at in mcp_get_account would let autonomous agents schedule sends cleanly without trial-and-error 429s.
- **Actionable Finding #2 (Gallery use endpoint variable schema discovery)**: POST /v1/public/template_gallery/:slug/use accepts customization.palette, customization.brand_name, and customization.blocks, but the gallery metadata endpoint does not list the allowed block keys (hero_title, hero_body, cta_label, cta_url) up front—agents have to inspect the hydrated studio state first.
