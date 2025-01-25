"use client";
import PriceSuggestionHeader from "@/components/PriceSuggestion/PriceSuggestionHeader";
import ReceivedPriceSuggestionCard from "@/components/PriceSuggestion/ReceivedPriceSuggestionCard";
import SentPriceSuggestionCard from "@/components/PriceSuggestion/SentPriceSuggestionCard";
import { trimPrice } from "@/utils/trimPrice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import priceSuggestion from "../../../components/svg/priceSuggestion";

export default function Page() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="sticky top-0 bg-inherit px-4 pt-8 pb-6 gap-4 flex justify-start items-center z-10">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">پیشنهاد قیمت</h3>
      </div>
      <div className="flex flex-col">
        <div role="tablist" className="tabs tabs-lifted flex px-4">
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-success font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            پیشنهادهای دریافتی
          </a>
          <a
            role="tab"
            className={`flex-1 tab [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-[#3772CC] font-medium"
                : "text-default-500"
            }`}
            onClick={() => setActiveTab(2)}
          >
            پیشنهادهای ارسالی
          </a>
        </div>
        <div className="flex-1 rounded-b-xl px-4">
          <div
            className={`h-3 w-full bg-default-50 ${
              activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
            }`}
          ></div>
          {activeTab === 1 ? (
            <div className="space-y-6">
              <ReceivedPriceSuggestionCard />
            </div>
          ) : (
            <div className="space-y-6">
              <SentPriceSuggestionCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
