import React, { useEffect, useRef, useState } from "react";
import BottomModal from "./BottomModal";
import Button from "../UI/Button";
import DatePicker from "../PricePage/DatePicker";
import { getDifferenceOfTwoDates } from "@/utils/getDifferenceOfTwoDates";
import { trimPrice } from "@/utils/trimPrice";
import axios from "axios";
import HistoryModal from "./HistoryModal";
import { handleSaveAsImage } from "@/utils/handleSaveAsImage";

function CityPriceModal({ defaultDate, selectedCity, setSelectedCity }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cityVisibleDate, setCityVisibleDate] = useState("");
  const [data, setData] = useState({
    weights: [],
    cities: [],
    citiesPrice: [],
    weightsPrice: [],
    attrLoad: [],
    attrLoadPrice: [],
  });
  const [dateValue, setDateValue] = useState(defaultDate);
  const [dayCounter, setDayCounter] = useState(0);

  const tableRef = useRef();

  useEffect(() => {
    setDateValue(defaultDate);
  }, [defaultDate]);
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
          setCityVisibleDate(response.data.list_title);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    if (selectedCity) {
      setDayCounter(getDifferenceOfTwoDates(dateValue));
      getPrice();
    }
  }, [dateValue, selectedCity]);

  return (
    <>
      <BottomModal
        id="cityModal"
        onClose={() => {
          setSelectedCity("");
          setDateValue(defaultDate);
        }}
      >
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-3 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">
            پایه های وزنی {selectedCity.title}
          </h3>
          <button onClick={() => setSelectedCity([])} className="outline-none">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <div className="px-6">
          <div className="flex items-center justify-between h-12">
            <DatePicker
              visibleDate={cityVisibleDate}
              setDayCounter={setDayCounter}
              dayCounter={dayCounter}
              setDateValue={setDateValue}
              historyModalId="cityPriceDateModal"
            />
          </div>
          <div className="border border-default-200 rounded-lg mt-3">
            <table ref={tableRef} className="table text-center rounded-lg">
              {/* head */}
              <thead className="text-sm text-default-900 font-normal bg-default-100">
                <tr className="border-b border-default-200 *:h-[42px] *:py-0 *:px-1">
                  <th className="text-xs rounded-tr-lg">
                    وزن{" "}
                    <span className="text-[10px] text-default-700 font-light">
                      (کیلوگرم)
                    </span>
                  </th>
                  <th className="text-xs border-r border-default-200 rounded-tl-lg">
                    پایه بدون پرینت{" "}
                    <span className="text-[10px] text-default-700 font-light">
                      (تومان)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white *:border-b *:border-default-200">
                <tr className="last:border-0 hover:cursor-pointer *:rounded-b-lg *:h-[36px] *:py-0 *:px-1">
                  <td>11</td>
                  <td className="border-r border-default-200">
                    {trimPrice(50000)}
                  </td>
                </tr>
                <tr className="last:border-0 hover:cursor-pointer *:rounded-b-lg *:h-[36px] *:py-0 *:px-1">
                  <td>11</td>
                  <td className="border-r border-default-200">
                    {trimPrice(50000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="w-full flex gap-3 mt-5 px-6 py-3">
          <Button
            type="button-primary-ghost"
            text="ذخیره"
            width="flex-1"
            onClick={() =>
              handleSaveAsImage(
                tableRef,
                `قیمت ${cityVisibleDate} ${selectedCity.title}`
              )
            }
          />
          <Button
            type="button-primary-ghost"
            text="بستن"
            width="flex-1"
            onClick={() => setSelectedCity("")}
          />
        </form>
      </BottomModal>
      <HistoryModal
        id="cityPriceDateModal"
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
    </>
  );
}

export default CityPriceModal;
