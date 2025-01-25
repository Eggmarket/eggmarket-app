import { useProfile } from "@/store/profileState";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function InputText({
  placeholder = "",
  inputRef,
  onChange,
  onClick,
  label,
  smallText = "",
  required = false,
  name,
  space,
  className,
  type,
  disabled,
  iconRight,
  text,
  textOnclick,
  IR,
  dir,
  del,
  search,
  inputToggle,
  setInputToggle,
  sheba,
}) {
  const removeProfile = useProfile((state) => state.removeProfile);
  const removeSheba = useProfile((state) => state.removeSheba);
  const [provinces, setProvinces] = useState({});
  const [cities, setCities] = useState({});
  const [testInput, setTestInput] = useState("");
  const defaultInputRef = useRef()

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`
        );
        const data = await res.json();
        setProvinces(data);
      } catch (err) {
        console.error(err);
      }
    };
    getProvinces();
    const getCities = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/area_suggestion`
        );
        const data = await response.text();
        const contentType = res.headers.get("Content-Type");
        console.log(contentType);
        setCities(data);
      } catch (err) {
        console.error(err);
      }
    };
    // getCities();
  }, []);

  const filteredProvinces = useMemo(() => {
    if (!provinces?.provinces) return [];
    const filtered = provinces.provinces.map((value) => value.title);
    return filtered.filter((v) => v.startsWith(testInput));
  }, [provinces, testInput]);

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
      {search && (
        <div
          onMouseDown={(e) => {
            if (e.target.tagName !== "INPUT") {
              e.preventDefault();
            }
          }}
          onTouchStart={(e) => {
            if (e.target.tagName !== "INPUT") {
              e.preventDefault();
            }
          }}
          className={`${inputToggle ? "visible" : "invisible"} absolute inset-x-0 top-[100%] bg-default-50 z-20 searchShadow rounded-xl px-4 py-2 h-52 overflow-y-scroll`}
        >
          {
            // provinces.provinces.map((value, index) => (<div key={value.id} className="h-10 text-default-900">{value.title}</div>))
            filteredProvinces.map((value, index) => (
              <div key={index + 1} className="h-10 text-default-900">
                {value}
              </div>
            ))
          }
        </div>
      )}
      <div
        className={`relative overflow-hidden border-2 border-[#C2C2C2] rounded-xl`}
      >
        {del && (
          <div
            onClick={() => {
              removeProfile(placeholder);
              removeSheba(placeholder);
            }}
            className="absolute w-12 left-0 inset-y-0 flex justify-center items-center bg-default-100 border-2 border-solid border-r-default-300 cursor-pointer"
          >
            <span className="icon-light-linear-Delete-2-custom text-xl"></span>
          </div>
        )}
        <div className={`absolute flex justify-center items-center size-9 ${IR ? 'right-1' : 'left-1'} top-[50%] translate-y-[-50%] cursor-pointer ${testInput !== '' ? 'visible' : 'invisible'}`}>
          <span
            className={`icon-light-outline-Close size-4`}
            onClick={() => setTestInput('')}>
          </span>
        </div>
        <input
          disabled={disabled}
          value={testInput}
          id={name}
          dir={dir}
          name={name}
          ref={inputRef ?? defaultInputRef}
          type={type}
          onChange={(e) => {
            onChange && onChange();
            if (sheba) {
              const regex = /^0\d*$/g;
              if (!regex.test(e.target.value)) {
                setTestInput(e.target.value);
              }
            } else {
              setTestInput(e.target.value);
            }
          }}
          onBlur={() => search && setInputToggle(false)}
          onClick={() => search && setInputToggle(true)}
          className={`bg-default-50 ${IR && "!px-9"
            } w-full px-4 h-[50px] text-default-900 font-normal text-base ${className}`}
          placeholder={placeholder}
        />
      </div>
      {IR && (
        <span className="absolute left-4 top-[58%] translate-y-[-55%]">
          {IR}
        </span>
      )}
      {iconRight && (
        <span
          className={`absolute right-4 text-xl top-[58%] translate-y-[-55%] ${iconRight}`}
        ></span>
      )}
      {text && (
        <p
          className="absolute left-4 top-[58%] translate-y-[-55%] text-tertiary text-xs cursor-pointer"
          onClick={textOnclick}
        >
          {text}
        </p>
      )}
    </div>
  );
}
