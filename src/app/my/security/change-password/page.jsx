'use client'
import LoginButton from "@/components/loginButton/LoginButton";
import LoginInput from "@/components/loginInput/LoginInput";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export default function ChangePasswordPage() {
    const [inputValue, setInputValue] = useState("");
    const [inputValueVerify, setInputValueVerify] = useState("");
    const [inputCurrent, setInputCurrent] = useState("");
    const [state, setState] = useState([false, false, false]);
    const [verify, setVerify] = useState(false);
    const [verifyCurrent, setVerifyCurrent] = useState(false);
    const inputRef = useRef();
    const inputRefVerify = useRef();
    const inputRefCurrent = useRef();
    const currentPasswordRef = useRef("");
    const router = useRouter();

    const characterMin = z.string().min(8).refine(s => !s.includes(' '), 'No Spaces!');
    const english = z.string().regex(/[a-zA-Z]/);
    const number = z.string().regex(/[0-9]/);
    useEffect(() => {
        const storedPassword = sessionStorage.getItem('current-password')
        currentPasswordRef.current = storedPassword
        console.log('session stoarge:', storedPassword)
    }, [])
    useEffect(() => {
        console.log('input value:', inputCurrent)
    }, [inputCurrent, setInputCurrent])

    return (
        <>
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/my/security')}>
                <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
                <p className="text-default-900 font-semibold text-xl">تغییر رمز عبور</p>
            </div>
            <div className="mt-8">
                <p className="text-default-700">رمز عبور فعلی</p>
                <LoginInput
                    className={'mt-3'}
                    inputRef={inputRefCurrent}
                    setInputValue={setInputCurrent}
                    inputValue={inputCurrent}
                    onChange={() => {
                        setVerifyCurrent(false)
                    }}
                />
                <div className={`my-4 mr-2 text-danger-900 flex items-center gap-2 ${verifyCurrent ? 'visible' : 'invisible'}`}>
                    <span className="icon-caution-empty-danger text-xl"></span>
                    <p>رمز عبور فعلی اشتباه است.</p>
                </div>
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
                            <span className={`text-lg ${state[index] ? 'icon-light-linear-Tick' : 'text-[6px] icon-light-bold-Record-input'}`}></span>
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
                if (currentPasswordRef.current === inputCurrent) {
                    verify && router.push('/my')
                    sessionStorage.setItem('current-password', inputValueVerify)
                } else {
                    console.log('false')
                    setVerifyCurrent(true)
                }
            }} className={`mt-10 ${verify ? 'bg-primary text-default-900' : 'bg-orange-100 text-default-100'}`} text={'تعیین رمز عبور'} />
        </>
    )
}