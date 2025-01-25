import React from "react";
import Checkbox from "../UI/Checkbox";
import { PackOptions } from "../static";

export default function Pack({ selected, setSelected }) {
  const handleChecked = (e, { value }) => {
    if (e.target.checked) {
      setSelected("pack_types", value, "add");
    } else {
      setSelected(
        "pack_types",
        selected.filter((item) => item !== value),
        "replace"
      );
    }
  };

  return (
    <div className="list pr-6 pl-8 pt-4">
      {PackOptions.map((option, index) => (
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
