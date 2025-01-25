'use client'

import Code from "@/components/code/Code";
import Image from "next/image";
import Link from "next/link";
import pencil from '@/image/pencil.svg'
import { useContext, useEffect, useState } from "react";
import { ToggleShow } from "../layout";

export default function CodePage() {
    const [phone, setPhone] = useState('')
    const [toggle, onClick, dialogPhone] = useContext(ToggleShow)

    useEffect(() => {
        const phoneStored = sessionStorage.getItem('phone')
        if (!phoneStored) {

        } else {
            setPhone(phoneStored)
        }
    }, [])

    if (!phone) {
        return null
    }

    return (
        <>
            <div className="flex justify-between items-center mt-8">
                <p className="text-sm max-sm:text-xs font-bold text-default-700">کد پیامک‌ شده به <span className="font-['vazir']">{phone}</span> را وارد کنید</p>
                <div
                    className="text-tertiary flex items-center flex-row-reverse"
                    onClick={() => onClick('users')}
                >
                    <div className="text-xs cursor-pointer">تغییر شماره</div>
                    <Image src={pencil} alt="pencil" />
                </div>
            </div>
            <div className="mt-4">
                <Code dialogPhone={dialogPhone} phone={phone} modal={true} toggle={toggle} />
            </div>
        </>
    )
}