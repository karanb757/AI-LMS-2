export const runtime = 'nodejs';

export async function GET(request) {
  return Response.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      signing_key_present: !!process.env.INNGEST_SIGNING_KEY,
      signing_key_preview: process.env.INNGEST_SIGNING_KEY?.substring(0, 30) + '...',
      event_key_present: !!process.env.INNGEST_EVENT_KEY,
    },
    inngest_config: {
      app_id: "ai-lms-v2",
      runtime: "nodejs",
      timestamp: new Date().toISOString()
    },
    headers: Object.fromEntries(request.headers.entries()),
    url: request.url
  });
}

export async function POST(request) {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());
    
    return Response.json({
      message: "Debug POST endpoint",
      headers: headers,
      body_length: body.length,
      body_preview: body.substring(0, 200) + '...',
      signing_key_available: !!process.env.INNGEST_SIGNING_KEY,
      inngest_headers: {
        signature: headers['x-inngest-signature'] || 'missing',
        timestamp: headers['x-inngest-timestamp'] || 'missing',
        server_kind: headers['x-inngest-server-kind'] || 'missing'
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
