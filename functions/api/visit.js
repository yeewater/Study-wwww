export async function onRequest(context) {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  
  const allowedOrigins = [
    'https://study.mikugame.icu',
    'https://study.mikumod.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
  
  const corsHeaders = allowedOrigins.includes(origin) ? {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  } : { 'Content-Type': 'application/json' }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (request.method === 'POST') {
    return new Response(JSON.stringify({ ok: true, time: Date.now() }), {
      headers: corsHeaders
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: corsHeaders
  })
}
