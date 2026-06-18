export async function onRequest(context) {
  const NOTION_KEY = context.env.NOTION_KEY;
  const DATABASE_ID = '3838d4902351802e979cee3be887c25c';

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        property: '공개',
        checkbox: { equals: true }
      },
      sorts: [{ property: '날짜', direction: 'descending' }]
    })
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
