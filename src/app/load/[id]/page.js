"use client";
import Loading from "@/app/loading";
import { Axios } from "@/axios";
import SaleCard from "@/components/Homepage/SaleCard";
import BuyModal from "@/components/Modal/BuyModal";
import PriceSuggestionModal from "@/components/Modal/PriceSuggestionModal";
import ShareLoadLinkModal from "@/components/Modal/ShareLoadLinkModal";
import Button from "@/components/UI/Button";
import { useOrigins } from "@/context/OriginsProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
