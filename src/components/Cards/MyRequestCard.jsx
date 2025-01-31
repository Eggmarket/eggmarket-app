import { trimPrice } from "@/utils/trimPrice";
import moment from "jalali-moment";
import React from "react";

export default function MyRequestCard({ item }) {
  const date = new Date(item.updated_at * 1000);
  const j = moment(`${date.toLocaleDateString()}`);

  return (
    <div className="bg-[#F5F5F5] rounded-xl px-4 py-2 mb-2">
      <div className="mb-2 flex justify-between items-center">
        <span
          className={`text-xs ${
            item.type ? "text-[#178230]" : "text-[#D33C30]"
          }`}
        >
          {item.type ? "واریز" : "برداشت"}
        </span>
        <span className="text-10px text-default-500" dir="ltr">
          {j.format("jYYYY/jMM/jDD")} - {date.getHours()}: {date.getMinutes()}
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
