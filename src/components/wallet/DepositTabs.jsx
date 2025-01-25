import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import { adjustWidthOfInput } from "@/utils/adjustWidthOfInput";
import Num2persian from "num2persian";
import { useToken } from "../hook/useToken/useToken";
import { toast } from "react-toastify";
import { formatPrice } from "@/utils/formatPrice";
import HistoryModal from "../Modal/HistoryModal";
import moment from "jalali-moment";
import { monthNames } from "../static";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DepositTabs({ updateHandler }) {
  const { push } = useRouter();
  const today = moment().local("fa");
  const [selectedTab, setSelectedTab] = useState(1);
  const [billRegister, setBillRegister] = useState({
    depositValue: "",
    billNumber: "",
    date: {
      day: today.jDate(),
      month: today.jMonth(),
      year: today.jYear(),
    },
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a URL to preview the image
    }
  };

  const depositRef = useRef();
  const [token, setToken] = useToken();

  async function addCredit() {
    setLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_NEW_EGGMARKET}/API/paymethods/pay`,
        {
          paymethod: "sep",
          amount: Number(`${billRegister.depositValue.replace(/,/g, "")}0`),
          // "orderid": 1234,
          // callbackurl: "http://localhost:3000/my/wallet",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(({ data }) => {
        const payForm = document.getElementById("formPay");
        const toeknInput = document.getElementById("tokenInput");
        payForm.setAttribute("action", data[0].params.actionURL);
        toeknInput.setAttribute("value", data[0].params.Token);

        document.getElementById("submitBtn").click();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    // await fetch(`https://new-core.eggmarket.ir/API/paymethods/pay`, {
    //   method: "POST", // Use GET as indicated in your screenshot
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    //   body: JSON.stringify({
    //     paymethod: "sep",
    //     amount: 10000,
    //     // "orderid": 1234,
    //     callbackurl: "http://localhost:3000/my/wallet",
    //   }), // Send data as JSON in the body
    // })
    //   .then((response) => {
    //     const data = response.json();

    //     toast("شارژ کیف پول با موفقیت انجام شد.", { autoClose: 2000 });
    //     // updateHandler();
    //     document.getElementById("depositModal").close();
    //     setLoading(false);
    //     setBillRegister({
    //       depositValue: "",
    //       billNumber: "",
    //       date: "",
    //       imageUrl: "",
    //     });
    //   })
    //   .then((data) => {
    //     console.log(data);

    //     push(`=${data.params.actionUrl}?token=${data.params.token}`);
    //     console.log("Success:", data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setLoading(false);
    //   });
  }

  return (
    <>
      <form method="post" id="formPay" className="hidden">
        <input type="hidden" name="Token" id="tokenInput" />
        <button id="submitBtn"></button>
      </form>
      <div className="pt-4 flex-1 bg-surface-secondary">
        <div role="tablist" className="tabs flex tabs-lifted *:text-base">
          <a
            role="tab"
            className={`tab flex-1 text-default-500 [--tab-border-color:#F5F5F5] ${
              selectedTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => {
              setSelectedTab(1);
              setBillRegister({ ...billRegister, depositValue: "" });
            }}
          >
            واریز آنی
          </a>
          <a
            role="tab"
            className={`tab flex-1 text-default-500 [--tab-border-color:#F5F5F5] ${
              selectedTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => {
              setSelectedTab(2);
              setBillRegister({ ...billRegister, depositValue: "" });
            }}
          >
            ثبت فیش واریزی
          </a>
        </div>
        <div
          className={`py-6 px-4 bg-default-50 rounded-b-xl h-full min-h-[304px] ${
            selectedTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {selectedTab === 1 ? (
            <div className="px-8 pt-10 bg-default-50 ">
              <p className="text-default-700 text-sm mb-4">
                مبلغ مورد نظر برای افزایش موجودی را وارد کنید
              </p>
              <DepositValueDiv
                depositRef={depositRef}
                billRegister={billRegister}
                setBillRegister={setBillRegister}
              />
              <p className="text-sm text-default-400">
                {billRegister.depositValue.replace(/,/g, "").length >= 4 &&
                  `${Num2persian(
                    billRegister.depositValue.replace(/,/g, "") * 10
                  )} ریال`}
              </p>
            </div>
          ) : (
            <>
              <DepositValueDiv
                depositRef={depositRef}
                billRegister={billRegister}
                setBillRegister={setBillRegister}
              />
              <div className="flex relative items-center w-full my-4 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50 px-4 focus-within:border-tertiary h-[50px]">
                <input
                  type="text"
                  id="billInput"
                  className={`flex-1 text-default-900 font-black outline-none bg-inherit placeholder:text-default-400 placeholder:font-normal`}
                  value={billRegister.billNumber}
                  onChange={(e) =>
                    setBillRegister({
                      ...billRegister,
                      billNumber: e.target.value,
                    })
                  }
                  placeholder=" شماره فیش"
                />
                {billRegister.billNumber && (
                  <button
                    className="btn btn-xs btn-circle btn-ghost"
                    onClick={() =>
                      setBillRegister({ ...billRegister, billNumber: "" })
                    }
                  >
                    <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
                  </button>
                )}
              </div>
              <button
                className="flex items-center relative w-full mb-4 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50 px-4 focus-within:border-tertiary h-[50px] "
                onClick={() =>
                  document.getElementById("depositByBillDate").showModal()
                }
              >
                <p className="text-default-900 font-black flex-1 text-right">
                  {billRegister.date.year}/{billRegister.date.month + 1}/
                  {billRegister.date.day}
                </p>
                <span className="icon-light-linear-Calender-1 text-xl text-[#2D264B]"></span>
              </button>
              <div className="flex justify-between relative w-full mb-2 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50">
                <span className="text-default-400 py-3 px-6">
                  {billRegister.imageUrl
                    ? billRegister.imageUrl
                    : " بارگذاری تصویر فیش واریزی"}
                </span>
                {/* <input
                  type="file"
                  accept="image/"
                  className="placeholder:text-default-50 placeholder:font-medium bg-tertiary rounded-l-xl px-4"
                  placeholder="انتخاب تصویر"
                  onChange={handleImageChange}
                /> */}
              </div>
            </>
          )}
        </div>
      </div>
      <form
        method="dialog"
        className="flex-0 bg-white border-t-default-300 modalShadow px-6 py-4 w-full"
      >
        {selectedTab === 1 ? (
          <Button
            type="button-primary"
            text="افزایش موجودی"
            onClick={() => addCredit()}
            width="w-full"
            disabled={
              !billRegister.depositValue ||
              billRegister.depositValue === "0" ||
              loading
            }
          />
        ) : (
          <Button
            type="button-primary"
            text="ثبت"
            onClick={() => {}}
            width="w-full"
            disabled={
              !billRegister.depositValue ||
              !billRegister.billNumber ||
              !billRegister.date ||
              !billRegister.imageUrl ||
              billRegister.depositValue === "0"
            }
          />
        )}
      </form>
      <HistoryModal
        id="depositByBillDate"
        dateValue={billRegister.date}
        setDateValue={(value) =>
          setBillRegister({
            ...billRegister,
            date: {
              year: value.year,
              month: monthNames.findIndex(value.month),
              day: value.day,
            },
          })
        }
      />
    </>
  );
}

const DepositValueDiv = ({ depositRef, billRegister, setBillRegister }) => {
  return (
    <div className="flex gap-1 items-center relative mb-2 w-full rounded-xl border border-[#C2C2C2] bg-default-50 focus-within::bg-white focus-within:border-tertiary h-[50px] px-4">
      <div className="flex-1 relative overflow-hidden whitespace-nowrap">
        <span
          ref={depositRef}
          className="absolute invisible text-default-900 text-lg"
        >
          {billRegister.depositValue || ""}
        </span>
        <input
          type="text"
          placeholder="مبلغ (تومان)"
          id="walletDepositInput"
          value={billRegister.depositValue}
          className="placeholder:text-default-400 bg-inherit text-[#178230] font-black placeholder:font-normal placeholder:text-lg box-content outline-none text-lg"
          style={{
            width: `${
              billRegister.depositValue
                ? `${depositRef.current?.offsetWidth + 15}px`
                : "100%"
            }`,
            maxWidth: "calc(100% - 40px)",
          }}
          onChange={(e) =>
            setBillRegister({
              ...billRegister,
              depositValue: formatPrice(e.target.value),
            })
          }
        />
        {billRegister.depositValue && (
          <span className="text-xs text-default-500 font-medium">تومان</span>
        )}
      </div>
      {billRegister.depositValue && (
        <button
          className="btn btn-xs btn-circle btn-ghost"
          onClick={() => setBillRegister({ ...billRegister, depositValue: "" })}
        >
          <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
        </button>
      )}
    </div>
  );
};
