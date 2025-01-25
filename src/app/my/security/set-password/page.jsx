'use client'
import LoginButton from "@/components/loginButton/LoginButton";
import LoginInput from "@/components/loginInput/LoginInput";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { z } from "zod";

export default function SetPasswordPage() {
    const [inputValue, setInputValue] = useState("");
    const [inputValueVerify, setInputValueVerify] = useState("");
    const [state, setState] = useState([false, false, false]);
    const [verify, setVerify] = useState(false);
    const inputRef = useRef();
    const inputRefVerify = useRef();
    const router = useRouter();

    const characterMin = z.string().min(8).refine(s => !s.includes(' '), 'No Spaces!');
    const english = z.string().regex(/[a-zA-Z]/);
    const number = z.string().regex(/[0-9]/);

    useEffect(() => {
        if (sessionStorage?.getItem('current-password')) {
            router.push('/my/security/change-password')
        }

        if (sessionStorage?.getItem('current-password')) {
            return null
        }
    }, [])

    return (
        <>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/my/security')}>
                <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
                <p className="text-default-900 font-semibold text-xl">تعیین رمز عبور</p>
            </div>
            <div className="mt-10">
                <p className="text-default-700">رمز عبور جدید</p>
                <LoginInput
                    className={'mt-3'}
                    inputRef={inputRef}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    onChange={() => {
                        const newState = [
                            characterMin.safeParse(inputRef.current.value).success,
                            english.safeParse(inputRef.current.value).success,
                            number.safeParse(inputRef.current.value).success,
                        ]
                        setState(newState)
                        setVerify(inputRef.current.value === inputRefVerify.current.value && inputRef.current.value !== '');
                    }}
                />
            </div>
            <ul className="flex flex-col gap-1 mt-3">
                {
                    ['حداقل ۸ کاراکتر', 'شامل حروف انگلیسی', 'شامل عدد'].map((list, index) => (
                        <li className={`flex items-center gap-1 ${state[index] ? 'text-success' : 'text-default-500'}`} key={index + 1}>
                            <div className="size-4 flex justify-center items-center">
                                <span className={`text-lg ${state[index] ? 'icon-light-linear-Tick' : 'rounded-full bg-default-500 w-[6px] h-[6px]'}`}></span>
                            </div>
                            <p>{list}</p>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-6">
                <p className="text-default-700">تکرار رمز عبور جدید</p>
                <LoginInput
                    className={'mt-2'}
                    disabled={!state.every(s => s)}
                    inputRef={inputRefVerify}
                    setInputValue={setInputValueVerify}
                    inputValue={inputValueVerify}
                    onChange={() => {
                        setInputValueVerify(inputRefVerify.current.value);
                        setTimeout(() => {
                            setVerify(inputRef.current.value === inputRefVerify.current.value);
                        }, 0)
                    }}
                />
            </div>
            <LoginButton onClick={() => {
                verify && router.push('/my/security/change-password')
                sessionStorage.setItem('current-password', inputValueVerify)
            }} className={`mt-10 ${verify ? 'bg-primary text-default-900' : 'bg-orange-100 text-default-100'}`} text={'تعیین رمز عبور'} />
        </>
    )
}