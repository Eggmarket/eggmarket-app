import React from "react";
import Checkbox from "../UI/Checkbox";
import { YolkOptions } from "../static";

export default function Yolk({ selected, setSelected }) {
  const handleChecked = (e, { value }) => {
    if (e.target.checked) {
      setSelected("yolk_types", value, "add");
    } else {
      setSelected(
        "yolk_types",
        selected.filter((item) => item !== value),
        "replace"
      );
    }
  };

  return (
    <div className="list pr-6 pl-8 pt-4">
      {YolkOptions.map((option) => (
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
