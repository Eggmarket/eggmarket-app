import React, { useEffect, useState } from "react";
import CustomSearchSelect from "./CustomSearchSelect";
import axios from "axios";
import { useOrigins } from "@/context/OriginsProvider";

export default function SelectCity({
  name,
  label,
  register,
  setValue,
  defaultValue = "",
  space = "col-span-1",
  isDirty,
}) {
  const { provinces, cities } = useOrigins();

  function combineArrays() {
    const combinedArray = cities.map((city) => {
      // Filter cities that belong to the current province
      const relatedProvince = provinces.find(
        (province) => province.id === city.province
      );
      // Add a "cities" field to the province
      return {
        cityId: city.id,
        provinceId: relatedProvince?.id,
        cityName: city.title,
        optionTitle: `${city.title} - ${relatedProvince.title}`,
      };
    });
    return combinedArray;
  }

  return (
    <div className={`flex flex-col gap-2 ${space}`}>
      <label htmlFor={name} className="font-medium text-base text-default-900">
        {label}
        <span className="text-danger-900 font-medium text-xs">*</span>
      </label>
      {cities && provinces && (
        <CustomSearchSelect
          options={combineArrays()}
          placeHolder="جستجوی شهر یا استان..."
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
          name={name}
          isDirty={isDirty}
        />
      )}
    </div>
  );
}
