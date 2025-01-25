import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const cookieStore = cookies();
    const myCookie = cookieStore.get('searchHistory');
    const searchHistory = myCookie ? JSON.parse(myCookie.value) : [];
    console.log('GET REQUEST')
    return NextResponse.json(searchHistory);
}

export async function POST(request) {
    const res = await request.json();
    const cookieStore = cookies();
    const currentHistory = cookieStore.get('searchHistory');
    const searchHistory = currentHistory ? JSON.parse(currentHistory.value) : [];
    if (!searchHistory.includes(res) && res !== '') {
        if (searchHistory.length >= 10) {
            searchHistory.shift();
        }
        searchHistory.push(res);
    }
    const response = NextResponse.json({ message: 'search history added' });
    searchHistory.length !== 0 && response.cookies.set('searchHistory', JSON.stringify(searchHistory), {
        maxAge: 60 * 60 * 24 * 10,
    });

    return response;
}

export async function DELETE(request) {
    const cookieStore = cookies();
    cookieStore.delete('searchHistory');
    return NextResponse.json({ message: 'search history deleted' });
}
