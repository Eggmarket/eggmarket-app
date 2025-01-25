import React, { useEffect, useRef, useState } from "react";

// CustomSelect component
export default function CustomSearchSelect({
  placeHolder,
  options,
  register,
  setValue,
  defaultValue,
  isDirty,
}) {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState(
    defaultValue ? defaultValue : ""
  ); // Stores the selected value(s)
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null); // Stores the value entered in the search input
  const inputRef = useRef(); // Reference to the custom select input element

  useEffect(() => {
    setSearchResult(options);
  }, [options]);
  useEffect(() => {
    if (!isDirty && !defaultValue) {
      setSelectedValue("");
      setSearchInput("");
      setSearchResult(options);
    }
  }, [isDirty]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  useEffect(() => {
    register("origin", { required: true });
  }, [register]);

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.id === option.id;
  };

  const getOptions = (currentValue) => {
    if (!currentValue) {
      return setSearchResult(options);
    }
    return setSearchResult(
      options.filter(({ optionTitle }) => optionTitle.includes(currentValue))
    );
  };

  return (
    <div className="custom--dropdown-container bg-default-50 border-[#C2C2C2]">
      <div
        ref={inputRef}
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-3"
      >
        <span className="icon-Search text-2xl text-default-400"></span>
        <input
          className="w-full bg-inherit"
          name="search"
          id="search"
          value={
            showMenu ? searchInput : selectedValue ? selectedValue.title : ""
          }
          onChange={(e) => {
            getOptions(e.target.value);
            setSearchInput(e.target.value);
          }}
          placeholder={placeHolder}
        />
      </div>
      {showMenu && (
        <div className="dropdown-menu alignment--auto max-h-32">
          {searchResult.map((option) => (
            <option
              onClick={() => {
                setSearchInput(option.optionTitle);
                setSelectedValue(option);
                setValue("origin", option, { shouldValidate: true });
              }}
              key={option.id}
              value={option.id}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.optionTitle}
            </option>
          ))}
        </div>
      )}
    </div>
  );
}
