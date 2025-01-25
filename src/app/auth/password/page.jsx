"use client";

import LoginButton from "@/components/loginButton/LoginButton";
import LoginInput from "@/components/loginInput/LoginInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function PasswordPage() {
  const router = useRouter();
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="mt-10 flex justify-between items-center">
        <p className="text-sm text-default-400">
          رمز عبور حساب خود را وارد کنید
        </p>
        <p className="text-xs font-semibold text-tertiary">فراموشی رمز عبور</p>
      </div>
      <LoginInput
        className={"mt-8"}
        setInputValue={setInputValue}
        inputValue={inputValue}
        inputRef={inputRef}
      />
      <Link
        href={"/auth/code"}
        className="flex items-center gap-1 text-tertiary mt-8"
      >
        <p className="text-sm font-normal">ورود با رمز یکبار مصرف</p>
        <span className="icon-Down-2 text-[0.4rem] rotate-90"></span>
      </Link>
      <LoginButton
        onClick={() => {
          inputValue !== "" && router.push("/");
          sessionStorage.clear();
        }}
        className={`${inputValue !== ""
          ? "bg-primary text-default-900"
          : "bg-orange-100 text-default-400"
          }`}
        text={"تایید و ورود"}
      />
    </>
  );
}