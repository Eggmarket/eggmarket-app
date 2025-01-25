import React from "react";
import Checkbox from "../UI/Checkbox";
import { PrintOptions } from "../static";

export default function Print({ selected, setSelected }) {
  const handleChecked = (e, { value }) => {
    if (e.target.checked) {
      setSelected("print_types", value, "add");
    } else {
      setSelected(
        "print_types",
        selected.filter((item) => item !== value),
        "replace"
      );
    }
  };

  return (
    <div className="list pr-6 pl-8 pt-4">
      {PrintOptions.map((option, index) => (
        <Checkbox
          key={index}
          data={option}
          onChange={handleChecked}
          checked={selected?.find((s) => s === option.value) ? true : false}
        />
      ))}
    </div>
  );
}
