import React, { useRef } from "react";
import BottomModal from "../Modal/BottomModal";
import { trimPrice } from "@/utils/trimPrice";
import { handleSaveAsImage } from "@/utils/handleSaveAsImage";

function CalculateResultModal({ finalValue }) {
  const tableRef = useRef();

  return (
    <BottomModal id="calculateResultModal">
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-3 px-6 border-b border-default-300 bg-default-50"
      >
        <h3 className="text-sm text-tertiary">قیمت تمام شده</h3>
        <button className="btn btn-sm btn-circle btn-ghost">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      <div className="bg-default-50 pt-8 px-8 pb-2">
        <div ref={tableRef} className="mb-8">
          <div className="border border-default-300 rounded-lg *:border-b *:border-default-300 *:h-11 *:flex *:w-full ">
            <div className="*:leading-[44px] *:text-center last:border-b-0">
              <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300 rounded-tr-lg">
                قیمت پایه وزنی
              </div>
              <div className="text-lg text-[#0F0F0FCC] w-3/5">
                {trimPrice(finalValue.weightBasePrice)}
              </div>
            </div>
            <div className="*:leading-[44px] *:text-center last:border-b-0">
              <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                قیمت کل
              </div>
              <div className="text-lg text-[#0F0F0FCC] w-3/5">
                {trimPrice(finalValue.overallPrice)}
              </div>
            </div>
            <div className="*:leading-[44px] *:text-center last:border-b-0">
              <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                قیمت هر کارتن
              </div>
              <div className="text-xl font-bold text-defualt-900 w-3/5">
                {trimPrice(finalValue.boxPrice)}
              </div>
            </div>
            <div className="*:leading-[44px] *:text-center last:border-b-0">
              <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                قیمت هر شانه
              </div>
              <div className="text-lg text-[#0F0F0FCC] w-3/5">
                {trimPrice(finalValue.bulkPrice)}
              </div>
            </div>
            <div className="*:leading-[44px] *:text-center last:border-b-0">
              <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300 rounded-br-lg">
                قیمت هر تخم‌مرغ
              </div>
              <div className="text-lg text-[#0F0F0FCC] w-3/5">
                {trimPrice(finalValue.eggPrice)}
              </div>
            </div>
          </div>
          <p className="mt-4 text-default-500 text-xs">
            قیمت‌ها به <span className="font-bold">تومان</span> است.
          </p>
        </div>
        <form method="dialog" className="flex gap-3 w-full">
          <button
            className="border border-tertiary rounded-xl text-tertiary font-bold h-12 flex-1"
            onClick={() => handleSaveAsImage(tableRef, "محاسبه قیمت")}
          >
            ذخیره
          </button>
          <button className="border border-tertiary rounded-xl text-tertiary font-bold h-12 flex-1">
            بستن
          </button>
        </form>
      </div>
    </BottomModal>
  );
}

export default CalculateResultModal;
