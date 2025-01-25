import { trimPrice } from "@/utils/trimPrice";
import React from "react";

function LoadAttributesTable({ attrLoad, citiesPrice }) {
  return (
    <div className="overflow-x-auto border border-default-200 rounded-lg mb-6">
      <table className="table text-center rounded-lg">
        {/* head */}
        <thead className="text-xs text-default-900 font-normal bg-default-100">
          <tr className="border-b border-default-200 *:h-[42px] *:py-0 *:px-1">
            <th className="text-xs">ویژگی‌های بار</th>
            <th className="border-l border-r border-default-200 text-xs">
              کمترین قیمت{" "}
              <span className="text-[10px] text-default-700 font-light">
                (تومان)
              </span>
            </th>
            <th className="text-xs">
              بیشترین قیمت{" "}
              <span className="text-[10px] text-default-700 font-light">
                (تومان)
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white *:border-b *:border-default-200">
          {attrLoad.map((attribute, index) => {
            const city = citiesPrice?.find(
              (item) => item.type_id === attribute.id
            );
            return (
              <tr
                key={index}
                className="last:border-0 *:h-[36px] *:py-0 *:px-1"
              >
                <td className="text-xs">{attribute.title}</td>
                <td className="border-l border-r border-default-200">
                  {city?.price_1 ? trimPrice(city?.price_1) : "--"}
                </td>
                <td>{city?.price_2 ? trimPrice(city?.price_2) : "--"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LoadAttributesTable;
