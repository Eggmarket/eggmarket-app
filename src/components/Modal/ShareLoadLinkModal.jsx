"use client";
import React from "react";
import { useState } from "react";
import BottomModal from "./BottomModal";

function ShareLoadLinkModal({ selectedCard, setSelectedCard = null }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  return (
    <BottomModal
      id="shareLoadModal"
      onClose={() => {
        setSelectedCard !== null && setSelectedCard("");
        setIsLinkCopied("");
      }}
    >
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
      >
        <h3 className="text-sm text-tertiary">ارسال آگهی برای دوستان</h3>
        <button className="btn btn-sm btn-circle btn-ghost">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      <p className="text-default-700 mt-8 px-4 mb-4">ارسال از طریق لینک</p>
      <div className="px-4 mb-4">
        <button
          className={`px-4 w-full flex items-center justify-between rounded-xl border  focus:border-tertiary hover:border-tertiary h-[52px] hover:cursor-pointer ${
            isLinkCopied ? "border-tertiary" : "border-[#C2C2C2]"
          }`}
          disabled={isLinkCopied}
          onClick={() => {
            navigator.clipboard.writeText(
              `http://localhost:3000/load/${selectedCard.loadID}`
            );
            setIsLinkCopied(true);
          }}
        >
          {isLinkCopied ? (
            <span className="icon-light-linear-Tick text-tertiary text-2xl"></span>
          ) : (
            <span className="icon-light-linear-Document-Align-Right-15 text-tertiary text-2xl"></span>
          )}
          <span
            className={`font-sans font-medium text-lg text-left ${
              isLinkCopied ? "text-tertiary" : "text-default-900"
            }`}
          >
            http://localhost:3000/load/{selectedCard.loadID}
          </span>
        </button>
        <p className="text-tertiary my-4 text-sm h-5">
          {isLinkCopied && "لینک کپی شد."}
        </p>
      </div>
    </BottomModal>
  );
}

export default ShareLoadLinkModal;
