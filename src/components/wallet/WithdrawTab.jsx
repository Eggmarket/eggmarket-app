import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import Num2persian from "num2persian";
import { adjustWidthOfInput } from "@/utils/adjustWidthOfInput";
import { formatPrice } from "@/utils/formatPrice";

const options = [
  { number: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶", bankName: "کشاورزی" },
  { number: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶", bankName: "کشاورزی" },
];

export default function WithdrawTab() {
  const [withdrawValues, setWithdrawValues] = useState({
    value: "",
    accountInfo: { number: "", bankName: "" },
  });
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef();
  const withdrwRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-default-700 text-sm mb-4">
            مبلغ مورد نظر برای نقد کردن موجودی را وارد کنید
          </p>
          <div className="flex gap-1 items-center relative mb-2 w-full rounded-xl border border-[#C2C2C2] bg-default-50 focus-within::bg-white focus-within:border-tertiary h-[50px] px-4">
            <div className="flex-1 relative overflow-hidden whitespace-nowrap">
              <span
                ref={withdrwRef}
                className="absolute invisible text-default-900 text-lg"
              >
                {withdrawValues.value || ""}
              </span>
              <input
                type="text"
                id="walletWithdrawInput"
                placeholder="مبلغ (تومان)"
                value={withdrawValues.value}
                className="placeholder:text-default-400 text-[#D33C30] text-lg font-black placeholder:font-normal bg-inherit   placeholder:text-lg box-content outline-none"
                style={{
                  width: `${
                    withdrawValues.value
                      ? `${withdrwRef.current?.offsetWidth + 15}px`
                      : "100%"
                  }`,
                  maxWidth: "calc(100% - 40px)",
                }}
                onChange={(e) =>
                  setWithdrawValues({
                    ...withdrawValues,
                    value: formatPrice(e.target.value),
                  })
                }
              />
              {withdrawValues.value && (
                <span className="text-xs text-default-500 font-medium">
                  تومان
                </span>
              )}
            </div>
            {withdrawValues.value && (
              <button
                className="btn btn-xs btn-circle btn-ghost"
                onClick={() =>
                  setWithdrawValues({ ...withdrawValues, value: "" })
                }
              >
                <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
              </button>
            )}
          </div>
          <p className="text-sm text-default-400">
            {withdrawValues.value.replace(/,/g, "").length >= 4 &&
              `${Num2persian(
                withdrawValues.value.replace(/,/g, "") * 10
              )} ریال`}
          </p>
        </div>
        <div>
          <p className="text-default-700 text-sm mb-4">شماره شبای واریزی</p>
          <div
            className={`custom--dropdown-container bg-default-50 border-[#C2C2C2] withdrawTab ${
              showMenu && "border-tertiary"
            }`}
          >
            <div
              ref={inputRef}
              onClick={() => setShowMenu(!showMenu)}
              className="dropdown-input justify-end"
            >
              <div className="dropdown-selected-value flex items-center justify-end w-full">
                <p>{withdrawValues.accountInfo.number}</p>
                <span className="text-xs text-default-500 mr-1">IR</span>
              </div>
              <span className="icon-Open-List text-default-700 text-base"></span>
            </div>
            {showMenu && (
              <div className="dropdown-menu alignment--auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setWithdrawValues({
                        ...withdrawValues,
                        accountInfo: option,
                      });
                    }}
                    className="dropdown-item flex justify-between"
                  >
                    <span className="text-default-900 text-sm">
                      {option.bankName}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs text-default-500 mr-1">IR</span>
                      <span className="text-xs text-default-900">
                        {option.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <form
        method="dialog"
        className="flex-0 bg-white border-t-default-300 modalShadow px-6 py-4 w-full"
      >
        <Button
          type="button-primary"
          text="ثبت درخواست وجه"
          onClick={() => {}}
          width="w-full"
          disabled={
            !withdrawValues.value ||
            !withdrawValues.accountInfo ||
            withdrawValues.value === "0"
          }
        />
      </form>
    </>
  );
}
