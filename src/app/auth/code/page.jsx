'use client'

import Code from "@/components/code/Code";
import Image from "next/image";
import Link from "next/link";
import pencil from '@/image/pencil.svg'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CodePage() {
    const [phone, setPhone] = useState('')
    const router = useRouter()

    useEffect(() => {
        const phoneStored = sessionStorage.getItem('phone')
        if (!phoneStored) {
            router.push('/auth/register')
        } else {
            setPhone(phoneStored)
        }
    }, [router])

    if (!phone) {
        return null
    }

    return (
        <>
            <div className="flex justify-between items-center mt-10">
                <p className="text-sm max-sm:text-xs font-bold text-default-700">کد پیامک‌ شده به <span className="font-['vazir']">{phone}</span> را وارد کنید</p>
                <Link href='/auth/register' className="text-tertiary flex items-center flex-row-reverse">
                    <div className="text-xs">تغییر شماره</div>
                    <Image src={pencil} alt="pencil" />
                </Link>
            </div>
            <div className="mt-8">
                <Code phone={phone} />
            </div>
        </>
    )
}