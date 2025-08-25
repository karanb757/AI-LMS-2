export async function GET() {
  return Response.json({
    // Environment check
    hasSigningKey: !!process.env.INNGEST_SIGNING_KEY,
    signingKeyLength: process.env.INNGEST_SIGNING_KEY?.length,
    signingKeyPreview: process.env.INNGEST_SIGNING_KEY?.substring(0, 25) + '...',
    nodeEnv: process.env.NODE_ENV,
    
    // Headers check
    headers: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => 
        key.includes('INNGEST') || key.includes('VERCEL')
      )
    ),
    
    timestamp: new Date().toISOString()
  });
}
