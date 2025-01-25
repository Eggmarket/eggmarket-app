"use client";
import HistoryModal from "@/components/Modal/HistoryModal";
import { monthNames } from "@/components/static";
import axios from "axios";
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import { getDifferenceOfTwoDates } from "@/utils/getDifferenceOfTwoDates";
import DatePicker from "@/components/PricePage/DatePicker";
import CityBasedTable from "@/components/PricePage/CityBasedTable";
import LoadAttributesTable from "@/components/PricePage/LoadAttributesTable";
import WeightBasedTable from "@/components/PricePage/WeightBasedTable";
import CityBasedLayout from "@/components/PricePage/CityBasedLayout";

export default function Page() {
  let today = moment();
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    weights: [],
    cities: [],
    citiesPrice: [],
    weightsPrice: [],
    attrLoad: [],
    attrLoadPrice: [],
  });
  const [dateValue, setDateValue] = useState({
    year: today.jYear(),
    month: monthNames[today.jMonth()],
    day: today.jDate(),
    weekday: today.jDay(),
  });
  const [dayCounter, setDayCounter] = useState(0);
  const [visibleDate, setVisibleDate] = useState("");

  const [cityDateValue, setCityDateValue] = useState({
    year: today.jYear(),
    month: monthNames[today.jMonth()],
    day: today.jDate(),
    weekday: today.jDay(),
  });

  // useEffect(() => {
  //   async function getPrice() {
  //     await axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_EGG_MARKET
  //         }/API/prices/list/${getDiference()}`
  //       )
  //       .then((response) => {
  //         setIsLoading(false);
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //       });
  //   }
  //   setDayCounter(getDiference());
  //   getPrice();
  // }, [dateValue]);
  useEffect(() => {
    async function getPrice() {
      await axios
        .get(
          `${
            process.env.NEXT_PUBLIC_EGG_MARKET
          }/API/prices/list/${getDifferenceOfTwoDates(dateValue)}`
        )
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
            attrLoad: response.data.cities.filter(
              (item) =>
                item.title === "زرده" ||
                item.title === "لوکس" ||
                item.title === "بدون پرینت" ||
                item.title === "پرینت دومینو"
            ),
          });
          setVisibleDate(response.data.list_title);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    setDayCounter(getDifferenceOfTwoDates(dateValue));
    getPrice();
  }, [dateValue]);

  return (
    <div className="relative max-w-[440px]">
      <div className="sticky top-0 bg-surface-secondary p-4 z-10">
        <div className="flex items-center justify-between bg-default-50 px-3 border border-[rgb(194,194,194)] rounded-xl h-12 py-1">
          <DatePicker
            visibleDate={visibleDate}
            setDayCounter={setDayCounter}
            dayCounter={dayCounter}
            setDateValue={setDateValue}
            historyModalId="priceDateModal"
          />
        </div>
      </div>
      <div className="px-4 mb-16">
        <div role="tablist" className="tabs tabs-lifted *:text-base ">
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)]  text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            پایه وزنی
          </a>
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)]  text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            پایه شهرها
          </a>
        </div>
        {isLoading ? (
          <p>
            <span className="icon-light-linear-loading"></span>
          </p>
        ) : (
          <div
            className={`py-6 px-4 bg-default-50 rounded-b-xl h-full ${
              activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
            }`}
          >
            {activeTab === 1 ? (
              <>
                <WeightBasedTable
                  weights={data.weights}
                  weightsPrice={data.weightsPrice}
                />
                {data.weightsPrice.length !== 0 && (
                  <LoadAttributesTable
                    attrLoad={data.attrLoad}
                    citiesPrice={data.citiesPrice}
                  />
                )}
              </>
            ) : (
              <CityBasedLayout
                cities={data.cities}
                citiesPrice={data.citiesPrice}
                defaultDate={dateValue}
              />
            )}
          </div>
        )}
      </div>
      <HistoryModal
        id="priceDateModal"
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
    </div>
  );
}
