'use client'

import Logo from '@/image/Logo.svg'
import Image from 'next/image'
import LightLogo from '@/image/LightLogo.svg'
import { usePathname, useRouter } from 'next/navigation'

export default function Layout({ children }) {
    const path = usePathname()
    const router = useRouter()

    return (
        // Responsive (Desktop)
        // <div className='min-h-screen grid grid-rows-[88px_1fr] max-sm:grid-rows-1'>
        //     <div className="max-sm:hidden bg-tertiary flex justify-center items-center">
        //         <Image src={Logo} alt='Logo' />
        //     </div>
        //     <div className='flex justify-center items-center max-sm:flex-col max-sm:gap-10'>
        //         {path !== '/auth/signup' && <Image className="max-sm:block hidden" src={LightLogo} alt="Logo" />}
        //         <form className="rounded-lg border-solid border-[1px] border-default-100 p-8 max-w-[412px] max-sm:px-8 max-sm:py-0 w-full max-sm:border-[0]">
        //             <div className="flex gap-4 items-center">
        //                 {
        //                     path === '/auth/register' ?
        //                         <>
        //                             <p className="text-xl font-semibold">ورود | ثبت‌نام</p>
        //                         </> :
        //                         <>
        //                             <span onClick={() => router.back()} className="icon-Vector cursor-pointer"></span>
        //                             <p className="text-xl font-semibold">{
        //                                 path === '/auth/code' ? 'کد یکبار مصرف' : path === '/auth/password' ? 'رمز عبور' : path === '/auth/signup' && 'تعیین رمز عبور'
        //                             }</p>
        //                         </>
        //                 }
        //             </div>
        //             {children}
        //         </form>
        //     </div>
        // </div>
        <div className='min-h-screen grid grid-rows-1 grid-cols-[1fr] px-8'>
            <div className='flex justify-center items-center flex-col gap-10'>
                {path !== '/auth/signup' && <Image className="block" src={LightLogo} alt="Logo" />}
                <form className="rounded-lg border-solid max-w-[412px] py-0 w-full">
                    <div className="flex gap-4 items-center">
                        {
                            path === '/auth/register' ?
                                <>
                                    <p className="text-xl font-semibold">ورود | ثبت‌نام</p>
                                </> :
                                <>
                                    <span onClick={() => router.back()} className="icon-Vector cursor-pointer"></span>
                                    <p className="text-xl font-semibold">{
                                        path === '/auth/code' ? 'کد یکبار مصرف' : path === '/auth/password' ? 'رمز عبور' : path === '/auth/signup' && 'تعیین رمز عبور'
                                    }</p>
                                </>
                        }
                    </div>
                    {children}
                </form>
            </div>
        </div>
    )
}