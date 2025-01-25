"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";
import { useOrigins } from "@/context/OriginsProvider";

export default function DoneTradeCard({ card, setSelectedTrade, getFactor }) {
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
          <button
            className="flex gap-1 items-center border border-tertiary rounded-3xl font-semibold text-sm py-1 px-3"
            onClick={() => {
              setSelectedTrade(card);
              getFactor(card.id, "finalTradeBillModal");
            }}
          >
            <span className="icon-light-linear-Document-Justify-Right-1 text-base text-tertiary"></span>
            <span>فاکتور</span>
          </button>
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
        <div className="stext-center flex items-center justify-center gap-1 pt-2 flex-row">
          <span className="font-semibold text-2xl text-default-900">
            {card.load.price}
          </span>
          <span className="text-default-500 text-xs">تومان</span>
        </div>
      </div>
    </div>
  );
}
