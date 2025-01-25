"use client";
import bg from "@/image/bg.svg";
import Image from "next/image";
import egg from "@/image/egg.svg";
import NavFooter from "./navFooter";
import CreateNewAd from "../createNewAd/CreateNewAd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "../hook/useToken/useToken";
import BottomModal from "../Modal/BottomModal";
import WarningIcon from "@/components/svg/WarningIcon.svg";
import Button from "../UI/Button";

const Footer = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [token, setToken] = useToken();

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      setProfile(data.profile);
    } catch (err) {
      console.error("data failed:", err);
    }
  };
  return (
    // Responsive (Desktop)
    // <div className="w-full fixed bottom-0 max-md:block hidden">
    //   <Image src={bg} alt="bg" className="w-full" />
    //   <button
    //     className="max-[450px]:scale-[0.9] scale-[1.5] max-[450px]:bottom-[28%] bottom-[60%] absolute translate-x-[-51%] left-[50%]"
    //     onClick={() => {
    //       document.getElementById(`adModal`).showModal();
    //       setIsOpen(true);
    //     }}
    //   >
    //     <Image src={egg} alt="egg" />
    //     <span className="icon-icon-new-ad-empty text-2xl absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"></span>
    //   </button>
    //   <Modal id="adModal" onClose={() => setIsOpen(false)}>
    //     {isOpen && <CreateNewAd />}
    //   </Modal>
    //   <p className="absolute left-[50%] translate-x-[-45%] bottom-[5px] font-medium text-xs text-default-300 max-[361px]:text-[10px]">
    //     اعلام بار کن!
    //   </p>
    //   <NavFooter />
    // </div>
    <div className="w-full max-w-[440px] fixed bottom-0 left-[50%] translate-x-[-50%]">
      <Image src={bg} alt="bg" className="w-full" />
      <button
        className="max-sm:scale-[0.9] scale-[1.1] max-sm:bottom-[28%] bottom-[42%] absolute translate-x-[-51%] left-[50%]"
        onClick={() => {
          if (!token) {
            router.push("/auth/register");
          } else {
            getData();
            if (false) {
              document.getElementById("accessWarningModal").showModal();
            } else {
              document.getElementById(`adModal`).showModal();
            }
          }
        }}
      >
        <Image src={egg} alt="egg" />
        <span className="icon-icon-new-ad-empty text-2xl absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"></span>
      </button>

      <BottomModal id="accessWarningModal">
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-3 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">نبود دسترسی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <div className="py-3 px-6">
          <Image
            src={WarningIcon}
            height={50}
            width={50}
            alt="warning"
            className="mx-auto"
          />
          <p className="text-sm font-semibold mt-3 mb-4">
            شما هنوز مجاز به اعلام بار نیستید. لطفاً با پشتیبانی تماس بگیرید:
          </p>
          <p className="text-sm font-semibold" dir="ltr">
            ۰۲۵ - ۳۲۹۴ ۲۶۱۳
          </p>
        </div>
        <form method="dialog" className="flex gap-3 w-full px-6 py-3">
          <a
            href="tel:00982532942613"
            className="button button-primary-2 flex-1 text-center"
            dir="ltr"
          >
            تماس با پشتیبانی
          </a>
          <button className="border border-tertiary rounded-xl text-tertiary font-bold h-12 flex-1">
            بستن
          </button>
        </form>
      </BottomModal>

      <CreateNewAd profile={profile} />
      <p className="absolute left-[50%] translate-x-[-45%] bottom-[5px] font-medium text-xs text-default-300 max-[361px]:text-[10px]">
        اعلام بار کن!
      </p>
      <NavFooter />
    </div>
  );
};

export default Footer;
