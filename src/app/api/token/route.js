import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieToken = cookies();
        const tokenCookie = cookieToken.get('token');

        // Parse the cookie value if it exists
        const token = tokenCookie ? JSON.parse(tokenCookie.value) : null;
        console.log('GET TOKEN REQUEST:', token);

        return NextResponse.json(token || { message: 'No token found' }, { status: token ? 200 : 404 });
    } catch (err) {
        console.error('Error in GET handler:', err);
        return NextResponse.json({ message: 'Failed to retrieve token' }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const res = await request.json();
        const response = NextResponse.json({ message: 'Token added successfully' });

        response.cookies.set('token', JSON.stringify(res), {
            httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
            path: '/', // Make cookie available site-wide
            sameSite: 'strict', // Prevent CSRF
            maxAge: 60 * 60 * 24 * 10,
        });

        return response;
    } catch (err) {
        console.error('Error in POST:', err);
        return NextResponse.json({ message: 'Failed to set token' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        // Create the response object
        const response = NextResponse.json({ message: 'Token deleted successfully' });

        // Delete the cookie by setting it with an empty value and appropriate attributes
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure flag in production
            path: '/', // Ensure it's the same path as the cookie being deleted
            sameSite: 'strict',
            maxAge: 0, // Setting maxAge to 0 ensures the cookie is deleted
        });

        // Return the response after deleting the cookie
        return response;
    } catch (err) {
        console.error('Error in DELETE:', err);
        return NextResponse.json({ message: 'Failed to delete token' }, { status: 500 });
    }
}