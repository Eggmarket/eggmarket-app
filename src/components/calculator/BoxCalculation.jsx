"use client";
import { formatPrice } from "@/utils/formatPrice";
import React, { useState } from "react";
import { useRef } from "react";
import CalculateResultModal from "./CalculateResultModal";
import { calculateBoxResult } from "./calculateBoxResult";

const formItems = [
  {
    title: "پایه قیمتی",
    value: "price",
    placeholder: "مثلا ۵۵,۵۰۰",
    required: true,
  },
  {
    title: "وزن کارتن",
    value: "weight",
    placeholder: "مثلا ۱۱.۳",
    required: true,
  },
  {
    title: "تعداد کارتن",
    value: "quantity",
    placeholder: "مثلا ۳۶۰",
    required: true,
  },
  {
    title: "کرایه باربری",
    value: "fee",
    placeholder: "مثلا ۵,۵۰۰,۰۰۰",
    required: false,
  },
];

export default function BoxCalculation({ source }) {
  const feeRef = useRef(null);
  const weightRef = useRef(null);

  const [boxValues, setBoxValues] = useState({
    price: "",
    weight: "",
    quantity: "",
    fee: "",
  });

  const [finalValue, setFinalValue] = useState({
    basePrice: "",
    overallPrice: "",
    boxPrice: "",
    bulkPrice: "",
    eggPrice: "",
  });

  return (
    <>
      <div className="px-6">
        {formItems.map(({ title, value, placeholder, required }, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-4 mb-4"
          >
            <label
              htmlFor={value}
              className={`flex-1 text-default-900 text-sm sm:text-base font-medium ${
                source === "landing" ? "flex-1" : ""
              }`}
            >
              {title}
              {required && <span className="text-xs text-[#D33C30]">*</span>}
            </label>
            <div
              className={`flex-1 flex items-center gap-1 border border-[#C2C2C2] rounded-xl px-2 sm:px-4 focus-within:border-tertiary h-[52px] box-border ${
                source === "landing" ? "flex-1" : "w-3/5"
              }`}
            >
              {index === 1 || index === 2 ? (
                <div className="flex-1">
                  <input
                    type="text"
                    id={`boxCalculation${value}`}
                    placeholder={placeholder}
                    name={value}
                    value={boxValues[value]}
                    onChange={(e) =>
                      setBoxValues({ ...boxValues, [value]: e.target.value })
                    }
                    className="placeholder:text-sm sm:placeholder:text-lg placeholder:text-default-400 w-full bg-inherit outline-none text-default-900 text-sm sm:text-lg"
                  />
                </div>
              ) : (
                <div className="flex-1 relative overflow-hidden whitespace-nowrap">
                  <span
                    ref={index === 0 ? weightRef : feeRef}
                    className="absolute invisible text-default-900 text-lg"
                  >
                    {boxValues[value] || ""}
                  </span>
                  <input
                    type="text"
                    id={`boxCalculation${value}`}
                    placeholder={placeholder}
                    name={value}
                    value={boxValues[value]}
                    className="placeholder:text-sm sm:placeholder:text-lg placeholder:text-default-400 bg-inherit box-content outline-none text-sm sm:text-lg"
                    style={{
                      width: `${
                        boxValues[value]
                          ? `${
                              index === 0
                                ? weightRef.current?.offsetWidth + 15
                                : feeRef.current?.offsetWidth + 15
                            }px`
                          : "100%"
                      }`,
                      maxWidth: `${
                        boxValues[value] ? '"calc(100% - 36px)"' : ""
                      }`,
                    }}
                    onChange={(e) => {
                      if (index === 0 || index === 3) {
                        const formattedValue = formatPrice(e.target.value);
                        setBoxValues({ ...boxValues, [value]: formattedValue });
                      } else {
                        setBoxValues({ ...boxValues, [value]: e.target.value });
                      }
                    }}
                  />
                  {((index === 0 && boxValues[value]) ||
                    (index === 3 && boxValues[value])) && (
                    <span className="text-10px sm:text-sm text-default-400">تومان</span>
                  )}
                </div>
              )}
              {boxValues[value] && (
                <button
                  className="btn btn-xs btn-circle btn-ghost"
                  onClick={() => setBoxValues({ ...boxValues, [value]: "" })}
                >
                  <span className="icon-light-bold-Close text-sm sm:text-xl text-[#2D264B]"></span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 px-6 py-4">
        <button
          onClick={() => {
            document.getElementById("calculateResultModal").showModal();
            setFinalValue(calculateBoxResult(boxValues));
          }}
          className={`button ${
            source === "landing"
              ? "button-primary-2 flex-1"
              : "button-primary w-3/5"
          }  ${
            boxValues.price !== "" &&
            boxValues.weight !== "" &&
            boxValues.quantity !== ""
              ? ""
              : "disabled"
          }`}
          disabled={
            boxValues.price !== "" &&
            boxValues.weight !== "" &&
            boxValues.quantity !== ""
              ? false
              : true
          }
        >
          محاسبه
        </button>
        <button
          className={`border border-default-700 text-sm sm:text-base text-default-700 font-medium rounded-xl ${(source =
            "landing" ? "flex-1" : "w-2/5")}`}
          onClick={() =>
            setBoxValues({
              price: "",
              weight: "",
              quantity: "",
              fee: "",
            })
          }
        >
          پاک کردن فرم
        </button>
      </div>
      <CalculateResultModal finalValue={finalValue} source="box" />
    </>
  );
}
