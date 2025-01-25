import React from "react";
import PriceSuggestionHeader from "./PriceSuggestionHeader";
import { trimPrice } from "@/utils/trimPrice";

function SentPriceSuggestionCard() {
  return (
    <div className="bg-default-50 rounded-xl cardShadow">
      <PriceSuggestionHeader />
      <div className="mt-6 space-y-6">
        <div className="px-6 pb-6 ">
          <div className="mt-4 flex items-center gap-2">
            <p className="text-default-700 text-xs">
              قیمت:{" "}
              <span className="text-xl text-default-900 font-semibold">
                {trimPrice("48500")}
              </span>{" "}
              <span className="text-default-500">تومان</span>
            </p>
            <div className="py-1 px-2 flex gap-3 flex-1">
              <button className="p-1 whitespace-nowrap flex-1 h-11 flex justify-center items-center gap-1 border border-[#3E81E6] rounded-xl">
                <span className="icon-icon---Terms-of-use-3 text-lg text-[#3E81E6]"></span>
                <p className="font-bold text-[#3E81E6]">ویرایش</p>
              </button>
              <button className="p-1 whitespace-nowrap flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                <span className="icon-light-linear-Close text-lg text-danger-900"></span>
                <p className="font-bold text-danger-900">حذف</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentPriceSuggestionCard;
