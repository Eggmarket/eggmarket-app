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
import axios from "axios";
import { Axios } from "@/axios";

export default function DepositTabs({
  billRegister,
  setBillRegister,
  updateHandler,
}) {
  const j = moment();
  const today = moment().local("fa");
  const [selectedTab, setSelectedTab] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    document.getElementById("frame").src = URL.createObjectURL(
      event.target.files[0]
    );
    // if (file) {
    setBillRegister({ ...billRegister, selectedImage: event.target.files[0] }); // Create a URL to preview the image
    // }
  };

  const depositRef = useRef();
  const imageSelector = useRef();
  const [token, setToken] = useToken();

  async function addCredit() {
    setLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/paymethods/pay`,
        {
          paymethod: "sep",
          amount: Number(`${billRegister.depositValue.replace(/,/g, "")}`),
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
        toast.error("مشکلی در درخواست وجود دارد");
        console.log(error);
      });
  }

  async function addDepositRequest() {
    const j = moment(
      `${billRegister.date.year}-${billRegister.date.month}-${billRegister.date.day}`,
      "jYYYY-jM-jD"
    );

    const formData = new FormData();
    formData.append("amount", billRegister.depositValue.replace(/,/g, ""));
    formData.append("invoice_number", billRegister.billNumber);
    formData.append(
      "invoice_date",
      new Date(j.format("YYYY-M-D")).getTime() / 1000
    );
    formData.append("invoice_pic", billRegister.selectedImage);
    const response = await Axios.post(
      "/API/payment-request/add-deposit-request",
      formData
    );
    setBillRegister({
      depositValue: "",
      billNumber: "",
      date: {
        day: today.jDate(),
        month: monthNames[today.jMonth()],
        year: today.jYear(),
      },
      selectedImage: "",
    });
    if (response.status === 200) {
      updateHandler();
      toast.info("فیش شما ثبت شد.");
    } else if (response.status === 400) {
      toast.warning(response.data[0]);
    } else {
      toast.error("فیش شما ثبت نشد.");
    }
  }

  return (
    <>
      <form method="post" id="formPay" className="hidden">
        <input type="hidden" name="Token" id="tokenInput" />
        <button id="submitBtn"></button>
      </form>
      <div className="pt-4 flex-1 bg-surface-secondary">
        <div
          role="tablist"
          className="tabs flex tabs-lifted text-xs tabs-custom"
        >
          <a
            role="tab"
            className={`tab flex-1 text-default-500 [--tab-border-color:#F5F5F5] ${
              selectedTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => {
              setSelectedTab(1);
              setBillRegister({
                depositValue: "",
                billNumber: "",
                date: {
                  day: today.jDate(),
                  month: monthNames[today.jMonth()],
                  year: today.jYear(),
                },
                selectedImage: "",
              });
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
              setBillRegister({
                depositValue: "",
                billNumber: "",
                date: {
                  day: today.jDate(),
                  month: monthNames[today.jMonth()],
                  year: today.jYear(),
                },
                selectedImage: "",
              });
            }}
          >
            ثبت فیش واریزی
          </a>
        </div>
        <div
          className={`pt-3 sm:pt-10 pb-2 px-8 bg-default-50 rounded-b-xl h-full min-h-[300px] sm:min-h-[360px] ${
            selectedTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {selectedTab === 1 ? (
            <>
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
            </>
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
                className="flex items-center relative w-full mb-4 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50 px-4 focus-within:border-tertiary h-12 sm:h-[50px]"
                onClick={() =>
                  document.getElementById("depositByBillDate").showModal()
                }
              >
                <p className="text-default-900 font-black flex-1 text-right">
                  {billRegister.date.year}/
                  {monthNames.indexOf(billRegister.date.month) + 1}/
                  {billRegister.date.day}
                </p>
                <span className="icon-light-linear-Calender-1 text-xl text-[#2D264B]"></span>
              </button>
              <label
                className={`flex items-center ${
                  billRegister.selectedImage
                    ? "justify-center"
                    : "justify-between"
                } relative w-full mb-2 rounded-xl border border-[#C2C2C2] bg-default-50 cursor-pointer h-[100px] py-2.5 px-4`}
                htmlFor="fileInput"
              >
                <span
                  className={`text-default-400 ${
                    billRegister.selectedImage ? "hidden" : "block"
                  }`}
                >
                  بارگذاری تصویر فیش واریزی
                </span>
                <img
                  id="frame"
                  src=""
                  className={
                    billRegister.selectedImage
                      ? "block self-center aspect-square max-h-20 justify-self-center"
                      : "hidden"
                  }
                />
                <div
                  className={`relative self-center ${
                    billRegister.selectedImage ? "hidden" : "block"
                  }`}
                >
                  <span className="icon-light-linear-Camera-1 text-2xl text-tertiary"></span>
                  <span className="text-tertiary text-2xl absolute -top-4 -right-4">
                    +
                  </span>
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/"
                className="hidden"
                ref={imageSelector}
                onChange={handleImageChange}
              />
              {/*  */}
            </>
          )}
        </div>
      </div>
      <form
        method="dialog"
        className="sticky bg-default-50 border-t-default-300 modalShadow px-6 py-4 w-full"
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
            onClick={() => addDepositRequest()}
            width="w-full"
            disabled={
              !billRegister.depositValue ||
              !billRegister.billNumber ||
              !billRegister.date ||
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
              month: value.month,
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
