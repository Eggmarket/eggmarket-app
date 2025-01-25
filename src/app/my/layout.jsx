'use client';

import ProfileProvider from "@/context/ProfileProvider";
import { useToken } from "@/components/hook/useToken/useToken";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [token] = useToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            if (pathname !== '/auth/register') {
                router.replace('/auth/register');
            }
        } else {
            setLoading(false);
        }
    }, [token, pathname, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileProvider>
            {children}
        </ProfileProvider>
    );
}
