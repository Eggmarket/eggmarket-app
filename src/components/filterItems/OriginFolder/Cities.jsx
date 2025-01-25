import Checkbox from "@/components/UI/Checkbox";
import React from "react";

export default function Cities({
  cities,
  backClickHandler,
  selectedProvince,
  handleAllChecked,
  handleCityChecked,
  selectedCities,
  allCitiesChecked,
  partialCityChecked,
}) {
  return (
    <>
      <button
        onClick={backClickHandler}
        className="w-full flex gap-4 items-center"
      >
        <span className="pb-4 icon-light-bold-Right-1 text-default-700 text-2xl"></span>
        <p className="pb-4 flex-1 text-start text-default-700 line">
          بازگشت به همۀ استان‌ها
        </p>
      </button>
      <label className="label cursor-pointer gap-4 justify-start p-0">
        <input
          checked={
            allCitiesChecked?.find((s) => s === selectedProvince.id) ||
            partialCityChecked?.find((s) => s === selectedProvince.id)
              ? true
              : false
          }
          onChange={(e) =>
            handleAllChecked(e, {
              id: selectedProvince.id,
              title: `همه شهرهای ${selectedProvince.title}`,
            })
          }
          type="checkbox"
          className={`checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)] ${
            partialCityChecked.includes(selectedProvince.id) ? "minus" : ""
          }`}
        />
        <span class="flex-1 label-text text-base font-semibold text-default-700 py-4 line">
          {`همه شهرهای ${selectedProvince.title}`}
        </span>
      </label>
      <div className="list">
        {cities
          .filter((city) => city.province === selectedProvince.id)
          .map((city) => {
            return (
              <Checkbox
                key={city.id}
                data={city}
                onChange={handleCityChecked}
                checked={selectedCities.find(({ id }) => id === city.id)}
              />
            );
          })}
      </div>
    </>
  );
}
