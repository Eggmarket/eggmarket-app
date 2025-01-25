"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { lists } from "../nav/Nav";
import Link from "next/link";
import SvgTemp from "../svg/SvgTemp";

const Pages = ({ text, href, icon, activeIcon }) => {
  const path = usePathname();
  const router = useRouter()
  // const [navLink, setNavLink] = useState('')
  return (
    <Link
      href={href}
      // onClick={async () => {
      //   if (href === '') {
      //     const token = localStorage.getItem('token')
      //     try {
      //       const res = await fetch(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/profile`, {
      //         method: 'GET',
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Authorization': token
      //         }
      //       })
      //       console.log(res.status)
      //       setNavLink('/my')
      //       router.push('/my')
      //     } catch (err) {
      //       console.error(err)
      //       setNavLink('/auth/register')
      //       router.push('/auth/register')
      //     }
      //   }
      // }}
      className={`relative text-xs max-sm:px-1 px-2 flex flex-col justify-between rounded-md overflow-hidden items-center border-b-[3px] pb-1 ${path === href ? " border-primary" : "border-transparent"
        }`}
    >
      {/* <span className={`${path === href ? activeIcon : icon} mt-2 max-[410px]:mt-1 text-2xl`}></span> */}
      <div className="mt-2 max-[410px]:mt-1 text-2xl">
        {path === href ? icon : activeIcon}
      </div>
      <p className={`text-xs ${path === href ? "text-primary" : ""}`}>{text}</p>
      {path === href ? (
        <div className="absolute h-full w-full bg-primary opacity-10"></div>
      ) : null}
    </Link>
  );
};

const NavFooter = () => {
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   const getToken = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/profile`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': token
  //         }
  //       })
  //       console.log(res.status)
  //       setNavLink(true)
  //       console.log('navLink:', navLink)
  //     } catch (err) {
  //       console.error(err)
  //       setNavLink(false)
  //       console.log('navLink:', navLink)
  //     }
  //   }
  //   getToken()
  // }, [navLink])

  return (
    <>
      {/* Responsive (Desktop) */}
      {/* <ul className="absolute flex max-[450px]:gap-[25px] gap-11 text-default-50 z-40 inset-y-0 pt-4 px-7 max-[450px]:px-4 max-[450px]:pt-1">
        {lists.map((list, index) => {
          if (index <= 1) {
            return (
              <Pages
                key={index + 1}
                text={list.text}
                href={list.href}
                icon={icons[index].icon}
                activeIcon={icons[index].iconActive}
              />
            );
          }
        })}
      </ul>
      <ul className="absolute flex max-[450px]:gap-[25px] gap-11 text-default-50 z-40 inset-y-0 left-0 pt-4 px-7 max-[450px]:px-4 max-[450px]:pt-1">
        {lists.map((list, index) => {
          if (index > 1) {
            return (
              <Pages
                key={index + 1}
                text={list.text}
                href={index === 3 ? "/profile" : list.href}
                icon={icons[index].icon}
                activeIcon={icons[index].iconActive}
              />
            );
          }
        })}
      </ul> */}
      <ul className="absolute flex gap-3 text-default-50 z-40 inset-y-0 right-0 px-7 max-[385px]:px-3">
        {lists.map((list, index) => {
          if (index <= 1) {
            return (
              <Pages
                key={index + 1}
                text={list.text}
                href={list.href}
                icon={list.icon}
                activeIcon={list.activeIcon}
              />
            );
          }
        })}
      </ul>
      <ul className="absolute flex gap-3 text-default-50 z-40 inset-y-0 left-0 px-7 max-[385px]:px-2">
        {lists.map((list, index) => {
          if (index > 1) {
            return (
              <Pages
                key={index + 1}
                text={list.text}
                // href={index === 3 ? navLink ? '/my' : '/auth/register' : list.href}
                href={list.href}
                icon={list.icon}
                activeIcon={list.activeIcon}
              />
            );
          }
        })}
      </ul>
    </>
  );
};

export default NavFooter;
