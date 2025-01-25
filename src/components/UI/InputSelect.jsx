import React from "react";
import CustomSelect from "./CustomSelect";

export default function InputSelect({
  name,
  label,
  options,
  register,
  setValue,
  defaultValue = "",
  space = "col-span-1",
  isDirty,
}) {
  return (
    <div className={`flex flex-col gap-2 ${space}`}>
      <label htmlFor={name} className="font-medium text-base text-default-900">
        {label}
        <span className="text-danger-900 font-medium text-xs">*</span>
      </label>
      <CustomSelect
        options={options}
        register={register}
        setValue={setValue}
        defaultValue={defaultValue}
        name={name}
        isDirty={isDirty}
      />
    </div>
  );
}
