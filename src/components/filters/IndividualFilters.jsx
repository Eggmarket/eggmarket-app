"use client";
import React, { useState } from "react";
import Button from "../UI/Button";
import BottomModal from "../Modal/BottomModal";
import RenderComponent from "./RenderComponent";
import { useOrigins } from "@/context/OriginsProvider";

export default function IndividualFilters({
  filterOptions,
  setFilterValues,
  filterValues,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const { provinces, cities } = useOrigins();
  const [filters, setFilters] = useState(filterValues);
  const filterHandler = (name, value, type) => {
    if (type === "add") {
      setFilters((prev) => ({
        ...prev,
        [name]: [...filters[name], value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      {filterOptions.map((filter, index) =>
        index === 0 ? (
          <button
            key={filter.value}
            className={`carousel-item text-default-700 text-sm p-3 py-1 rounded-3xl ${
              filterValues.status
                ? "bg-purple-200"
                : "bg-white border border-default-400"
            }`}
            // onClick={setIsAvailable}
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                status: filterValues.status ? "" : "accepted",
              }));
              setFilterValues((prev) => ({
                ...prev,
                status: filterValues.status ? "" : "accepted",
              }));
            }}
          >
            فقط بارهای موجود
          </button>
        ) : (
          <button
            key={filter.value}
            className={`flex items-center gap-1 carousel-item text-default-700 text-sm p-3 py-1 rounded-3xl ${
              // index === 2
              //   ? filterValues.weight.min !== 8 ||
              //     filterValues.weight.max !== 14
              //     ? "bg-purple-200"
              //     : "bg-white border border-default-400"
              //   :
              filterValues[filter.value].length > 0
                ? "bg-purple-200"
                : "bg-white border border-default-400"
            }`}
            onClick={() => {
              document.getElementById(`filterModal`).showModal();
              setSelectedFilter(filter);
            }}
          >
            <p>{filter.title}</p>
            <span className="icon-light-linear-Down-2 text-base text-default-700"></span>
          </button>
        )
      )}
      <BottomModal
        id="filterModal"
        onClose={() => {
          setSelectedFilter([]);
          setFilters(filterValues);
        }}
      >
        <form
          method="dialog"
          className="flex justify-between items-center py-4 px-6"
        >
          <h3 className=" font-semibold text-lg text-default-900">
            {selectedFilter.title}
          </h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        {selectedFilter.length !== 0 && (
          <RenderComponent
            setFilters={setFilters}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            filterHandler={filterHandler}
            filters={filters}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            provinces={provinces}
          />
        )}
      </BottomModal>
    </>
  );
}
