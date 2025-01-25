import { useOrigins } from "@/context/OriginsProvider";
import React from "react";

export default function Provinces({ provinceClickHandler }) {
  const { provinces } = useOrigins();
  return (
    <div className="provincesList">
      {provinces.map((province) => (
        <button
          key={province.id}
          onClick={() => provinceClickHandler(province)}
          className="w-full flex justify-between items-center pb-4 mb-4 line"
        >
          <div className="text-base font-medium text-default-700">
            {province.title}
          </div>
          <span className="icon-light-bold-Left-2 text-default-700 text-2xl"></span>
        </button>
      ))}
    </div>
  );
}
