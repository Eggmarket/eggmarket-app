import React from 'react'
import Search from '../search/Search'
import Image from 'next/image'
import Logo from '@/image/Logo.svg'
import Nav from '../nav/Nav'
import Link from 'next/link'

const Header = () => {
    return (
        // <div className='sticky text-zinc-50 top-0 h-[88px] max-md:h-auto px-36 max-lg:px-[0] flex justify-between items-center bg-tertiary max-md:bg-default-50 max-md:flex-col max-md:justify-center max-md:shadow-md'>
        //     <div className='flex items-center gap-[116px] max-xl:gap-8 max-md:hidden'>
        //         <Image src={Logo} alt='logo' priority />
        //         <Nav />
        //     </div>
        //     <div className='flex items-center gap-6 max-md:hidden'>
        //         <span className='icon-Search-2 invert text-4xl'></span>
        //         <Link href='/auth/register' className='flex items-center justify-center w-[150px] h-12 font-[700] bg-primary text-default-50 rounded-[12px]'>
        //             <span className='icon-Buy text-[20px] ml-2'></span>ورود | ثبت نام
        //         </Link>
        //     </div>
        //     <Search />
        // </div>
        <Search />
    )
}

export default Header