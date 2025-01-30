import React, { useEffect, useState } from "react";
import PriceSuggestionHeader from "./PriceSuggestionHeader";
import { trimPrice } from "@/utils/trimPrice";
import { Axios } from "@/axios";

const data = [
  {
    id: "1",
    destination: "قم",
    price: "45000",
  },
  {
    id: "1",
    destination: "تهران",
    price: "47000",
  },
];

function ReceivedPriceSuggestionCard({ request }) {
  const [loadRequests, setLoadRequests] = useState([]);

  const getLoadRequests = async () => {
    const res = await Axios.post(`/API/price-offer/get-load-requests`, {
      per_page: 1000,
      load_id: request,
    });
    if (res.status === 200) {
      setLoadRequests(res.data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getLoadRequests();
  }, []);

  return (
    <div className="bg-default-50 rounded-xl cardShadow">
      <PriceSuggestionHeader />
      <div className="mt-6 space-y-6">
        {loadRequests.map((request, index) => (
          <div key={index} className="px-6 pb-6 last:border-none line">
            <p>
              {/* <span className="text-xs font-semibold text-default-700">
                پیشنهاد {index + 1} - مقصد:{" "}
              </span>
              <span className="text-default-900 text-base">
                {suggest.destination}
              </span>{" "}
              <span className="text-default-500 text-xs">
                ({suggest.destination})
              </span> */}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-default-700 text-xs">
                قیمت:{" "}
                <span className="text-xl text-default-900 font-semibold">
                  {trimPrice(request.amount)}
                </span>{" "}
                <span className="text-default-500">تومان</span>
              </p>
              <div className="flex gap-3 flex-1">
                <button className="p-1 whitespace-nowrap flex-1 h-11 flex justify-center items-center gap-1 border border-success rounded-xl">
                  <span className="icon-light-linear-Tick text-lg text-success"></span>
                  <p className="font-bold text-success">انتخاب</p>
                </button>
                <button className="p-1 whitespace-nowrap flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                  <span className="icon-light-linear-Tick text-lg text-danger-900"></span>
                  <p className="font-bold text-danger-900">رد کردن</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceivedPriceSuggestionCard;
