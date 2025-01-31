import React, { useRef, useState } from "react";

function PriceInput({ name, inputRef, onChange }) {
  return (
    <div className="bg-inherit relative flex flex-col gap-2 col-span-2">
      <label className="font-medium text-base text-default-900">
        قیمت <span className="font-medium text-sm">(تومان)</span>
      </label>
      <div className="relative overflow-hidden border border-[#C2C2C2] rounded-xl h-[50px] bg-default-50">
        <input
          type="text"
          id="priceInput"
          placeholder="مثلا ۴۵,۰۰۰"
          name={name}
          ref={inputRef}
          className="placeholder:text-base placeholder:text-default-400 bg-inherit box-content outline-none h-full px-4"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default PriceInput;
