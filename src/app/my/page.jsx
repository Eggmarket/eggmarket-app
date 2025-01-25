"use client";
import { useToken } from "@/components/hook/useToken/useToken";
import useUserProfile from "@/components/hook/useUserProfile";
import { useWallet } from "@/context/WalletProvider";
import { useField, useProfile } from "@/store/profileState";
import { trimPrice } from "@/utils/trimPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [myToken, setToken] = useToken();
  const [userProfile, setUserProfile] = useUserProfile();

  const lists = [
    {
      icon: "icon-light-linear-Message-35",
      text: "پیام‌ها",
      href: "messages",
    },
    {
      icon: "icon-light-linear-Dollar-Square",
      text: "پیشنهاد قیمت",
      href: "priceSuggestion",
    },
    {
      icon: "icon-icon-my-ads-1",
      text: "آگهی های من",
      href: "ads",
    },
    {
      icon: "icon-light-linear-Chart",
      text: "معاملات من",
      href: "trades",
    },
    {
      icon: "icon-light-outline-Refresh-1",
      text: "گردش حساب",
      href: "transactions",
    },
    {
      icon: "icon-light-linear-Password-1",
      text: "امنیت",
      href: "/security",
    },
    {
      icon: "icon-icon-avout-us-1",
      text: "درباره اگمارکت",
      href: "aboutUs",
    },
    {
      icon: "icon-icon---Terms-of-use-1",
      text: "شرایط استفاده",
      href: "policy",
    },
    {
      icon: "icon-light-linear-Logout-danger",
      text: "خروج",
      href: "/",
    },
  ];

  const router = useRouter();
  const [profile, setProfile] = useState({});
  // const [token, setToken] = useState("");
  const removeAllProfile = useProfile((state) => state.removeAllProfile);
  const removeAll = useField((state) => state.removeAll);
  const { wallet, loading } = useWallet();

  const saveProfileToLocalStorage = (profileData) => {
    localStorage.setItem("profile", JSON.stringify(profileData));
  };

  const loadProfileFromLocalStorage = () => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  };

  useEffect(() => {
    if (myToken || !profile) {
      const getData = async () => {
        if (myToken) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_EGG_MARKET}API/customers/profile`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: myToken,
                },
                cache: "force-cache",
              }
            );
            const data = await res.json();
            setProfile(data.profile);
            setUserProfile(data.profile);
            saveProfileToLocalStorage(data.profile);
            // console.log('this is the data', data)
          } catch (err) {
            console.error("Failed to fetch profile data:", err);
          }
        } else {
          console.log("no token found");
        }
      };
      getData();
    }
  }, []);

  useEffect(() => {
    console.log("provider", userProfile);
  }, [userProfile]);

  useEffect(() => {
    // console.log(Object.entries(profile).length === 0 ? "true" : "false");
    sessionStorage.clear("current-password");
    console.log("new token", myToken);
  }, [myToken]);
  return (
    // <div className="p-4 flex flex-col items-center max-w-full w-[440px]">
    //     <div className="max-w-[380px]">
    //         <div className="h-[132px] border-solid border-[2px] border-default-400 rounded-xl flex flex-col overflow-hidden">
    //             <div className="h-[73px] pr-3 pl-2 flex items-center justify-between bg-secondary">
    //                 <div className="flex items-center gap-3">
    //                     <span className="icon-light-bold-Profile-Octagon text-[32px]"></span>
    //                     <div>
    //                         <p className="font-semibold">مهدی قمی پور</p>
    //                         <p className="text-default-700 font-normal text-xs mt-1">
    //                             {
    //                                 ["مرغدار", "بنکدار"].join(' - ')
    //                             }
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <span className="icon-light-linear-Left-2 text-2xl"></span>
    //             </div>
    //             <div className="mt-auto py-3 pr-3 pl-2 flex items-center justify-between bg-default-100">
    //                 <div className="flex items-center gap-3">
    //                     <span className="icon-light-outline-Wallet text-2xl"></span>
    //                     <p className="text-default-700">کیف پول</p>
    //                 </div>
    //                 <div className="flex items-center gap-3">
    //                     <p className="text-xl font-semibold text-default-900">۴۵۰.۰۰۰.۰۰۰ <span className="text-default-700 text-xs font-normal">تومان</span></p>
    //                     <span className="icon-light-linear-Left-2 text-2xl"></span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <ul className="max-w-[380px] mt-4 flex flex-col gap-2">
    //         {
    //             lists.map((list, index) => (
    //                 <li className="px-2 rounded-md h-11 flex items-center hover:bg-[#FF79011A] cursor-pointer">
    //                     <span className={`${list.icon} text-2xl text-default-700`}></span>
    //                     <p className="mr-3 font-medium text-default-700">{list.text}</p>
    //                     {index < lists.length - 1 && <span className="mr-auto icon-light-linear-Left-2 text-2xl"></span>}
    //                 </li>
    //             ))
    //         }
    //     </ul>
    // </div>
    <div className="p-4 flex flex-col items-center max-w-full w-[440px]">
      <div className="w-full">
        <div className="h-[132px] border-solid border-[2px] border-default-400 rounded-xl grid grid-rows-[79px_4px_1fr] overflow-hidden">
          <Link
            href="/my/profile"
            className="pr-3 pl-2 flex items-center justify-between bg-gradient"
          >
            <div className="flex items-center gap-3">
              <span className="icon-light-bold-Profile-Octagon text-[32px]"></span>
              <div>
                <p className="font-semibold text-default-900">
                  {profile?.name ? profile.name : ""}
                </p>
                <p className="text-default-700 font-normal text-xs mt-1">
                  {["مرغدار", "بنکدار"].join(" - ")}
                </p>
              </div>
            </div>
            <span className="icon-light-linear-Left-2 text-2xl"></span>
          </Link>
          <div className=""></div>
          <Link
            href="/my/wallet"
            className="mt-auto py-3 pr-3 pl-2 flex items-center justify-between bg-default-100"
          >
            <div className="flex items-center gap-3">
              <span className="icon-light-outline-Wallet text-2xl"></span>
              <p className="text-default-700">کیف پول</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold text-default-900">
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  trimPrice(wallet?.value, ".")
                )}{" "}
                <span className="text-default-700 text-xs font-normal">
                  تومان
                </span>
              </p>
              <span className="icon-light-linear-Left-2 text-2xl"></span>
            </div>
          </Link>
        </div>
      </div>
      <ul className="w-full mt-4 flex flex-col gap-2">
        {lists.map((list, index) => (
          <Link
            href={
              list.href === "/"
                ? "#"
                : list.href === "aboutUs"
                ? "/aboutUs"
                : `/my/${list.href}`
            }
            key={index + 1}
            className="px-2 rounded-md h-11 flex items-center hover:bg-[#FF79011A] cursor-pointer"
            onClick={async () => {
              if (list.href === "/") {
                localStorage.clear("profile");
                removeAllProfile();
                removeAll();
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/logout`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: myToken,
                      },
                      body: JSON.stringify({ myToken }),
                    }
                  );
                  setToken(null);
                  localStorage.removeItem("token");
                  console.log(res.status);
                  try {
                    await fetch(`http://localhost:3000/api/token`, {
                      method: "DELETE",
                    });
                    setToken(null);
                    localStorage.removeItem("token");
                  } catch (err) {
                    console.error(err);
                  }
                  router.push("/");
                } catch (err) {
                  console.error(err);
                }
              }
            }}
          >
            <span className={`${list.icon} text-2xl text-default-700`}></span>
            <p className="mr-3 font-medium text-default-700">{list.text}</p>
            {index < lists.length - 1 && (
              <span className="mr-auto icon-light-linear-Left-2 text-2xl"></span>
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
}
