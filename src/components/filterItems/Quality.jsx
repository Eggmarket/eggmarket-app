import React from "react";
import Checkbox from "../UI/Checkbox";
import { QualityOptions } from "../static";

export default function Quality({ selected, setSelected }) {
  const handleChecked = (e, { value }) => {
    if (e.target.checked) {
      setSelected("qualities", value, "add");
    } else {
      setSelected(
        "qualities",
        selected.filter((item) => item !== value),
        "replace"
      );
    }
  };

  return (
    <div className="list pr-6 pl-8 pt-4">
      {QualityOptions.map((option) => (
        <Checkbox
          key={option.id}
          data={option}
          onChange={handleChecked}
          checked={selected?.find((s) => s === option.value) ? true : false}
        />
      ))}
    </div>
  );
}
