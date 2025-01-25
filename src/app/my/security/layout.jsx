'use client'

import { usePathname } from "next/navigation"

export default function SecurityLayout({ children }) {
    const pathname = usePathname()

    return (
        <div className={`${pathname === '/my/security' ? 'px-6 pt-8' : 'p-8'} max-sm:px-4`}>
            {children}
        </div >
    )
}