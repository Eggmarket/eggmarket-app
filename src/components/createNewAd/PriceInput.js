import { formatPrice } from "@/utils/formatPrice";
import React, { useRef, useState } from "react";

function PriceInput() {
  const [price, setPrice] = useState();
  const priceRef = useRef();
  return (
    <div className="bg-inherit relative flex flex-col gap-2 col-span-2">
      <label className="font-medium text-base text-default-900">
        قیمت <span className="font-medium text-sm">(تومان)</span>
      </label>
      <div className="relative overflow-hidden border border-[#C2C2C2] rounded-xl h-[50px] bg-default-50">
        <span
          ref={priceRef}
          className="absolute invisible text-default-900 text-lg"
        >
          {price || ""}
        </span>
        <input
          type="text"
          id="priceInput"
          placeholder="مثلا ۴۵,۰۰۰"
          value={price}
          className="placeholder:text-base placeholder:text-default-400 bg-inherit box-content outline-none h-full px-4"
          style={{
            width: `${
              price ? `${priceRef.current?.offsetWidth + 15}px` : "100%"
            }`,
            maxWidth: "calc(100% - 36px)",
          }}
          onChange={(e) => {
            const formattedValue = formatPrice(e.target.value);
            setPrice(formattedValue);
          }}
        />
        {price && <span className="text-sm text-default-400">تومان</span>}
      </div>
    </div>
  );
}

export default PriceInput;
