import React from "react";

export default function SearchBox({ text, setSearchTerm, value }) {
  return (
    <div className="flex gap-2 items-center rounded-xl border border-default-400 h-[50px] px-4">
      <span className="icon-Search text-2xl"></span>
      <input
        className="text-base text-default-400 w-full outline-none bg-inherit"
        placeholder={`جستجوی ${text}...`}
        value={value}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {value && (
        <button
          className="btn btn-xs btn-circle btn-ghost"
          onClick={() => setSearchTerm("")}
        >
          <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
        </button>
      )}
    </div>
  );
}
