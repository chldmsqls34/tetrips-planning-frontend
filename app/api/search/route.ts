import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const searchUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        'Accept': 'application/json'
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Naver API responded with status: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    if (searchData.items && searchData.items.length > 0) {
      const transformedData = {
        status: 'OK',
        meta: {
          totalCount: searchData.total,
          page: 1,
          count: searchData.display
        },
        places: searchData.items.map((item: any) => ({
          title: item.title.replace(/<[^>]*>/g, ''),
          roadAddress: item.roadAddress,
          mapx: item.mapx,
          mapy: item.mapy,
          category: item.category
        }))
      };
      return NextResponse.json(transformedData);
    }

    return NextResponse.json({ error: '검색 결과가 없습니다.' }, { status: 404 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
  }
}