import React from "react";

export default function Checkbox({
  data,
  onChange,
  checked = false,
  hasLine = true,
}) {
  return (
    <label className="label cursor-pointer gap-4 justify-start p-0">
      <input
        checked={checked}
        onChange={(e) => onChange && onChange(e, data)}
        type="checkbox"
        className="checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)]"
      />
      <span
        class={`flex-1 label-text text-base font-semibold text-default-700 ${hasLine ? "line py-4" : ""
          }`}
      >
        {data.title}
      </span>
    </label>
  );
}
