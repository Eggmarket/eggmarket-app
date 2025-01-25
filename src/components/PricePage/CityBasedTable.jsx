import { trimPrice } from "@/utils/trimPrice";
import Image from "next/image";
import React, { useState } from "react";
import noPriceIcon from "@/components/svg/icon-no-price.svg";

function CityBasedTable({ cities, citiesPrice, setSelectedCity, source = "" }) {
  return (
    <div className="overflow-x-auto border border-default-200 rounded-lg mb-6">
      <table className="table text-center rounded-lg">
        {/* head */}
        <thead className="text-sm text-default-900 font-normal bg-default-100 ">
          <tr className="border-b border-default-200 *:h-[42px] *:py-0 *:px-1">
            <th className="text-xs">شهرها</th>
            <th className="border-l border-r border-default-200 text-xs">
              قیمت اولیه{" "}
              <span className="text-[10px] text-default-700 font-light">
                (تومان)
              </span>
            </th>
            <th className="text-xs">
              قیمت نهایی{" "}
              <span className="text-[10px] text-default-700 font-light">
                (تومان)
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white *:border-b *:border-default-200">
          {citiesPrice.length === 0 ? (
            <tr>
              <td colSpan="3">
                <div className="py-10 flex flex-col justify-center items-center w-full">
                  <Image
                    src={noPriceIcon}
                    alt="icon-no-price"
                    height={96}
                    width={96}
                  />
                  <p className="font-medium text-xl text-default-500 mt-5">
                    قیمتی در این روز موجود نیست.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            cities?.map((city, index) => {
              const cityPrice = citiesPrice?.find(
                (item) => item.type_id === city.id
              );
              return (
                <tr
                  key={index}
                  className="last:border-0 hover:cursor-pointer *:h-[36px] *:py-0 *:px-1"
                  onClick={() => {
                    if (source !== "landing") {
                      document.getElementById("cityModal").showModal();
                      setSelectedCity(city);
                    }
                  }}
                >
                  <td>{city.title}</td>
                  <td className="border-l border-r border-default-200">
                    {cityPrice?.price_1 ? trimPrice(cityPrice?.price_1) : "--"}
                  </td>
                  <td>
                    {cityPrice?.price_2 ? trimPrice(cityPrice?.price_2) : "--"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CityBasedTable;
