import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "ai-lms-v2",
    signingKey: 'signkey-prod-5188467046154d44b04311728d6e29c10c16076234f8ca14e7bbfa3f3ffe0e02'
});
