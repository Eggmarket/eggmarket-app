"use client";

import { useState, useRef, useEffect, useContext } from "react";
import LoginButton from "../loginButton/LoginButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToggleShow } from "@/app/my/profile/layout";
import { useProfile } from "@/store/profileState";
import { useToken } from "../hook/useToken/useToken";

const Code = ({ phone, modal = false, dialogPhone, toggle }) => {
  const [token, setToken] = useToken();
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [time, setTime] = useState({ min: 2, sec: 0 });
  const inputRefs = useRef([]);
  const router = useRouter();
  // const [toggle] = useContext(ToggleShow)
  // const [toggle] = modal ? useContext(ToggleShow) : [null]
  const addProfile = useProfile((state) => state.addProfile);

  useEffect(() => {
    if (time.min === 0 && time.sec === 0) return;

    const countDown = setInterval(() => {
      if (time.sec > 0) {
        setTime((prev) => ({
          ...prev,
          sec: prev.sec - 1,
        }));
      } else if (time.sec === 0 && time.min > 0) {
        setTime((prev) => ({
          min: prev.min - 1,
          sec: 59,
        }));
      }
    }, 1000);

    return () => clearInterval(countDown);
  }, [time]);

  const handleInputChange = (index, e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    const newInputValue = [...inputValue];
    newInputValue[index] = numericValue;
    setInputValue(newInputValue);
    if (numericValue.length === 1) {
      const nextIndex = index + 1;
      if (
        nextIndex <= inputValue.length - 1 &&
        inputRefs.current[nextIndex].value === ""
      ) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const x = parseInt(inputValue.join(""));

  const getCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/confirm/${phone}/${x}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, x }),
        }
      );

      if (response.status !== 200 && response.status !== 203) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      !modal && router.push("/");

      if (dialogPhone === "add") {
        addProfile(localStorage.getItem("phone"));
      }
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      setError(true);
    }
    // try {
    //   await fetch(`${process.env.NEXT_PUBLIC_EGG_MARKET}/api/token`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data.token),
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    // sessionStorage.clear();
    // setError(false);
  };

  return (
    <>
      <div className="flex flex-row-reverse justify-center gap-3">
        {inputValue.map((value, index) => (
          <input
            key={index}
            dir="ltr"
            value={value}
            className={`text-center w-[55px] h-[55px] rounded-lg border-[1px] border-solid ${
              error
                ? "border-danger-900"
                : inputValue[index] !== ""
                ? "!border-tertiary"
                : "!border-default-300"
            } max-sm:w-12 max-sm:h-12 text-[28px] font-bold`}
            type="tel"
            maxLength={1}
            onClick={(e) => {
              inputRefs.current[index].setSelectionRange(1, 2);
            }}
            onChange={(e) => {
              handleInputChange(index, e);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (inputValue.every((value) => value !== "")) {
                  getCode();
                }
              }
              if (e.key === "ArrowUp" || e.key === "ArrowDown")
                e.preventDefault();
              if (e.key === "ArrowLeft") {
                if (index > 0) {
                  e.preventDefault();
                  inputRefs.current[index - 1].focus();
                } else {
                  e.preventDefault();
                }
              } else if (
                e.key === "ArrowRight" &&
                index < inputValue.length - 1
              ) {
                e.preventDefault();
                inputRefs.current[index + 1].focus();
              }
              if (e.key === "Backspace") {
                setError(false);
                if (inputRefs.current[index].value === "" && index > 0) {
                  e.preventDefault();
                  inputRefs.current[index - 1].focus();
                } else {
                  const newInputValue = [...inputValue];
                  newInputValue[index] = "";
                  setInputValue(newInputValue);
                }
              }
            }}
            ref={(e) => (inputRefs.current[index] = e)}
          />
        ))}
      </div>
      <div className="grid grid-rows-2">
        <div
          className={`flex items-center gap-2 text-danger-900 font-normal text-sm mt-4 ${
            error ? "-order-last visible" : "order-last invisible"
          }`}
        >
          <span className="icon-caution-empty-danger text-xl"></span>کد وارد‌شده
          نادرست است.
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-normal text-default-500">
            کد را دریافت نکردید؟
          </p>
          {toggle === "code" ? (
            time.min === 0 && time.sec === 0 && toggle === "code" ? (
              <button
                className="text-tertiary text-sm font-semibold cursor-pointer"
                disabled={disabled}
                onClick={async () => {
                  try {
                    setDisabled(true);
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/renew_confirm_code/${phone}/sms`
                    );
                    res && setDisabled(false);
                    setTime((prev) => ({ min: 2, sec: 0 }));
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                درخواست دوباره
              </button>
            ) : (
              <p className="text-sm font-normal text-default-500">{`${String(
                time.min
              ).padStart(2, "0")}:${String(time.sec).padStart(
                2,
                "0"
              )} تا درخواست دوباره`}</p>
            )
          ) : time.min === 0 && time.sec === 0 ? (
            <p
              className="text-tertiary text-sm font-semibold cursor-pointer"
              onClick={async () => {
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/renew_confirm_code/${phone}/sms`
                  );
                  setTime((prev) => ({ min: 2, sec: 0 }));
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              درخواست دوباره
            </p>
          ) : (
            <p className="text-sm font-normal text-default-500">{`${String(
              time.min
            ).padStart(2, "0")}:${String(time.sec).padStart(
              2,
              "0"
            )} تا درخواست دوباره`}</p>
          )}
        </div>
      </div>
      {modal ? null : (
        <Link
          href={"/auth/password"}
          className="flex items-center text-tertiary mt-8"
        >
          <p>ورود با رمز عبور</p>
          <span className="icon-light-bold-Left-2 text-2xl"></span>
        </Link>
      )}
      <div className="modal-action">
        <form method="dialog" className="w-full">
          {modal ? (
            <div className="modal-action !mt-0">
              <form method="dialog" className="w-full">
                <LoginButton
                  onClick={() => {
                    if (inputValue.every((value) => value !== "")) {
                      getCode();
                    }
                  }}
                  className={`${
                    inputValue.every((value) => value !== "")
                      ? "bg-primary text-default-900"
                      : "bg-orange-100 text-default-100"
                  } !mt-0`}
                  text={"ادامه"}
                />
              </form>
            </div>
          ) : (
            <LoginButton
              onClick={(e) => {
                e.preventDefault();
                if (inputValue.every((value) => value !== "")) {
                  getCode();
                }
              }}
              className={`${
                inputValue.every((value) => value !== "")
                  ? "bg-primary text-default-900"
                  : "bg-orange-100 text-default-400"
              } !mt-0`}
              text={"ادامه"}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default Code;
