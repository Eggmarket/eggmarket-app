import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import Link from "next/link";
import Button from "../UI/Button";
import WeightBasedTable from "../PricePage/WeightBasedTable";
import axios from "axios";
import Loading from "@/app/loading";
import CityBasedTable from "../PricePage/CityBasedTable";

function LandingDayPrice() {
  const today = moment().locale("fa").format("dddd YYYY/MM/DD");
  const [data, setData] = useState({
    weights: [],
    cities: [],
    citiesPrice: [],
    weightsPrice: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getPrice() {
      setIsLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/prices/list/0`)
        .then((response) => {
          setIsLoading(false);
          setData({
            weightsPrice: response.data.price_list?.filter(
              (item) => item.type === "weight"
            ),
            citiesPrice: response.data.price_list?.filter(
              (item) => item.type === "city"
            ),
            weights: response.data.weights,
            cities: response.data.cities.filter(
              (item) =>
                item.title !== "زرده" &&
                item.title !== "لوکس" &&
                item.title !== "بدون پرینت" &&
                item.title !== "پرینت دومینو"
            ),
          });
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    getPrice();
  }, []);

  return (
    <div className="pt-6 pb-8 bg-default-50 shadow-[0px_1px_4px_0px_#00000026]">
      <div className="flex gap-1 mr-4 mb-6">
        <p className="font-bold">آخرین قیمت ها</p>
        <p className="flex items-center gap-1 text-default-900 font-medium">
          {`(${today})`}
        </p>
      </div>
      <div className="px-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <WeightBasedTable
              weights={data.weights}
              weightsPrice={data.weightsPrice}
            />
            <CityBasedTable
              cities={data.cities}
              citiesPrice={data.citiesPrice}
              source="landing"
            />
            <Link href="/price">
              <Button
                type="button-primary-2"
                text="رفتن به صفحه قیمت‌ها"
                width="w-full"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default LandingDayPrice;
