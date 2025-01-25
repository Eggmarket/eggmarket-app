"use client";

import LoginButton from "@/components/loginButton/LoginButton";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export default function RegisterPage() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(inputValue);
  const router = useRouter();

  const phoneNumber = z
    .string()
    .regex(/^0\d{0,10}$/g)
    .min(0)
    .max(11);

  useEffect(() => {
    sessionStorage.setItem("phone", inputValue);
  }, [inputValue]);

  const getCode = async () => {
    try {
      setDisabled(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/check_number/${inputValue}/web`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue })
      });

      if (!response.ok) {
        throw new Error('Failed to send the request');
      }

      const data = await response.json();
      console.log('Success:', data);
      router.push("/auth/code")
    } catch (error) {
      console.error('Error:', error);
      setDisabled(false)
    }
  }

  return (
    <>
      <p className="text-sm leading-6 mt-10">
        برای ورود یا ثبت‌نام، لطفا شماره موبایل خود را وارد کنید
      </p>
      <input
        dir="ltr"
        className={`placeholder:text-right mt-8 w-full py-3 px-4 rounded-lg border-solid border-[1px] ${error ? "border-danger" : "border-default-100"
          } ${inputRef.current && inputRef.current.value !== "" && "border-tertiary"
          }`}
        type="tel"
        placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
        value={inputValue}
        ref={inputRef}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = value.replace(/[^0-9]/g, "");
          setInputValue(numericValue);
          setError(
            numericValue !== "" && !phoneNumber.safeParse(numericValue).success
          );
        }}
      />
      <p className={`${error ? "block" : "hidden"} mt-4 text-danger-900`}>
        شماره وارد شده معتبر نیست.
      </p>
      <LoginButton
        onClick={() => {
          if (inputRef.current && inputRef.current.value.length === 11) {
            getCode()
          }
        }}
        disabled={disabled}
        className={`${!error &&
          inputRef.current &&
          inputRef.current.value !== "" &&
          inputRef.current.value.length === 11
          ? "bg-primary text-default-900"
          : "bg-orange-100 text-default-400"
          }`}
        text={"ورود به اگمارکت"}
      />
      <p className="text-xs mt-6">
        با ورود یا ثبت‌نام در اگمارکت،{" "}
        <span className="text-tertiary underline underline-offset-8 cursor-pointer">
          قوانین و مقررات
        </span>{" "}
        آن را می‌پذیرید.
      </p>
    </>
  );
}
