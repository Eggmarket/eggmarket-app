import React, { useEffect, useRef, useState } from "react";

// CustomSelect component
export default function CustomSelect({
  placeHolder = "",
  options,
  register,
  name,
  setValue,
  defaultValue,
  isDirty,
}) {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState(
    defaultValue ? options.find((item) => item.value === defaultValue) : null
  ); // Stores the selected value(s)
  const inputRef = useRef(); // Reference to the custom select input element

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
    if (!isDirty && !defaultValue) setSelectedValue("");
  }, [isDirty]);

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    return selectedValue.title;
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  return (
    <div className="custom--dropdown-container bg-default-50 border-[#C2C2C2]">
      <div
        ref={inputRef}
        onClick={() => setShowMenu(!showMenu)}
        className="dropdown-input justify-start"
      >
        <span className="icon-Open-List text-default-700 text-base"></span>
        <div
          className={`dropdown-selected-value ${
            !selectedValue || selectedValue.length === 0 ? "placeholder" : ""
          }`}
        >
          {getDisplay()}
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu alignment--auto">
          {options.map((option) => (
            <option
              key={option.value}
              // {...register(name, { required: true })}
              onClick={() => {
                setSelectedValue(option);
                setValue(name, option.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
              value={option.value}
            >
              {option.title}
            </option>
          ))}
        </div>
      )}
    </div>
  );
}
