export async function GET(request: Request) {
  const url = new URL(request.url)
  const feedUrl = url.searchParams.get('url')
  if (!feedUrl) {
    return new Response('Missing feed URL', { status: 400 })
  }

  const response = await fetch(feedUrl)
  const xml = await response.text()
  return new Response(xml, {
    headers: {
      'content-type': 'application/xml'
    }
  })
}
