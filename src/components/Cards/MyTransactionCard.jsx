import { trimPrice } from "@/utils/trimPrice";
import React from "react";

export default function MyTransactionCard({ item }) {
  let dateFormat = new Date(item.time * 1000);
  return (
    <div className="bg-[#F5F5F5] rounded-xl px-4 py-2 mb-2">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-default-700 font-normal">
          {item.type === 0 && item.reason === 0
            ? "پیش خرید بار"
            : item.type === 0 && item.reason === 3
            ? "برداشت از کیف پول"
            : item.type === 1 && item.reason === 1
            ? "پیش فروش بار"
            : item.type === 1 && item.reason === 2
            ? "فروش  بار"
            : item.type === 1 && item.reason === 4
            ? "واریز به کیف پول"
            : ""}
        </span>
        <span className="text-10px text-default-500">
          {dateFormat.getHours()}:{dateFormat.getMinutes()} -{" "}
          {dateFormat.toLocaleDateString("fa-IR")}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-10px text-default-500">ش. پیگیری ۰۳۲۱۲۳۱۰۴</span>
        <p
          className={`flex items-center gap-1 ${
            item.type ? "text-[#178230]" : "text-[#D33C30]"
          } `}
        >
          <span className="font-medium ">
            {trimPrice(item.amount, ".")}
            {`${item.type ? "+" : "-"}`}
          </span>
          <span className="text-[10px]">تومان</span>
        </p>
      </div>
    </div>
  );
}
