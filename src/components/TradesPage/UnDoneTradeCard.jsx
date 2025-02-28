"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";
import { useOrigins } from "@/context/OriginsProvider";

export default function UnDoneTradeCard({ card, setSelectedTrade, getFactor }) {
  const { provinces } = useOrigins();
  let dateFormat = new Date(card.time * 1000);

  return (
    <div className="bg-default-50 cardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span
            className={`text-sm font-semibold ${
              card.type === 0 ? "text-[#178230]" : " text-[#D33C30]"
            }`}
          >
            {card.type === 0 ? " خرید" : " فروش"}
          </span>
          <span className="text-default-700 text-sm">
             {card.load.owner_name}
          </span> 
          <span className="text-default-500 text-xs"> | {dateFormat.toLocaleDateString("fa-IR")}</span>
        </p>

        <div>
          <p className="text-primary text-xs font-bold">
            ({card.status === 0 && "نهایی شده"}
            {card.status === 1 && "در انتظار وزن کشی"}
            {card.status === 2 && "در انتظار پرداخت نهایی"}
            {card.status === 3 && "در انتظار اطلاعات باربری"}
            {card.status === 4 && "در انتظار تایید تخلیه"})
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
        {card.status === 1 ? (
          <button
            className="bg-green-100 rounded-xl w-full h-12 text-default-50 font-bold"
            onClick={() => {
              setSelectedTrade(card);
              document.getElementById(`unDoneTradeBillModal`).showModal();
              getFactor(card.id);
            }}
          >
            مشاهده فاکتور اولیه
          </button>
        ) : card.type === 0 && card.status === 2 ? (
          <button
            className="bg-green-100 rounded-xl w-full h-12 text-default-50 font-bold"
            onClick={() => {
              setSelectedTrade(card);
              document.getElementById(`unDoneTradeBillModal`).showModal();
              getFactor(card.id);
            }}
          >
            مشاهده فاکتور نهایی و پرداخت
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
