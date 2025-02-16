"use client";

import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/store/productDetail";
import { toast } from "react-toastify";
import { trimPrice } from "@/utils/trimPrice";
import BottomModal from "./BottomModal";
import ScrollBar from "../UI/ScrollBar";
import { Axios } from "@/axios";
import { useOrigins } from "@/context/OriginsProvider";

const BuyModal = ({ load, setSelectedCard = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prePurchasePrice, setPrePurchasePrice] = useState(0);
  const router = useRouter();
  const product = useProductDetail((state) => state.product);
  const [list, setList] = useState("");
  const { provinces } = useOrigins();

  const payFromWallet = async () => {
    const response = await Axios.post("/API/transactions/purchase", {
      load_id: load.loadID,
    });
    if (response.status === 200) {
      toast.info("بار شما خریداری شد.");
      router.push("/my/trades");
    } else if (response.status === 400) {
      toast.error("موجودی کیف پول شما کافی نیست");
      document.getElementById("modal_buy").close();
    } else if (response.status === 403) {
      const errorData = await response.json(); // Parse the error response
      toast.error(
        `Authorization Error: ${
          errorData.message || "You are not authorized to perform this action."
        }`
      );
    } else {
      // Handle other errors
      console.error("Error occurred:", response);
      toast.error("Unexpected error occurred. Please try again.");
    }
  };

  const onlinePay = async () => {
    setIsLoading(true);
    if (prePurchasePrice > 200000000) {
    }
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/paymethods/pay`,
      {
        paymethod: "sep",
        amount:
          prePurchasePrice > Number(200000000) ? 200000000 : prePurchasePrice,
      }
    );
    if (response.status === 200) {
      toast.info(response.data[0].message);
      const payForm = document.getElementById("formPay");
      const toeknInput = document.getElementById("tokenInput");
      payForm.setAttribute("action", response.data[0].params.actionURL);
      toeknInput.setAttribute("value", response.data[0].params.Token);
      document.getElementById("submitBtn").click();
      localStorage.setItem(
        "paymentStatus",
        prePurchasePrice > Number(200000000)
          ? `${Number(prePurchasePrice) - 200000000}`
          : "done"
      );
      localStorage.setItem("prePurcahsedId", load.loadID);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("مشکلی در درخواست وجود دارد");
      console.log(error);
    }
  };

  async function getPrePurchasePrice() {
    const response = await Axios.post(
      "/API/transactions/determination-purchase-amount",
      {
        count: Number(
          load.details.find((item) => item.title === "تعداد کارتن").value
        ),
      }
    );
    if (response.status === 200) {
      setPrePurchasePrice(response.data.amount);
    }
  }

  useEffect(() => {
    if (load) {
      setList([
        {
          name: "فی بار",
          text: load.details.find((item) => item.title === "قیمت")
            ? load.details.find((item) => item.title === "قیمت").value
            : "توافقی",
          second: "تومان",
        },
        {
          name: "مبلغ کل",
          text: load.details.find((item) => item.title === "قیمت")
            ? trimPrice(
                Number(
                  load.details.find((item) => item.title === "قیمت").value
                ) *
                  Number(product.details?.quantity) *
                  Number(product.details?.weight)
              )
            : "",
          second: "تومان",
        },
      ]);
      getPrePurchasePrice();
    }
  }, [load]);

  return (
    <BottomModal
      id="modal_buy"
      onClose={() => setSelectedCard && setSelectedCard("")}
    >
      <form method="post" id="formPay" className="hidden">
        <input type="hidden" name="Token" id="tokenInput" />
        <button id="submitBtn"></button>
      </form>
      <form
        method="dialog"
        className="p-4 flex justify-between items-center border-b border-default-300"
      >
        <p className="text-tertiary">پیش‌فاکتور</p>
        <button className="icon-light-bold-Close text-2xl"></button>
      </form>
      {product && (
        <div className="px-6">
          <ul className="flex flex-col gap-2 mt-2">
            <div className="py-[6px]">
              {
                <p className="font-medium">
                  {product.details?.weight}
                  <span className="text-xs text-default-500">کیلو</span> |{" "}
                  {product.details?.quantity}
                  <span className="text-xs text-default-500">کارتن</span> |{" "}
                  {load?.origin_field2}
                  <span className="text-xs text-default-500">
                    (
                    {
                      provinces?.find((item) => item.id === load.origin_field1)
                        ?.title
                    }
                    )
                  </span>
                </p>
              }
            </div>
            {list &&
              list.map((item, index) => (
                <li
                  key={index + 1}
                  className="flex justify-between items-center h-9"
                >
                  <p className="text-sm font-normal text-default-500">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-default-900">
                      {item.text}
                    </p>
                    <p className="text-sm font-normal text-default-500">
                      {item.second}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
          <div className="mt-1 mx-4 h-[109px] bg-tertiary rounded-xl flex flex-col items-center justify-center gap-2 pb-2 pt-4">
            <p className="text-sm font-normal text-default-300">
              مبلغ علی‌الحساب پرداختی
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[32px] text-default-50 font-semibold">
                {trimPrice(prePurchasePrice)}{" "}
                <span className="text-sm font-light">تومان</span>
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
              text="پرداخت آنلاین"
              disabled={isLoading ? true : false}
              type="bg-success text-default-50 font-normal h-12"
              onClick={() => onlinePay()}
            />
            <Button
              text="پرداخت از کیف پول"
              type="text-success border-solid border-[2px] border-success h-12"
              onClick={() => payFromWallet()}
            />
            <form method="dialog" className="w-full col-span-2">
              <Button text="لغو" type="w-full text-danger-900" />
            </form>
          </div>
        </div>
      )}
    </BottomModal>
  );
};

export default BuyModal;
