import Image from "next/image";
import React from "react";
import notReadSuggest from "@/components/svg/notReadSuggest.svg";
import notReadTrx from "@/components/svg/notReadTrx.svg";
import notReadTrade from "@/components/svg/notReadTrade.svg";
import notReadSystem from "@/components/svg/notReadSystem.svg";
const filters = [
  { id: 0, title: "همه پیام‌ها", icon: "" },
  {
    id: 1,
    title: "پیشنهاد قیمت",
    icon: "icon-icon-my-ads-1",
    notRead: notReadSuggest,
  },
  {
    id: 2,
    title: "تراکنش‌ها",
    icon: "icon-light-bold-Dollar-Square",
    notRead: notReadTrx,
  },
  {
    id: 3,
    title: "معاملات",
    icon: "icon-light-linear-Chart",
    notRead: notReadTrade,
  },
  {
    id: 4,
    title: "پیام سیستم",
    icon: "icon-light-linear-Display-4",
    notRead: notReadSystem,
  },
];

export default function MessageCard({
  data,
  setClicked,
  selectedMessages,
  setSelectedMessages,
}) {
  const { time, id, title, description, status, type } = data;
  const holdDuration = 500; // Hold duration in milliseconds
  let holdTimeout = null;

  const handlePointerDown = () => {
    // Start a timeout to enter selection mode on long press
    holdTimeout = setTimeout(() => {
      if (!selectedMessages.includes(id)) {
        setSelectedMessages((prev) => [...prev, id]);
      }
      holdTimeout = null; // Reset timeout after selecting
    }, holdDuration);
  };

  const handlePointerUpOrLeave = () => {
    // Clear the hold timeout to avoid unintentional long-press logic
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
  };

  const handleClick = () => {
    console.log("here");

    if (selectedMessages.length > 0) {
      // Toggle selection state
      setSelectedMessages((prev) => {
        const newSelection = prev.includes(id)
          ? prev.filter((messageId) => messageId !== id) // Unselect if already selected
          : [...prev, id]; // Select if not selected

        return newSelection;
      });
    } else {
      // Main functionality if not in selection mode
      document.getElementById("messageModal").showModal();
      setClicked(data);
    }
  };

  return (
    <li
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onClick={handleClick}
      className={`w-full line flex items-start mb-2 gap-2 p-2 rounded-lg hover:cursor-pointer hover:bg-default-50 ${
        selectedMessages.includes(id) ? "bg-[#F1EFF5]" : ""
      }`}
    >
      {selectedMessages.includes(id) ? (
        <span className="icon-light-bold-Tick-Circle text-xl text-tertiary"></span>
      ) : status ? (
        type !== 4 ? (
          <span
            className={`${filters[type].icon} text-default-700 text-xl`}
          ></span>
        ) : (
          <div className="h-[18px] w-[18px] border border-default-700 rounded-md flex items-center justify-center">
            <span
              className={`${filters[type].icon} text-default-700 text-xs`}
            ></span>
          </div>
        )
      ) : (
        <Image src={filters[type].notRead} height={20} width={20} alt="icon" />
      )}

      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <p
            className={`text-default-900 text-sm ${
              status ? "" : " font-extrabold"
            }`}
          >
            {title}
          </p>
          {!status && <span className="h-1 w-1 bg-primary rounded-full"></span>}
        </div>
        <p
          className={`limitText text-start text-default-500 text-xs ${
            status ? "" : " font-extrabold"
          }`}
        >
          {description}
        </p>
      </div>
      <p
        className={`text-default-500 text-xs ${
          status ? "font-medium" : " font-extrabold"
        }`}
      >
        {time}
      </p>
    </li>
  );
}
