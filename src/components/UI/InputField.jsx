import { useProfile } from "@/store/profileState";
import React, { useEffect, useMemo, useState } from "react";

export default function InputField({
  placeholder = "",
  inputRef,
  onChange,
  onClick,
  label,
  smallText = "",
  required = false,
  name,
  space,
  type,
}) {
  return (
    <div
      className={`bg-inherit relative flex flex-col gap-2 ${space}`}
      onClick={onClick}
    >
      <label htmlFor={name} className="font-medium text-base text-default-900">
        {label}{" "}
        {smallText ? (
          <span className="font-medium text-sm">{smallText}</span>
        ) : (
          ""
        )}
        {required && (
          <span className="text-danger-900 font-medium text-xs"> *</span>
        )}
      </label>
      <div
        className={`relative overflow-hidden border border-[#C2C2C2] rounded-xl`}
      >
        <input
          id={name}
          name={name}
          ref={inputRef}
          onChange={onChange}
          type={type}
          className={`bg-default-50  w-full px-4 h-[50px] text-default-900 font-normal text-base `}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
