import React from "react";
import MultiRangeSlider from "../UI/MultirangeSlider";

export default function Weight({ selected, setSelected }) {
  return (
    <div className="pt-5 flex flex-col gap-5 items-center">
      <div className="flex gap-4 items-center">
        <p className="text-base font-semibold text-default-500">از</p>
        <input
          dir="ltr"
          className="outline-none border-b border-default-300 text-32px w-[150px] font-black text-black"
          value={selected.min.toFixed(1)}
          onChange={(e) => {
            setSelected(
              "weight",
              {
                min: Number(e.target.value),
                max: selected.max,
              },
              "replace"
            );
          }}
        />
        <p className="text-base font-semibold text-default-500">کیلوگرم</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-base font-semibold text-default-500">تا</p>
        <input
          dir="ltr"
          className="outline-none border-b border-default-300 text-32px w-[150px] font-black text-black"
          value={selected.max.toFixed(1)}
          onChange={(e) => {
            e.preventDefault();
            setSelected(
              "weight",
              {
                min: selected.min,
                max: Number(e.target.value),
              },
              "replace"
            );
          }}
        />
        <p className="text-base font-semibold text-default-500">کیلوگرم</p>
      </div>
      <MultiRangeSlider
        min={8}
        max={14}
        value={selected}
        onChange={(min, max) => {
          setSelected(
            "weight",
            {
              min,
              max,
            },
            "replace"
          );
        }}
      />
    </div>
  );
}
