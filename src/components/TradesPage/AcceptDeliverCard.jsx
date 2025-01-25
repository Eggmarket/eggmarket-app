import React from "react";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import DisapprovalLoadModal from "../Modal/DisapprovalLoadModal";

function AcceptDeliverCard() {
  return (
    <div className="bg-default-50 cardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span className="text-default-500 text-xs ml-1">برند</span>
          {/* <span className="text-default-700 text-sm">
                          {detail.brand}
                        </span> */}
        </p>
        <div>
          <p className="text-primary text-xs font-bold">تایید تخلیه</p>
        </div>
      </div>
      <div className="relative">
        <div className="bg-gradient-to-b from-[#FCFCFC] to-[#D3D3D3] px-4 py-3">
          <div className="flex gap-1 items-center">
            <span className="flex items-center">
              <span className="text-base font-semibold text-default-700 ml-1">
                12.5
              </span>
              <span className="text-xs text-default-500">کیلو</span>
            </span>
            <span className="bg-default-700 h-4 w-0.5"></span>
            <span className="flex items-center">
              <span className="text-base font-semibold text-default-700 ml-1">
                260
              </span>
              <span className="text-xs text-default-500">کارتن</span>
            </span>
            <span className="bg-default-700 h-4 w-0.5"></span>
            <span className="flex items-center">
              <span className="text-sm text-default-700 ml-1">مشهد</span>
              <span className="text-xs text-default-500">(خراسان رضوی)</span>
            </span>
          </div>
          <div className="flex gap-2 flex-wrap items-stretch mt-4">
            <Badge text="بدون پرینت" />
            <Badge text="زرده ساده" />
            <Badge text="لوکس" />
          </div>
        </div>
        <img
          src={"/assets/images/priceSuggestion.png"}
          alt="design picture"
          className="absolute w-full h-2.5 -bottom-2 left-0 right-0"
        />
      </div>
      <p className="pt-4 px-4 pb-1 font-light">
        <span className="font-bold">یکسان‌بودن</span> مشخصات اعلامی با بار
        تحویل‌شده را تأیید می‌کنید؟
      </p>
      <div className="flex w-full p-4 gap-3">
        <Button
          type="button-primary-2"
          text="تأیید می‌کنم"
          width="w-full"
          onClick={() => {}}
        ></Button>
        <Button
          type="button-primary-error"
          text="تأیید نمی‌کنم"
          width="w-full"
          onClick={() =>
            document.getElementById("DisapprovalLoadModal").showModal()
          }
        ></Button>
      </div>
      <DisapprovalLoadModal />
    </div>
  );
}

export default AcceptDeliverCard;
