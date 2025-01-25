"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";
import moment from "jalali-moment";

export default function MyAdCard({ card, provinces, setSelected }) {
  const [detail, setDetail] = useState({});
  const {
    description,
    details,
    origin_field2,
    reg_date,
    status,
    owner_name: brand,
  } = card;

  const today = moment().locale("fa");
  let date = moment(reg_date, "YYYY-MM-DD HH:mm:ss")
    .locale("fa")
    .format("YYYY-MM-DD");
  let time = moment(reg_date, "YYYY-MM-DD HH:mm:ss").locale("fa").hour();

  const hourDiffer = today.hour() - time;

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
    });
  }, [card]);

  return (
    <div
      className={`${
        status === "sold" || status === "expired"
          ? "bg-purple-100"
          : "bg-default-50"
      } cardShadow border border-default-200 py-4 rounded-lg mb-4`}
    >
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span className="text-default-500 text-xs ml-1">برند</span>
          <span className="text-default-700 text-sm">{brand}</span>
        </p>
        {status === "sold" && (
          <div className="font-bold text-sm text-default-50 leading-5 rounded-[4px] bg-green-100 px-2">
            فروخته شد
          </div>
        )}
        {status === "expired" && (
          <div className="font-bold text-sm text-default-50 leading-5 rounded-[4px] bg-danger-500 px-2">
            حذف شده
          </div>
        )}
        <p className="text-default-500 text-xs">
          {date === today.format("YYYY-MM-DD")
            ? hourDiffer < 1
              ? "کمتر از 1 ساعت پیش"
              : `${hourDiffer} ساعت پیش`
            : date}
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="flex  gap-1 items-center">
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
            <span className="text-xl font-semibold text-default-900 ml-1">
              {origin_field2}
            </span>
            <span className="text-xs text-default-500">
              {provinces?.find((item) => item.id === card.origin_field1)?.title}
            </span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap items-stretch my-4">
          {detail.pack && <Badge text={detail.pack} />}
          {detail.quality && <Badge text={detail.quality} />}
          {detail.yolk && <Badge text={detail.yolk} />}
          {detail.print && <Badge text={detail.print} />}
        </div>
        <p className="text-xs text-default-900 limitText">{description}</p>
      </div>
      <div
        className={`text-center flex items-center justify-center gap-1 pt-2 ${
          detail.price && detail.price !== "توافقی"
            ? "flex-row"
            : "flex-row-reverse"
        }`}
      >
        <span className="font-semibold text-2xl text-default-900">
          {detail.price && detail.price !== "توافقی" ? detail.price : "توافقی"}
        </span>
        <span className="text-default-500 text-xs">
          {detail.price && detail.price !== "توافقی" ? "تومان" : "قیمت"}
        </span>
      </div>
      <div className="flex items-center px-5 mt-3 gap-6 text-sm font-bold">
        {status === "expired" ? (
          ""
        ) : status === "sold" ? (
          <button disabled className="text-default-400">
            ویرایش آگهی
          </button>
        ) : (
          <button
            onClick={() => {
              setSelected(card);
              document.getElementById("editAdModal").showModal();
            }}
            className="text-tertiary"
          >
            ویرایش آگهی
          </button>
        )}
        {status === "expired" ? (
          ""
        ) : status === "sold" ? (
          <button disabled className="text-default-700">
            حذف آگهی
          </button>
        ) : (
          <button
            onClick={() => {
              setSelected(card);
              document.getElementById("deleteAdModal").showModal();
            }}
            className="text-tertiary"
          >
            حذف آگهی
          </button>
        )}
      </div>
    </div>
  );
}
