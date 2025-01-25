"use client";
import React from "react";
import Button from "../UI/Button";
import { useState } from "react";
import { useRef } from "react";
import { formatPrice } from "@/utils/formatPrice";
import BottomModal from "./BottomModal";

function PriceSuggestionModal({ selectedCard, setSelectedCard = null }) {
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const suggestedPriceRef = useRef();
  return (
    <BottomModal
      id="priceSuggestionModal"
      onClose={() => {
        setSelectedCard && setSelectedCard("");
        setSuggestedPrice("");
      }}
    >
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
      >
        <h3 className="text-sm text-tertiary">پیشنهاد قیمت</h3>
        <button className="btn btn-sm btn-circle btn-ghost">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      <div className="p-8">
        <div>
          <p className="font-medium text-sm mb-4">قیمت پیشنهادی</p>
          <div className="flex items-center gap-2 w-full rounded-xl border border-[#C2C2C2] focus-within:border-tertiary mb-14 h-[52px] px-4">
            <div className="flex gap-1 items-center relative overflow-hidden flex-1">
              <span
                ref={suggestedPriceRef}
                className="absolute invisible text-default-900 whitespace-nowrap"
              >
                {suggestedPrice || ""}
              </span>
              <input
                type="text"
                id={`suggestedPrice`}
                placeholder="مبلغ (تومان)"
                name="suggestedPrice"
                value={suggestedPrice}
                className="placeholder:text-default-400 bg-inherit placeholder:font-normal"
                style={{
                  width: `${
                    suggestedPrice
                      ? `${suggestedPriceRef.current.offsetWidth + 15}px`
                      : "100%"
                  }`,
                  maxWidth: "calc(100% - 40px)",
                }}
                onChange={(e) => {
                  const formattedValue = formatPrice(e.target.value);
                  setSuggestedPrice(formattedValue);
                }}
              />
              {suggestedPrice && (
                <span className="text-default-default-900 whitespace-nowrap">
                  تومان
                </span>
              )}
            </div>
            {suggestedPrice && (
              <button
                className="btn btn-xs btn-circle btn-ghost"
                onClick={() => setSuggestedPrice("")}
              >
                <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
              </button>
            )}
          </div>
        </div>
        <Button
          type="button-primary"
          text="ثبت قیمت پیشنهادی"
          width="w-full"
          disabled={!suggestedPrice}
          onClick={() => {}}
        />
      </div>
    </BottomModal>
  );
}

export default PriceSuggestionModal;
