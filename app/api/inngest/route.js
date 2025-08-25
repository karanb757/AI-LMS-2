import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";

// Start with just one simple function for testing
const testFunction = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    return { message: `Hello ${event.data.email}!` };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [testFunction], // Start with just one function
});
