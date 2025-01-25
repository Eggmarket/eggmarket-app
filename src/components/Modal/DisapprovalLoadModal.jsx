import React, { useState } from "react";
import BottomModal from "./BottomModal";
import Button from "../UI/Button";

const checkBoxItems = [
  {
    id: 0,
    title: "وزن",
  },
  {
    id: 1,
    title: "کیفیت بار",
  },
  {
    id: 2,
    title: "رنگ زرده",
  },
];

function DisapprovalLoadModal() {
  const [selectedAttr, setSelectedAttr] = useState([]);
  return (
    <BottomModal id="DisapprovalLoadModal" onClose={() => {}}>
      <form
        method="dialog"
        className="flex-0 flex justify-between items-center py-3 px-6 border-b border-default-300 bg-default-50"
      >
        <h3 className="text-sm text-tertiary">گزارش عدم تطابق بار</h3>
        <button className="btn btn-sm btn-circle btn-ghost">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      <div className="mt-4 px-4">
        <p className="font-medium mb-1">
          کدام مشخصات بار اعلامی با بار تحویلی یکسان نیست؟
        </p>
        <p className="font-medium text-xs mb-4">
          (می‌توانید چند گزینه انتخاب کنید)
        </p>
        <div className="flex flex-col gap-6 mb-4 py-2">
          {checkBoxItems.map((item, index) => (
            <label key={index} className="label cursor-pointer gap-4 justify-start p-0">
              <input
                checked={selectedAttr.find((attr) => attr.id === item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAttr([...selectedAttr, item]);
                  } else {
                    setSelectedAttr(
                      selectedAttr.filter((attr) => attr.id !== item.id)
                    );
                  }
                }}
                type="checkbox"
                className="checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)]"
              />
              <span
                class={`flex-1 label-text text-sm font-semibold text-default-700 `}
              >
                {item.title}
              </span>
            </label>
          ))}
        </div>
        <div className="">
          <label className="text-sm font-medium" htmlFor="description">
            توضیحات
          </label>
          <textarea
            placeholder="اضافه کردن توضیحات بیشتر..."
            className="w-full px-4 py-3 border border-default-400 text-sm placeholder:text-sm rounded-lg mb-4 mt-2"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="border border-tertiary rounded-lg aspect-square flex-1 flex flex-col">
            <p className="px-4 py-3 text-sm text-tertiary">افزودن تصویر</p>
            <div className="flex-1 relative w-fit mx-auto mt-4">
              <span className="text-default-400 text-5xl absolute font-bold -left-4 -top-6">
                +
              </span>
              <span className="icon-light-linear-Camera-2 text-[42px] text-default-400"></span>
            </div>
            <div className="border-t border-tertiary h-10 flex">
              <div className="border-l border-default-400 flex-1 flex justify-center items-center text-default-400">
                5+
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Image text-xl text-default-400"></span>
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Image text-xl text-default-400"></span>
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Image text-xl text-default-400"></span>
              </div>
              <div className=" border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Image text-xl text-default-400"></span>
              </div>
            </div>
          </div>
          <div className="border border-tertiary rounded-lg aspect-square flex-1 flex flex-col">
            <p className="px-4 py-3 text-sm text-tertiary">افزودن فیلم</p>
            <div className="flex-1 relative w-fit mx-auto mt-4">
              <span className="text-default-400 text-5xl absolute font-bold -left-4 -top-6">
                +
              </span>
              <span className="icon-light-linear-Video-2 text-[48px] text-default-400"></span>
            </div>
            <div className="border-t border-tertiary h-10 flex">
              <div className="border-l border-default-400 flex-1 flex justify-center items-center text-default-400">
                1+
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Play-Square text-xl text-default-400"></span>
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Play-Square text-xl text-default-400"></span>
              </div>
              <div className="border-l border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Play-Square text-xl text-default-400"></span>
              </div>
              <div className=" border-default-400 flex-1 flex justify-center items-center">
                <span className="icon-light-linear-Play-Square text-xl text-default-400"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="flex gap-4 px-4 py-3">
        <Button type="button-primary" text="ثبت" width="w-3/5" />
        <Button type="button-primary-error" text="بستن" width="w-2/5" />
      </form>
    </BottomModal>
  );
}

export default DisapprovalLoadModal;
