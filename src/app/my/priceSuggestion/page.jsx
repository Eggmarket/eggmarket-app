"use client";
import { Axios } from "@/axios";
import BottomModal from "@/components/Modal/BottomModal";
import PriceSuggestionModal from "@/components/Modal/PriceSuggestionModal";
import ReceivedPriceSuggestionCard from "@/components/PriceSuggestion/ReceivedPriceSuggestionCard";
import SentPriceSuggestionCard from "@/components/PriceSuggestion/SentPriceSuggestionCard";
import Button from "@/components/UI/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import priceSuggestion from "../../../components/svg/priceSuggestion";

export default function Page() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [sentRequests, setSentRequests] = useState([]);
  const [recievedRequests, setRecievedRequests] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");

  const getSentRequests = async () => {
    const res = await Axios.post(`/API/price-offer/get-my-requests`, {
      per_page: 1000,
    });
    if (res.status === 200) {
      setSentRequests(res.data);
    } else {
      console.log(res);
    }
  };

  const getRecievedRequests = async () => {
    const res = await Axios.post(`/API/price-offer/get-received-requests`, {
      per_page: 1000,
    });
    if (res.status === 200) {
      const unique = [...new Set(res.data.map((item) => item.load_id))];
      setRecievedRequests(unique);
    } else {
      console.log(res);
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/delete`,
        {
          loadID: selectedCard.load_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        getData();
        setSelectedCard("");
        document.getElementById("deleteAdModal").close();
        toast.info("قیمت با موفقیت حذف شد.", { autoClose: 2000 });
      }
    } catch (error) {
      s;
      console.log(error);
    }
  };

  useEffect(() => {
    getSentRequests();
    getRecievedRequests();
  }, []);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="sticky top-0 bg-inherit px-4 pt-8 pb-6 gap-4 flex justify-start items-center z-10">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">پیشنهاد قیمت</h3>
      </div>
      <div className="flex flex-col pb-4">
        <div role="tablist" className="tabs tabs-lifted flex px-4 tabs-custom">
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-success font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            پیشنهادهای دریافتی
          </a>
          <a
            role="tab"
            className={`flex-1 tab [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-[#3772CC] font-medium"
                : "text-default-500"
            }`}
            onClick={() => setActiveTab(2)}
          >
            پیشنهادهای ارسالی
          </a>
        </div>
        <div className="flex-1 rounded-b-xl px-4">
          <div
            className={`h-3 w-full bg-default-50 ${
              activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
            }`}
          ></div>
          {activeTab === 1 ? (
            <div className="space-y-6">
              {recievedRequests.map((request, index) => (
                <ReceivedPriceSuggestionCard key={index} request={request} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sentRequests.map((request, index) => (
                <SentPriceSuggestionCard
                  key={index}
                  request={request}
                  setSelectedCard={setSelectedCard}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <PriceSuggestionModal
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
      />
      <BottomModal
        id="deletePriceSuggestionModal"
        onClose={() => setSelectedCard("")}
      >
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">حذف قیمت پیشنهادی</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setSelectedCard("")}
          >
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <p className="text-base font-bold px-8 py-5">
          از حذف قیمت پیشنهادی اطمینان دارید؟
        </p>
        <div className="bg-default-50 border-t-default-300 w-full flex gap-3 px-6 py-4 mb-4">
          <button onClick={() => {}} className={`button button-danger w-3/5 `}>
            حذف قیمت
          </button>
          <form method="dialog" className="w-2/5">
            <Button
              type="button-ghost"
              text="لغو"
              width="w-full"
              onClick={() => setSelectedCard("")}
            />
          </form>
        </div>
      </BottomModal>
    </div>
  );
}
