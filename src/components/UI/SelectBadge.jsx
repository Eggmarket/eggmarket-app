import React from "react";

export default function SelectBadge({ badge, onClose }) {
  return (
    <div className="carousel-item flex items-center gap-2 px-2 rounded-3xl border border-danger-500 bg-danger-100 h-[30px]">
      <p className="text-default-700 text-sm text-nowrap">{badge.title}</p>
      <button onClick={() => onClose(badge)} className="h-4 w-4">
        <span className="icon-light-linear-Close-Circle text-danger-500"></span>
      </button>
    </div>
  );
}
