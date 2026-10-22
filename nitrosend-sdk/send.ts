import { Nitrosend } from "@nitrosend/sdk";

async function main(): Promise<void> {
  const apiKey = process.env.NITROSEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NITROSEND_API_KEY environment variable");
  }

  const ns = new Nitrosend(apiKey);
  const to = "proof@dogfood.nitrosend.net";
  const subject = "SDK first-send verification from ducanh3005";
  const html = "<p>Testing first send via @nitrosend/sdk 0.11.7 on Node.js v22.17.0.</p>";

  const msg = await ns.messages.send(
    { channel: "email", to, subject, html },
    "sdk-first-send-ducanh3005-20261022"
  );
  console.log(JSON.stringify(msg));
}

void main();
