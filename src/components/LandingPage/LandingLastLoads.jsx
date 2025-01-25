import axios from "axios";
import React, { useEffect, useState } from "react";
import SaleCard from "../Homepage/SaleCard";
import ShareLoadLinkModal from "../Modal/ShareLoadLinkModal";
import Loading from "@/app/loading";
import Button from "../UI/Button";
import Link from "next/link";

function LandingLastLoads() {
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function getLoads() {
    setIsLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/loads`, {
        status: "accepted",
        print_types: [],
        yolk_types: [],
        qualities: [],
        cities: [],
        origins: [],
        pack_types: [],
        types: [],
        lastID: "", //برای صفحه بندی استفاده می شود. برای دریافت اطلاعات بیشتر یعنی صفحه بعد باید آخرین آیدی رو وارد کنید.
      })
      .then((response) => {
        setIsLoading(false);
        setData(response.data.loads.slice(0, 3));
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  async function getProvinces() {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
      .then((response) => {
        setIsLoading(false);
        setProvinces(response.data.provinces);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getProvinces();
    getLoads();
  }, []);

  return (
    <div className="pt-6 pb-8 bg-default-50 shadow-[0px_1px_4px_0px_#00000026]">
      <div className="flex gap-1 mr-4 mb-6">
        <p className="font-bold">آخرین بارهای اعلامی</p>
      </div>
      <div className="px-4">
        {isLoading ? (
          <Loading />
        ) : (
          data.map((load) => (
            <SaleCard
              key={load.loadID}
              load={load}
              province={provinces.find(
                (item) => item.id === load.origin_field1
              )}
              setSelectedCard={setSelectedCard}
              source="landing"
            />
          ))
        )}
        <Link href="/">
          <Button
            type="button-primary-2"
            text="مشاهده آگهی های بیشتر"
            width="w-full"
          />
        </Link>
      </div>
      <ShareLoadLinkModal
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </div>
  );
}

export default LandingLastLoads;
