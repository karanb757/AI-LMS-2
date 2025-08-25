import { Inngest } from 'inngest';

const inngest = new Inngest({ id: 'ai-lms-v2' });

export const { GET, POST, PUT } = inngest.createHandler({
  // The app ID again
  id: 'ai-lms-v2',
  // The FULL ABSOLUTE URL to this endpoint
  url: 'https://ai-lms-v2-5f62anqcf-karanbodkhe757-gmailcoms-projects.vercel.app/api/inngest',
  functions: [
    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent
  ],
});
