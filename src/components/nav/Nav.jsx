"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgTemp from "../svg/SvgTemp";
import SvgPrice from "../svg/SvgPrice";
import SvgCalc from "../svg/SvgCalc";
import SvgProfile from "../svg/SvgProfile";

export const lists = [
  {
    text: "آگهی ها",
    href: "/",
    icon: <SvgTemp />,
    activeIcon: <SvgTemp active={true} />,
  },
  {
    text: "قیمت روز",
    href: "/price",
    icon: <SvgPrice />,
    activeIcon: <SvgPrice active={true} />,
  },
  {
    text: "ماشین حساب",
    href: "/calculator",
    icon: <SvgCalc />,
    activeIcon: <SvgCalc active={true} />,
  },
  {
    text: "پروفایل",
    // href: '/auth/register',
    href: "/my",
    icon: <SvgProfile />,
    activeIcon: <SvgProfile active={true} />,
  },
];

const Nav = () => {
  const path = usePathname();
  return (
    <ul className="flex gap-7 text-default-100">
      {lists.map((list, index) => (
        <Link
          href={list.href}
          key={index + 1}
          className={`hover:text-primary ${
            path === list.href
              ? "text-primary underline underline-offset-[20px] decoration-2 cursor-default"
              : ""
          }`}
        >
          {list.text}
        </Link>
      ))}
    </ul>
  );
};

export default Nav;
