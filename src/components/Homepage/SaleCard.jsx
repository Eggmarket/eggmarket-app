"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import Badge from "../UI/Badge";
import moment from "jalali-moment";
import { priceWithDot } from "@/utils/priceWithDot";
import { useProductDetail } from "@/store/productDetail";
import { useToken } from "../hook/useToken/useToken";
import { useRouter } from "next/navigation";

export default function SaleCard({
  load,
  province,
  setSelectedCard = null,
  source = "",
}) {
  const [detail, setDetail] = useState({});

  const addProduct = useProductDetail((state) => state.addProduct);
  const [token, setToken] = useToken();
  const router = useRouter();

  const {
    loadID,
    description,
    details,
    origin_field2,
    reg_date,
    reg_just_date,
    status,
  } = load;

  const today = moment().locale("fa");

  const date = moment(reg_date?.split(" ")[0], "YYYY-MM-DD").locale("fa");
  const time = moment(reg_date, "YYYY-MM-DD HH:mm:ss").locale("fa");

  const hourDiffer = today.hour() - time.hour();

  useEffect(() => {
    setDetail({
      quantity:
        details.find((item) => item.title === "تعداد کارتن")?.value || "",
      yolk: details.find((item) => item.title === "نوع زرده")?.value || "",
      print: details.find((item) => item.title === "نوع پرینت")?.value || "",
      quality: details.find((item) => item.title === "کیفیت")?.value || "",
      pack: details.find((item) => item.title === "نوع بسته بندی")?.value || "",
      price: details.find((item) => item.title === "قیمت")?.value || "",
      weight: details.find((item) => item.title === "وزن کارتن")?.value || "",
      brand: details.find((item) => item.title === "نام مجموعه")?.value || "",
      city: province?.title,
    });
  }, [load]);

  return (
    <div
      className={`${
        status === "sold"
          ? "bg-purple-100"
          : source === "landing"
          ? "bg-surface-secondary"
          : "bg-default-50"
      } cardShadow border border-default-200 pt-4 rounded-md mb-6`}
    >
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setSelectedCard && setSelectedCard(load);
              document.getElementById("shareLoadModal").showModal();
            }}
            className="icon-Share text-base text-tertiary"
          ></button>
          <p>
            <span className="text-default-500 text-xs ml-1">برند</span>
            <span className="text-tertiary text-sm">{detail.brand}</span>
          </p>
        </div>
        <p className="text-default-500 text-xs">
          {date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
            ? hourDiffer < 1
              ? "کمتر از 1 ساعت پیش"
              : `${hourDiffer} ساعت پیش`
            : date.format("YYYY/MM/DD")}
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="flex gap-1 items-center">
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {detail.weight}
            </span>
            <span className="text-xs text-default-500">کیلو</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {detail.quantity}
            </span>
            <span className="text-xs text-default-500">کارتن</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-base text-default-900 ml-1">
              {origin_field2}
            </span>
            <span className="text-xs text-default-500">
              ({province?.title})
            </span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap items-stretch mt-4">
          {detail.print && <Badge text={detail.print} />}
          {detail.yolk && <Badge text={detail.yolk} />}
          {detail.quality && <Badge text={detail.quality} />}
          {detail.pack && <Badge text={detail.pack} />}
        </div>
        <p className="text-xs text-default-900 limitText mt-4">{description}</p>
      </div>
      {source !== "landing" && (
        <>
          <div
            className={`text-center flex items-center justify-center gap-1 border-t border-t-default-200 pt-2 ${
              detail.price && detail.price !== "توافقی"
                ? "flex-row"
                : "flex-row-reverse"
            }`}
          >
            <span className="font-semibold text-base text-default-900">
              {detail.price && detail.price !== "توافقی"
                ? priceWithDot(detail.price)
                : "توافقی"}
            </span>
            <span className="text-default-500 text-xs">
              {detail.price && detail.price !== "توافقی" ? "تومان" : "قیمت"}
            </span>
          </div>
          <div
            className={`flex items-center px-5 pb-4 gap-3 mt-3 ${
              status === "sold" ? "justify-center" : ""
            }`}
          >
            {status === "sold" ? (
              <div className="font-bold text-sm text-default-50 leading-5 rounded-[4px] bg-green-100 px-2">
                فروخته شد
              </div>
            ) : (
              <>
                <Button
                  type="button-primary"
                  text="خرید"
                  width="flex-1"
                  // disabled={
                  //   detail.price && detail.price !== "توافقی" ? false : true
                  // }
                  onClick={() => {
                    if (token) {
                      setSelectedCard !== null && setSelectedCard(loadID);
                      document.getElementById("modal_buy").showModal();
                      // const all = detail
                      addProduct({ details: detail, load: load.loadID });
                    } else {
                      router.push("/auth/register");
                    }
                  }}
                />
                <Button
                  type="button-primary-ghost"
                  text="پیشنهاد قیمت"
                  width="flex-1"
                  onClick={() => {
                    setSelectedCard !== null && setSelectedCard(loadID);
                    document.getElementById("priceSuggestionModal").showModal();
                  }}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
