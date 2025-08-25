import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {CreateNewUser, GenerateNotes, helloWorld,GenerateStudyTypeContent} from '../../../inngest/function.js'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming:'allow',
  functions: [
    helloWorld,
    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent
  ],
});
