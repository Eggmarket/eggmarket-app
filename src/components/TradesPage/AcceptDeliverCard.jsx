import React from "react";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import DisapprovalLoadModal from "../Modal/DisapprovalLoadModal";
import { Axios } from "@/axios";
import { toast } from "react-toastify";
import { useOrigins } from "@/context/OriginsProvider";

function AcceptDeliverCard({
  factor,
  getUserPendingTrades,
  getUserDoneTrades,
}) {
  const { provinces } = useOrigins();
  let dateFormat = new Date(factor.time * 1000);

  const acceptDelivery = async () => {
    const response = await Axios.post(`/API/transactions/accept-delivery`, {
      factor_id: factor.id,
    });
    if (response.status === 200) {
      toast.info(" تحویل تایید شد.");
      getUserPendingTrades();
      getUserDoneTrades();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="bg-default-50 cardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span
            className={`text-sm font-semibold ${
              factor.type === 0 ? "text-[#178230]" : " text-[#D33C30]"
            }`}
          >
            {factor.type === 0 ? " خرید" : " فروش"}
          </span>
          <span className="text-default-700 text-sm">
            {factor.load.owner_name}
          </span>
          <span className="text-default-500 text-xs">
            | {dateFormat.toLocaleDateString("fa-IR")}
          </span>
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
                {factor.load.weight}
              </span>
              <span className="text-xs text-default-500">کیلو</span>
            </span>
            <span className="bg-default-700 h-4 w-0.5"></span>
            <span className="flex items-center">
              <span className="text-base font-semibold text-default-700 ml-1">
                {factor.load.count}
              </span>
              <span className="text-xs text-default-500">کارتن</span>
            </span>
            <span className="bg-default-700 h-4 w-0.5"></span>
            <span className="flex items-center">
              <span className="text-sm text-default-700 ml-1">
                {factor.load.origin_field2}
              </span>
              <span className="text-xs text-default-500">
                (
                {
                  provinces.find(
                    (item) => item.id === factor.load.origin_field1
                  )?.title
                }
                )
              </span>
            </span>
          </div>
          <div className="flex gap-1 flex-wrap items-stretch mt-4">
            <Badge text={factor.load.pack_type || ""} />
            <Badge text={factor.load.yolk_type || ""} />
            <Badge text={factor.load.print_type || ""} />
            <Badge text={factor.load.quality || ""} />
          </div>
        </div>
        <img
          src={"/assets/images/priceSuggestion.png"}
          alt="design picture"
          className="absolute w-full h-2.5 -bottom-2 left-0 right-0"
        />
      </div>
      {factor.type === 0 ? (
        <>
          <p className="pt-4 px-4 pb-1 font-light">
            <span className="font-bold">یکسان‌بودن</span> مشخصات اعلامی با بار
            تحویل‌شده را تأیید می‌کنید؟
          </p>
          <div className="flex w-full p-4 gap-3">
            <Button
              type="button-primary-2"
              text="تأیید می‌کنم"
              width="w-full"
              onClick={() => acceptDelivery()}
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
        </>
      ) : (
        ""
      )}

      <DisapprovalLoadModal />
    </div>
  );
}

export default AcceptDeliverCard;
