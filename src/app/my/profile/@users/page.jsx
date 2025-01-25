'use client'

import LoginButton from "@/components/loginButton/LoginButton";
import { useContext, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ToggleShow } from "../layout";
import { useProfile } from "@/store/profileState";

export default function Users() {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const inputRef = useRef(inputValue);
    const [toggle, onClick, dialogPhone] = useContext(ToggleShow)
    const addSheba = useProfile(state => state.addSheba)

    const phoneNumber = z
        .string()
        .regex(/^0\d{0,10}$/g)
        .min(0)
        .max(11);

    useEffect(() => {
        sessionStorage.setItem("phone", inputValue);
    }, [inputValue]);

    useEffect(() => {
        setInputValue('')
    }, [toggle, onClick, dialogPhone])

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
        } catch (error) {
            console.error('Error:', error);
            setDisabled(false)
        }
    }

    return (
        <div className="">
            <p>{dialogPhone !== 'sheba' ? 'شماره موبایل جدید خود را وارد کنید' : 'شماره شبا جدید خود را وارد کنید'}</p>
            <input
                dir="ltr"
                className={`placeholder:text-right mt-4 w-full py-3 px-4 rounded-lg border-solid border-[1px] ${error ? "border-danger" : "border-default-100"
                    } ${inputRef.current && inputRef.current.value !== "" && "border-tertiary"
                    }`}
                type="text"
                placeholder={dialogPhone === 'sheba' ? '' : "مثلا ۰۹۱۲۳۴۵۶۷۸۹"}
                value={inputValue}
                ref={inputRef}
                onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value.replace(/[^0-9]/g, "");
                    if (dialogPhone !== 'sheba') {
                        setInputValue(numericValue);
                        setError(
                            numericValue !== "" && !phoneNumber.safeParse(numericValue).success
                        );
                    } else {
                        setError(false)
                        const regex = /^0\d*$/g
                        if (!regex.test(e.target.value)) {
                            setInputValue(e.target.value);
                        }
                    }
                }}
            />
            <p className={`${error ? "visible" : "invisible"} mt-4 mb-[95px] text-danger-900`}>
                شماره وارد شده معتبر نیست.
            </p>
            <LoginButton
                onClick={() => {
                    if (inputRef.current && inputRef.current.value.length === 11 && dialogPhone !== 'sheba') {
                        getCode()
                        onClick('code')
                    } else if (inputRef.current && inputRef.current.value.length === 24) {
                        addSheba(inputRef.current?.value)
                    }
                }}
                disabled={disabled}
                className={`${!error &&
                    inputRef.current &&
                    inputRef.current.value !== "" &&
                    inputRef.current.value.length === 11 &&
                    dialogPhone !== 'sheba'
                    ? "bg-primary text-default-900"
                    : inputRef.current &&
                        inputRef.current.value !== "" &&
                        inputRef.current.value.length === 24 ? 'bg-primary text-default-900' : "bg-orange-100 text-default-400"
                    }`}
                text={dialogPhone === 'change' ? 'تغییر شماره' : dialogPhone === 'add' ? 'افزودن شماره تماس' : 'افزودن شماره شبا'}
            />
        </div>
    )
}