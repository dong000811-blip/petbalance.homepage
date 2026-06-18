/* ============================================
   PETBALANCE — Cloudflare Pages Function
   /api/notices

   Notion API 키는 클라이언트에 절대 노출되지 않도록
   이 서버 측 함수에서만 사용합니다.
   Cloudflare Pages 대시보드 → Settings → Environment variables
   에 NOTION_KEY 를 등록해야 동작합니다.
   ============================================ */

const DATABASE_ID = '3838d4902351802e979cee3be887c25c';

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.NOTION_KEY) {
    return new Response(
      JSON.stringify({ error: 'NOTION_KEY 환경변수가 설정되지 않았습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const notionRes = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.NOTION_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: '공개',
            checkbox: { equals: true },
          },
          sorts: [{ property: '날짜', direction: 'descending' }],
        }),
      }
    );

    const data = await notionRes.json();

    return new Response(JSON.stringify(data), {
      status: notionRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Notion API 요청 실패', message: String(err) }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
