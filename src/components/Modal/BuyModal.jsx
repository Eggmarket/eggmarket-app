"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/store/productDetail";
import { useToken } from "../hook/useToken/useToken";
import { toast } from "react-toastify";
import { trimPrice } from "@/utils/trimPrice";
import BottomModal from "./BottomModal";
import ScrollBar from "../UI/ScrollBar";

const BuyModal = ({ load, setSelectedCard = null }) => {
  const router = useRouter();
  const product = useProductDetail((state) => state.product);
  const [myToken, setToken] = useToken();
  // const weight =
  //   load.details?.find((item) => item.title === "وزن کارتن")?.value || "";
  // const quantity =
  //   load.details?.find((item) => item.title === "تعداد کارتن")?.value || "";
  // const price =
  //   load.details?.find((item) => item.title === "قیمت")?.value || "";
  const lists = [
    {
      name: "کد رهگیری",
      text: "--",
    },
    {
      name: "شماره بارنامه",
      text: "--",
    },
    {
      name: "شماره ماشین",
      text: "--",
    },
    {
      name: "شماره تماس راننده",
      text: "--",
    },
    {
      name: "شماره فاکتور",
      text: "۱۴۰۳۰۷۱۴۰۰۴-۱",
    },
    {
      name: "مقصد",
      text: "تهران",
      second: "(تهران)",
    },
    {
      name: "فی بار",
      text: "۴۹,۵۰۰",
      second: "تومان",
    },
    {
      name: "مبلغ کل",
      text: "۲۵۷,۵۰۰,۰۰۰",
      second: "تومان",
    },
  ];

  const payFromWallet = async () => {
    try {
      const raw = JSON.stringify({
        load_id: product.load,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: myToken,
          },
          body: raw,
        }
      );

      if (res.status === 200) {
        const data = await res.json(); // Parse JSON for success response
        router.push("/buy");
      } else if (res.status === 400) {
        toast.error("موجودی کیف پول شما کافی نیست");
        document.getElementById("modal_buy").close();
      } else if (res.status === 403) {
        const errorData = await res.json(); // Parse the error response
        toast.warning(
          `Authorization Error: ${
            errorData.message ||
            "You are not authorized to perform this action."
          }`
        );
      } else {
        const errorData = await res.json(); // Handle other errors
        console.error("Error occurred:", errorData);
        toast.warning(
          `${
            errorData.message || "Unexpected error occurred. Please try again."
          }`
        );
      }
    } catch (error) {
      // Catch unexpected errors
      console.error("Unexpected error:", error);
      toast.error(`مشکلی در سامانه وجود دارد`);
    }
  };

  return (
    <BottomModal
      id="modal_buy"
      onClose={() => setSelectedCard && setSelectedCard("")}
    >
      <form
        method="dialog"
        className="p-4 flex justify-between items-center border-b border-default-300"
      >
        <p className="text-tertiary">پیش‌فاکتور</p>
        <button className="icon-light-bold-Close text-2xl"></button>
      </form>
      {product && (
        <ScrollBar>
          <div className="mt-2">
            <ul className="flex flex-col gap-2">
              <div className="py-[6px]">
                {
                  <p className="font-medium">
                    {`${product.details?.city} | ${product.details?.weight}`}
                    <span className="text-xs text-default-500">
                      {" "}
                      کیلو
                    </span> | {product.details?.quantity}
                    <span className="text-xs text-default-500">
                      {" "}
                      کارتن
                    </span> | {product.details?.city}{" "}
                    <span className="text-xs text-default-500">
                      ({product.details?.city})
                    </span>
                  </p>
                }
              </div>
              {lists.map((list, index) => (
                <li
                  key={index + 1}
                  className="flex justify-between items-center h-9"
                >
                  <p className="text-sm font-normal text-default-500">
                    {list.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-default-900">
                      {list.text}
                    </p>
                    <p className="text-sm font-normal text-default-500">
                      {list.second}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-1 mx-4 h-[109px] bg-tertiary rounded-xl flex flex-col items-center justify-center gap-2 pb-2 pt-4">
            <p className="text-sm font-normal text-default-300">
              مبلغ علی‌الحساب پرداختی
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[32px] text-default-50 font-semibold">
                {Number(product.details?.quantity) <= 180
                  ? trimPrice(100000000, ",")
                  : Number(product.details?.quantity) % 180 === 0
                  ? trimPrice(
                      Math.trunc(Number(product.details?.quantity) / 180) *
                        100000000,
                      ","
                    )
                  : trimPrice(
                      Math.trunc(Number(product.details?.quantity) / 180 + 1) *
                        100000000,
                      ","
                    )}
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2 mt-5 text-default-500 font-normal text-xs">
            <li className="flex items-center gap-2">
              <span className="text-[6px] icon-light-bold-Record-input"></span>
              بعد از بارگیری و اعلام وزن باسکول، مبلغ دقیق تعیین می‌گردد.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[6px] icon-light-bold-Record-input"></span>
              کم و زیاد شدن ۱۰۰ گرمی وزن بار، طبق عرف بازار پذیرفته شده است.
            </li>
          </ul>
          <div className="grid grid-cols-2 items-center justify-center gap-4 mt-5 pb-4">
            <Button
              text={"پرداخت آنلاین"}
              type={"bg-success text-default-50 font-normal"}
            />
            <Button
              text={"پرداخت از کیف پول"}
              type={"text-success border-solid border-[2px] border-success"}
              onClick={async () => {
                await payFromWallet();
              }}
            />
            <form method="dialog" className="w-full col-span-2">
              <Button text={"لغو"} type={"w-full text-danger-900"} />
            </form>
          </div>
        </ScrollBar>
      )}
    </BottomModal>
  );
};

export default BuyModal;
