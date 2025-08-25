import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "ai-lms-v2", 

  signingKey: process.env.NODE_ENV === 'development' 
    ? "signkey-prod-5188467046154d44b04311728d6e29c10c16076234f8ca14e7bbfa3f3ffe0e02"
    : process.env.INNGEST_SIGNING_KEY,
  // Add event key from Image 4
  eventKey: process.env.INNGEST_EVENT_KEY || "rR5i0yDUmu3FApi5kG2pecNH2UeTXNw4lzdBx_s_mDFN2y6_wOP9XADNlUP57gw2s_TG_pB_ncKyJ_XJrBujOw",
});
