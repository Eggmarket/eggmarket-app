import React, { useEffect, useRef, useState } from "react";
const options = [
  { id: 1, title: "همه" },
  { id: 2, title: "واریز" },
  { id: 3, title: "برداشت" },
];

// CustomSelect component
export default function TransFilterSelect({ value, setFilters }) {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState(null); // Stores the selected value(s)
  const inputRef = useRef(); // Reference to the custom select input element

  useEffect(() => {
    setSelectedValue(options.find((item) => item.id === value));
  }, [value]);

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

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.id === option.id;
  };

  return (
    <div className="custom--dropdown-container border-[#C2C2C2] bg-surface-secondary">
      <div
        ref={inputRef}
        onClick={() => setShowMenu(!showMenu)}
        className="dropdown-input justify-center relative"
      >
        <div className={`dropdown-selected-value `}>
          {selectedValue ? selectedValue.title : ""}
        </div>
        <span className="absolute left-4 top-4 icon-Open-List text-default-700 text-base"></span>
      </div>
      {showMenu && (
        <div className="dropdown-menu alignment--auto">
          {options.map((option) => (
            <option
              onClick={() => {
                setSelectedValue(option);
                setFilters(option.id);
              }}
              key={option.id}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
              value={option.id}
            >
              {option.title}
            </option>
          ))}
        </div>
      )}
    </div>
  );
}
