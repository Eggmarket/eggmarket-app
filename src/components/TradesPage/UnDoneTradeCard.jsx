"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";
import { useOrigins } from "@/context/OriginsProvider";
import axios from "axios";
import { useToken } from "../hook/useToken/useToken";

const billData = [
  { title: "کد رهگیری", value: "۱۴۰۳۰۹۹۰۹۱۳۰۴۰۷۳۷۳۵۴۹۱۰۰۰۹۴۰۷" },
  { title: "شماره بارنامه", value: "۱۴۰۳/۱۱ | ۹۹۰۹۱۳" },
  { title: "شماره ماشین", value: "۱۶ | ۱۵۳ ع ۳۴" },
  { title: "شماره تماس راننده", value: "۰۹۱۲ ۳۴۵ ۶۷۸۹" },
  { title: "شماره فاکتور", value: "۱۴۰۳۰۷۱۴۰۰۴-۲" },
  { title: "مقصد", value: "تهران" },
  { title: "فی بار", value: "۴۹,۵۰۰" },
  { title: "مبلغ کل", value: "۲۵۷,۵۰۰,۰۰۰" },
];

export default function UnDoneTradeCard({ card, setSelectedTrade, getFactor }) {
  const { provinces } = useOrigins();

  return (
    <div className="bg-default-50 cardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span className="text-default-500 text-xs ml-1">برند</span>
          <span className="text-default-700 text-sm">
            {card.load.owner_name}
          </span>
          <span
            className={`text-sm font-semibold ${
              card.status === "sold" ? "text-[#178230]" : " text-[#D33C30]"
            }`}
          >
            {card.type === 0 ? "(خرید)" : "(فروش)"}
          </span>
        </p>

        <div>
          <p className="text-primary text-xs font-bold">
            ({card.status === 0 && "نهایی شده"}
            {card.status === 1 && "پرداخت علی الحساب"}
            {card.status === 2 && "پرداخت تسویه"}
            {card.status === 3 && "اطلاعات ارسال"}
            {card.status === 4 && "تایید تخلیه"})
          </p>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex gap-1 items-center">
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {card.load.weight}
            </span>
            <span className="text-xs text-default-500">کیلو</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {card.load.count}
            </span>
            <span className="text-xs text-default-500">کارتن</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {card.load.origin_field2}
            </span>
            <span className="text-xs text-default-500">
              {
                provinces.find((item) => item.id === card.load.origin_field1)
                  ?.title
              }
            </span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap items-stretch my-4">
          {card.load.print_type && <Badge text={card.load.print_type} />}
          {card.load.yolk_type && <Badge text={card.load.yolk_type} />}
          {card.load.quality && <Badge text={card.load.quality} />}
        </div>
        <p className="text-xs text-default-900 limitText">
          {card.load.description}
        </p>
      </div>
      <div className="px-4">
        <button
          className="bg-green-100 rounded-xl w-full h-12 text-default-50 font-bold"
          onClick={() => {
            setSelectedTrade(card);
            document.getElementById(`unDoneTradeBillModal`).showModal();
            getFactor(card.id);
          }}
        >
          مشاهده فاکتور و پرداخت
        </button>
      </div>
    </div>
  );
}
