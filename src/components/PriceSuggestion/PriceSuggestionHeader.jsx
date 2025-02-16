import { Axios } from "@/axios";
import { useOrigins } from "@/context/OriginsProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PriceSuggestionHeader({ id }) {
  const [load, setLoad] = useState(null);
  const { provinces } = useOrigins();
  useEffect(() => {
    async function fetchLoad() {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/load`,
        {
          loadID: id,
        }
      );
      if (response.status === 200) {
        setLoad(response.data.load);
      } else {
        console.log(response);
      }
    }

    fetchLoad();
  }, []);
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#FCFCFC] to-[#D3D3D3] px-4 sm:px-6 py-3 rounded-t-lg">
        <div className="flex justify-between items-center mb-5">
          <p className="text-default-500 text-xs">
            برند <span className="text-tertiary text-sm">چکاوک کاشان</span>
          </p>
          <Link
            href={`/load/${id}`}
            className="underline text-xs text-default-500"
          >
            رفتن به آگهی
          </Link>
        </div>
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
            <span className="text-sm text-default-700 ml-1">
              {load && load.origin_field2}
            </span>
            <span className="text-xs text-default-500">
              (
              {load &&
                provinces.find((item) => item.id === load.origin_field1).title}
              )
            </span>
          </span>
        </div>
      </div>
      <img
        src={"/assets/images/priceSuggestion.png"}
        alt="design picture"
        className="absolute w-full h-2.5 -bottom-2 left-0 right-0"
      />
    </div>
  );
}
