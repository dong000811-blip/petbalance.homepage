export async function onRequest(context) {
  const NOTION_KEY = context.env.NOTION_KEY;
  const url = new URL(context.request.url);
  const pageId = url.searchParams.get('id');

  if (!pageId) {
    return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
  }

  // 페이지 메타 조회
  const [pageMeta, pageBlocks] = await Promise.all([
    fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    }).then(r => r.json()),

    fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    }).then(r => r.json())
  ]);

  return new Response(JSON.stringify({ meta: pageMeta, blocks: pageBlocks }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
