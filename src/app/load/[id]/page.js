"use client";
import Loading from "@/app/loading";
import { Axios } from "@/axios";
import SaleCard from "@/components/Homepage/SaleCard";
import { useToken } from "@/components/hook/useToken/useToken";
import BuyModal from "@/components/Modal/BuyModal";
import PriceSuggestionModal from "@/components/Modal/PriceSuggestionModal";
import ShareLoadLinkModal from "@/components/Modal/ShareLoadLinkModal";
import Button from "@/components/UI/Button";
import { useOrigins } from "@/context/OriginsProvider";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const load = {
  loadID: 184094,
  origin_field1: 2,
  origin_field2: "آذربایجان غربی",
  reg_date: "2024-11-23 10:37:09",
  reg_date_timestamp: 1732358229,
  reg_just_date: "2024-11-23",
  description: "",
  type: "announcement",
  status: "accepted",
  details: [
    {
      title: "نوع بسته بندی",
      value: "فله (شانه ای)",
    },
    {
      title: "وزن کارتن",
      value: "10",
    },
    {
      title: "تعداد کارتن",
      value: "10",
    },
    {
      title: "نوع زرده",
      value: "طلایی",
    },
    {
      title: "نوع پرینت",
      value: "با پرینت",
    },
    {
      title: "نوع کارتن",
      value: "تست",
    },
    {
      title: "نوع شانه",
      value: "تست",
    },
    {
      title: "نام مجموعه",
      value: "gfdfg",
    },
    {
      title: "کیفیت",
      value: "درجه ۳ (کارخانه‌ای)",
    },
    {
      title: "قیمت",
      value: "400",
    },
  ],
};

function Page() {
  const [load, setLoad] = useState("");
  const { id } = useParams();
  const { provinces } = useOrigins();

  useEffect(() => {
    async function fetchLoad() {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/load`,
        {
          loadID: Number(id),
        }
      );
      if (response.status === 200) {
        console.log(response);
        setLoad(response.data.load);
      } else {
        console.log(response);
      }
    }

    fetchLoad();
  }, []);
  return (
    <div className="p-4">
      {!load ? (
        <Loading />
      ) : (
        <>
          <SaleCard
            load={load}
            province={provinces?.find((item) => item.id === load.origin_field1)}
          />
          <Link href="/">
            <Button
              type="button-primary-2"
              text="مشاهده و جستجوی بار های بیشتر"
              width="w-full"
            />
          </Link>
          <ShareLoadLinkModal selectedCard={load} />
          <PriceSuggestionModal />
          <BuyModal load={load} />
        </>
      )}
    </div>
  );
}

export default Page;
