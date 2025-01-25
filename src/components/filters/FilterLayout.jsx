"use client";
import React, { useState } from "react";
import AllFilters from "./AllFilters";
import IndividualFilters from "./IndividualFilters";
import FullModal from "../Modal/FullModal";
import Quality from "../filterItems/Quality";
import Yolk from "../filterItems/Yolk";
import Print from "../filterItems/Print";
import OriginFilter from "../filterItems/OriginFilter";
import Origin from "../filterItems/OriginFolder/Origin";

const filterOptions = [
  {
    title: "فقط بار های موجود",
    value: "available",
  },
  // {
  //   id: 2,
  //   title: "وزن",
  //   value: "weight",
  //   renderComponent: Weight,
  // },
  {
    title: "مبدأ بار",
    value: "origins",
    renderComponent: Origin,
  },
  {
    title: "پرینت",
    value: "print_types",
    renderComponent: Print,
  },
  {
    title: "زرده",
    value: "yolk_types",
    renderComponent: Yolk,
  },
  {
    title: "کیفیت",
    value: "qualities",
    renderComponent: Quality,
  },
];

export default function FilterLayout({ filterValues, setFilterValues }) {
  // const [filters, setFilters] = useState(filterValues);
  // const filterHandler = (name, value, type) => {
  //   if (type === "add") {
  //     setFilters((prev) => ({
  //       ...prev,
  //       [name]: [...filters[name], value],
  //     }));
  //   } else {
  //     setFilters((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  return (
    <div className="flex items-center gap-1 py-3">
      <button
        className="relative flex justify-center gap-1 items-center rounded-lg bg-tertiary px-2 py-1.5"
        onClick={() => document.getElementById(`allFiltersModal`).showModal()}
      >
        <span className="icon-dark-linear-Filter-5 text-base"></span>
        <p className="text-xs text-default-50">فیلتر</p>
        <CheckFilters
          filterValues={filterValues}
          filterOptions={filterOptions}
        />
      </button>
      <FullModal id={`allFiltersModal`}>
        <AllFilters
          filterOptions={filterOptions}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
        />
      </FullModal>
      <div className="carousel gap-1">
        <IndividualFilters
          filterOptions={filterOptions}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
        />
      </div>
    </div>
  );
}

function CheckFilters({ filterValues, filterOptions }) {
  let selected = 0;
  filterValues.status && selected++;
  filterOptions.map((filter) => {
    filterValues[filter.value]?.length > 0 && selected++;
  });
  return (
    selected !== 0 && (
      <span className="absolute bg-primary border border-default-50 rounded-full mx-auto leading-4 h-4 w-4 -top-1 -left-1 text-purple-900 font-bold text-xs">
        {selected}
      </span>
    )
  );
}
