import Link from "next/link";
import React from "react";
import footerLanding from "../../../public/assets/images/landing-footer.svg";
import telegram from "../../../public/assets/images/telegram.svg";
import instagram from "../../../public/assets/images/instagram.svg";
import whatsapp from "../../../public/assets/images/whatsapp.svg";
import aparat from "../../../public/assets/images/aparat.svg";
import Image from "next/image";

const LandingFooter = () => {
  const lists = [
    {
      name: "آگهی‌ها",
      link: "/",
    },
    {
      name: "قیمت روز",
      link: "/price",
    },
    {
      name: "ماشین حساب",
      link: "/calculator",
    },
    {
      name: "درباره اگمارکت",
      link: "",
    },
    {
      name: "شرایط استفاده",
      link: "",
    },
  ];

  const socialIcons = [
    {
      image: aparat,
      link: "",
      alt: "aparat",
    },
    {
      image: instagram,
      link: "",
      alt: "instagram",
    },
    {
      image: whatsapp,
      link: "",
      alt: "whatsapp",
    },
    {
      image: telegram,
      link: "",
      alt: "telegram",
    },
  ];

  return (
    <div>
      <div className="bg-default-900 pt-8 pb-4 px-12">
        <div className="flex justify-between">
          <ul className="flex flex-col gap-2">
            {lists.map((value, index) => (
              <li key={index}>
                <Link
                  className="font-normal text-xs text-white"
                  href={value.link}
                >
                  {value.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="self-end flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <p className="text-xs font-normal text-white" dir="ltr">
                ۰۲۵ - ۳۲۹۴ ۲۶۱۳
              </p>
              <span className="icon-light-linear-Call"></span>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-xs font-normal text-white" dir="ltr">
                ۰۲۵ - ۳۲۹۴ ۲۶۱۳
              </p>
              <span className="icon-light-linear-Message-35-white"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#272727]">
        <div className="py-4 flex flex-col items-center justify-center gap-3">
          <div>
            <Image src={footerLanding} />
          </div>
          <p className="text-xs font-thin text-white">
            تمام حقوق برای{" "}
            <span className="font-semibold">سامانه پیروزه دیبا</span> محفوظ است.{" "}
          </p>
          <div className="flex items-center gap-2">
            {socialIcons.map((value, index) => (
              <Link href={value.link} key={index}>
                <Image src={value.image} alt={value.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
