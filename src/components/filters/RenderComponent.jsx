import React from "react";
import Button from "../UI/Button";

function RenderComponent({
  selectedFilter,
  setSelectedFilter,
  filters,
  filterHandler,
  filterValues,
  setFilterValues,
  setFilters,
}) {
  var { value, renderComponent: MyComponent } = selectedFilter;
  return (
    <>
      <div>
        <MyComponent selected={filters[value]} setSelected={filterHandler} />
      </div>
      <form
        method="dialog"
        className="bg-white bottom-0 inset-x-0 border-t-default-300 w-full flex gap-3 px-6 py-4 z-10"
      >
        <Button
          type="button-primary"
          text="اعمال فیلتر"
          width="w-3/5"
          onClick={() => {
            document.getElementById("filterModal").close();
            setFilterValues(filters);
            setSelectedFilter([]);
          }}
        />
        <Button
          type="button-primary-error"
          text="حذف فیلتر"
          width="w-2/5"
          onClick={() => {
            // if (value === "weight") {
            //   setFilters({
            //     ...filters,
            //     weight: { min: 8, max: 14 },
            //   });
            //   setFilterValues({
            //     ...filterValues,
            //     weight: { min: 8, max: 14 },
            //   });
            // } else {
            setFilters({
              ...filters,
              [value]: [],
            });
            setSelectedFilter([]);
            setFilterValues({
              ...filterValues,
              [value]: [],
            });
            document.getElementById("filterModal").close();
            // }
          }}
        />
      </form>
    </>
  );
}

export default RenderComponent;
