import { trimPrice } from "@/utils/trimPrice";
import Image from "next/image";
import React, { useState } from "react";
import noPriceIcon from "@/components/svg/icon-no-price.svg";
import CityPriceModal from "../Modal/CityPriceModal";
import CityBasedTable from "./CityBasedTable";

function CityBasedLayout({ citiesPrice, cities, defaultDate = "" }) {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <>
      <CityBasedTable
        cities={cities}
        citiesPrice={citiesPrice}
        setSelectedCity={setSelectedCity}
      />
      {citiesPrice.length !== 0 && cities.length !== 0 && (
        <p className="text-xs text-[#2D60AE] mt-4">
          برای مشاهده پایه‌های وزنی هر شهر، روی شهر مورد نظر کلیک کنید.
        </p>
      )}
      <CityPriceModal
        defaultDate={defaultDate}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </>
  );
}

export default CityBasedLayout;
