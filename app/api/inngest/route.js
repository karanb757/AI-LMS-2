import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { 
  helloWorld, 
  CreateNewUser, 
  GenerateNotes, 
  GenerateStudyTypeContent 
} from "../../../inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest, // This already has the hardcoded signingKey
  functions: [    // ← Add your functions here!
    helloWorld,
    CreateNewUser, 
    GenerateNotes,
    GenerateStudyTypeContent
  ],
});
