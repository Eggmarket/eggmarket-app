import React, { useRef } from "react";
import Button from "../UI/Button";
import BottomModal from "../Modal/BottomModal";
import { useOrigins } from "@/context/OriginsProvider";
import { handleSaveAsImage } from "@/utils/handleSaveAsImage";

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

function DoneTradeFactorModal({ setSelectedTrade, factor }) {
  const { provinces } = useOrigins();
  const tableRef = useRef(null);

  return (
    <BottomModal id="finalTradeBillModal" onClose={() => setSelectedTrade("")}>
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300 bg-default-50"
      >
        <h3 className="text-sm text-tertiary">فاکتور نهایی</h3>
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
                {factor[item.value]}
              </p>
            </div>
          ))}
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

export default DoneTradeFactorModal;
