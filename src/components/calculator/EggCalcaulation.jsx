"use client";
import React, { useState } from "react";

const eggmarketBasedItems = [
  {
    title: "لوکس",
    value: "lux",
    default: "500",
  },
  {
    title: "زرده",
    value: "yolk",
    default: "1500",
  },
  {
    title: "پرینت دومینو",
    value: "dominoPrint",
    default: "200",
  },
  {
    title: "بدون پرینت",
    value: "withoutPrint",
    default: "-400",
  },
  {
    title: "یک ماهه",
    value: "oneMonth",
    default: "1500",
  },
];

export default function EggCalcaulation({ values, setValues }) {
  return (
    <>
      <div className="px-16">
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="weight" className="text-default-900 font-medium">
            وزن کارتن
            <span className="text-xs text-[#D33C30]">*</span>
          </label>
          <div className="flex items-center gap-1 px-2 border border-[#C2C2C2] rounded-[10px] placeholder:text-default-400 focus-within:border-tertiary w-24 h-12">
            <input
              type="number"
              placeholder="مثلا ۱۱.۳"
              name="weight"
              className="text-lg bg-inherit w-full"
              value={values.weight}
              onChange={(e) => setValues({ ...values, weight: e.target.value })}
            />
            {values.weight && (
              <button
                className="btn btn-xs btn-circle btn-ghost"
                onClick={() => setValues({ ...values, weight: "" })}
              >
                <span className="icon-light-bold-Close text-base text-[#2D264B]"></span>
              </button>
            )}
          </div>
        </div>
        <div>
          {eggmarketBasedItems.map((item, index) => (
            <div className="flex justify-between mb-4" key={index + 1}>
              {item.value === "dominoPrint" || item.value === "withoutPrint" ? (
                <RadioButtonGroup
                  data={item}
                  setValues={setValues}
                  values={values}
                />
              ) : (
                <CheckBox data={item} setValues={setValues} values={values} />
              )}
              {item.value === "oneMonth" ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setValues({ ...values, oneMonthValue: e.target.value })
                  }
                  value={values.oneMonth ? values.oneMonthValue : "1500"}
                  className={`text-lg py-1 px-1 border border-[#C2C2C2] rounded-[10px] w-24 text-center focus-within:border-tertiary ${
                    values[item.value] || values.print === item.value
                      ? "text-default-900"
                      : "text-default-400"
                  }`}
                />
              ) : (
                <div
                  className={`text-lg py-1 px-1 border border-[#C2C2C2] rounded-[10px] w-24 text-center ${
                    values[item.value] || values.printType === item.value
                      ? "text-default-900"
                      : "text-default-400"
                  }`}
                >
                  {item.default}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 px-6">
        <button
          onClick={() =>
            document.getElementById("calculateResultModal").showModal()
          }
          className={`button button-primary w-3/5 ${
            values.weight !== "" ? "" : "disabled"
          }`}
          disabled={values.weight !== "" ? false : true}
        >
          محاسبه
        </button>
        <button
          className="border border-default-700 text-default-700 font-medium rounded-xl w-2/5"
          onClick={() =>
            setValues({
              weight: "",
              lux: false,
              yolk: false,
              print: "",
              oneMonth: false,
            })
          }
        >
          پاک کردن فرم
        </button>
      </div>
    </>
  );
}

function CheckBox({ data, setValues, values }) {
  return (
    <label className="label cursor-pointer gap-2 justify-start p-0">
      <input
        checked={values[data.value]}
        onChange={(e) => {
          setValues({ ...values, [data.value]: !values[data.value] });
        }}
        type="checkbox"
        className="checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)]"
      />
      <span
        className={`flex-1 text-sm ${
          values[data.value] ? "text-[#4F4A45]" : "text-[#AAAAAA]"
        } `}
      >
        {data.title}
      </span>
    </label>
  );
}

const RadioButtonGroup = ({ data, values, setValues }) => {
  return (
    <label className="label cursor-pointer gap-2 justify-start p-0">
      <input
        checked={values.printType === data.value ? true : false}
        onChange={(e) => {
          setValues({ ...values, printType: data.value });
        }}
        type="checkbox"
        className="checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)]"
      />
      <span
        className={`flex-1 text-sm ${
          values[data.value] ? "text-[#4F4A45]" : "text-[#AAAAAA]"
        } `}
      >
        {data.title}
      </span>
    </label>
  );
};
