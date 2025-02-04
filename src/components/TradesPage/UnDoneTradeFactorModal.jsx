import React, { useEffect, useRef, useState } from "react";
import BottomModal from "../Modal/BottomModal";
import Button from "../UI/Button";
import { useOrigins } from "@/context/OriginsProvider";
import { handleSaveAsImage } from "@/utils/handleSaveAsImage";
import { Axios } from "@/axios";
import { toast } from "react-toastify";
import { trimPrice } from "@/utils/trimPrice";

const billData = [
  { title: "کد رهگیری", value: "bill_of_lading_number" },
  // { title: "شماره بارنامه", value: "۱۴۰۳/۱۱ | ۹۹۰۹۱۳" },
  { title: "شماره ماشین", value: "plate_number" },
  { title: "شماره تماس راننده", value: "driver_phone" },
  // { title: "شماره فاکتور", value: "۱۴۰۳۰۷۱۴۰۰۴-۲" },
  { title: "مقصد", value: "destination" },
  // { title: "فی بار", value: "scale_weight" },
  { title: "وزن باسکول", value: "scale_weight" },
  // { title: "مبلغ کل", value: "۲۵۷,۵۰۰,۰۰۰" },
];

function UnDoneTradeFactorModal({
  setSelectedTrade,
  factor,
  getUserPendingTrades,
  getUserDoneTrades,
}) {
  const { provinces } = useOrigins();
  const tableRef = useRef(null);

  const completePayment = async () => {
    const response = await Axios.post(`/API/transactions/complete-payment`, {
      factor_id: factor.id,
    });
    if (response.status === 200) {
      toast.info("پرداخت نهایی شما انجام شد.");
      document.getElementById("unDoneTradeBillModal").close();
      getUserPendingTrades();
      getUserDoneTrades();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <BottomModal id="unDoneTradeBillModal" onClose={() => setSelectedTrade("")}>
      <form method="post" id="formPay" className="hidden">
        <input type="hidden" name="Token" id="tokenInput" />
        <button id="submitBtn"></button>
      </form>
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300 bg-default-50"
      >
        <h3 className="text-sm text-tertiary">
          فاکتور {factor.status === 1 ? "اولیه" : "نهایی"}
        </h3>
        <button className="btn btn-sm btn-circle btn-ghost">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      {factor && (
        <div ref={tableRef} className="flex flex-col gap-5 px-6 py-2">
          <div className="flex gap-1 items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {factor.load.owner_name}
            </span>
            <span className=" bg-default-900 h-4 w-px"></span>
            <span className="flex items-center">
              <span className="text-xl font-semibold text-default-900 ml-1">
                {factor.load.weight}
              </span>
              <span className="text-xs text-default-500">کیلو</span>
            </span>
            <span className=" bg-default-900 h-4 w-px"></span>
            <span className="flex items-center">
              <span className="text-xl font-semibold text-default-900 ml-1">
                {factor.load.count}
              </span>
              <span className="text-xs text-default-500">کارتن</span>
            </span>
            <span className=" bg-default-900 h-4 w-px"></span>
            <span className="flex items-center">
              <span className="text-xl font-semibold text-default-900 ml-1">
                {factor.load.origin_field2}
              </span>
              <span className="text-xs text-default-500">
                {
                  provinces.find(
                    (item) => item.id === factor.load.origin_field1
                  )?.title
                }
              </span>
            </span>
          </div>
          {billData.map((item, index) => (
            <div className="flex justify-between items-center" key={index + 1}>
              <p className="text-sm text-default-500">{item.title}</p>
              <p className="text-base font-semibold text-default-900">
                {factor[item.value] || "--"}
              </p>
            </div>
          ))}
          {factor.status === 2 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-default-500">قیمت نهایی</p>
                <p className="text-base font-semibold text-default-900">
                  {trimPrice(factor.fianl_price) || "--"}{" "}
                  <span className="text-10px text-default-500">تومان</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-default-500">پیش پرداخت</p>
                <p className="text-base font-semibold text-default-900">
                  {trimPrice(factor.pre_purchase_amount) || "--"}{" "}
                  <span className="text-10px text-default-500">تومان</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-default-500">باقیمانده</p>
                <p className="text-base font-semibold text-default-900">
                  {trimPrice(factor.fianl_price - factor.pre_purchase_amount) ||
                    "--"}{" "}
                  <span className="text-10px text-default-500">تومان</span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {factor.status === 2 && factor.type === 0 && (
        <div className="mt-5 px-6">
          <Button
            text="پرداخت از کیف پول"
            type="text-success border-solid border-[2px] border-success w-full"
            onClick={() => completePayment()}
          />
        </div>
      )}
      <form method="dialog" className="flex gap-4 px-6 py-4">
        <Button
          type="button-primary"
          text="ذخیره"
          width="w-3/5"
          onClick={() => handleSaveAsImage(tableRef, "فاکتور")}
        />
        <Button type="button-primary-error" text="بستن" width="w-2/5" />
      </form>
    </BottomModal>
  );
}

export default UnDoneTradeFactorModal;
