'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import gardientLine from '@/image/gardientLine.svg'

export default function SecurityPage() {
    const router = useRouter()

    return (
        <div>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/my')}>
                <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
                <p className="text-default-900 font-semibold text-xl">امنیت</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6">
                <Link href={'security/set-password'} className="flex justify-between items-center">
                    <div className="font-normal text-default-900">تغییر یا تعیین رمز عبور</div>
                    <span className="icon-dark-bold-Left-2 text-default-900 text-2xl"></span>
                </Link>
                <Image src={gardientLine} alt='line' />
                <Link href={'#'} className="flex justify-between items-center">
                    <div className="font-normal text-default-900">دستگاه‌های فعال</div>
                    <span className="icon-dark-bold-Left-2 text-default-900 text-2xl"></span>
                </Link>
            </div>
        </div>
    )
}