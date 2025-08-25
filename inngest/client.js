import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "ai-lms-2",
  // Try with explicit env var first
  signingKey: process.env.INNGEST_SIGNING_KEY || "signkey-prod-5188467046154d44b04311728d6e29c10c16076234f8ca14e7bbfa3f3ffe0e02",
});
