"use client";

import Checkbox from "@/components/UI/Checkbox";
import InputText from "@/components/UI/InputText";
import { useField, useProfile } from "@/store/profileState";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { DialogPhone, ToggleShow } from "./layout";
import Button from "@/components/UI/Button";

export default function ProfilePage() {
    const router = useRouter();
    const [phone, setPhone] = useState();
    const [inputToggle, setInputToggle] = useState(false);
    const [, setDialogPhone] = useContext(DialogPhone);
    const userProfile = useProfile((state) => state.userProfile);
    const userSheba = useProfile((state) => state.userSheba);
    const inputShebaRef = useRef();

    useEffect(() => {
        const storedPhone = JSON.parse(localStorage.getItem('profile'))
        setPhone(storedPhone.mobile)
        console.log('sheba:', userSheba.length)
    }, [])

    const lists = [
        { title: "مرغدار" },
        { title: "پخش" },
        { title: "فروشگاه" },
        { title: "بنکدار" },
        { title: "بسته‌بندی" },
        { title: "صادرات" },
    ];

    const inputLists = [
        {
            title: "نام و نام خانوادگی",
            placeholder: "نام و نام خانوادگی خود را وارد کنید...",
        },
        {
            title: "شهر",
            placeholder: "جستجوی شهر...",
            icon: "icon-Search",
            search: true,
            inputToggle: inputToggle,
            setInputToggle: setInputToggle,
        },
        {
            title: "شماره همراه",
            add: "افزودن شماره تماس",
            text: "تغییر شماره اصلی",
            placeholder: phone,
            readOnly: true,
            addPhone: true,
        },
        {
            title: "شماره شبا",
            add: "افزودن شماره شبا",
            placeholder: "",
            IR: "IR",
            sheba: true,
            ref: inputShebaRef,
        },
    ];

    const fields = useField((state) => state.fields);
    const addFields = useField((state) => state.addFields);
    const removeFields = useField((state) => state.removeFields);

    return (
        <div className="p-8">
            <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => router.back()}
            >
                <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
                <p className="text-default-900 font-semibold text-xl">پروفایل</p>
            </div>
            <div className="mt-10 text-default-700 font-medium">
                <p>
                    زمینه فعالیت
                    <span className="text-xs font-normal">
                        {" "}
                        (می‌توانید چند گزینه انتخاب کنید)
                    </span>
                </p>
            </div>
            <div className="mt-4 grid grid-cols-3 max-[480px]:grid-cols-2 gap-x-11 gap-y-6">
                {lists.map((data, index) => (
                    <Checkbox
                        key={index}
                        hasLine={false}
                        data={data}
                        onChange={() => {
                            if (fields.find((value) => value === data.title)) {
                                removeFields(`${data.title}`);
                            } else {
                                addFields(`${data.title}`);
                            }
                        }}
                        checked={fields.find((value) => value === data.title)}
                    />
                ))}
            </div>
            <div className="mt-8 flex flex-col gap-8">
                {inputLists.map((list, index) => (
                    <div className="mt-3" key={index}>
                        <label className="font-medium text-default-700">{list.title}</label>
                        <InputText
                            disabled={list.readOnly}
                            className={`${list.icon && "pr-11"} ${list.readOnly && "!bg-[#EDEDED] placeholder:text-default-900"
                                } ${list.IR && "text-left pl-8"}`}
                            placeholder={list.placeholder ?? "درحال بارگذاری..."}
                            iconRight={list.icon}
                            text={list.text}
                            textOnclick={() => {
                                setDialogPhone("change");
                                document.getElementById("phone_id").showModal();
                            }}
                            IR={list.IR}
                            dir={`${list.IR && "ltr"}`}
                            inputRef={inputShebaRef}
                            onChange={() => {
                                console.log("length:", inputShebaRef.current);
                            }}
                            search={list.search}
                            inputToggle={list.inputToggle}
                            setInputToggle={setInputToggle}
                            sheba={list.sheba}
                        />
                        {list.addPhone &&
                            userProfile.map((value, index) => (
                                <InputText
                                    disabled={true}
                                    className={`${list.icon && "pr-11"} ${list.readOnly && " placeholder:text-default-900"
                                        }`}
                                    key={index + 1}
                                    placeholder={value}
                                    modal={true}
                                    del={true}
                                >
                                    {value}
                                </InputText>
                            ))}
                        {list.sheba &&
                            userSheba.map((value, index) => (
                                <InputText
                                    disabled={true}
                                    className={`${list.icon && "pr-11"} ${list.sheba && "placeholder:text-default-900"
                                        } ${list.readOnly && " placeholder:text-red-500"}`}
                                    key={index + 1}
                                    placeholder={value}
                                    modal={true}
                                    del={true}
                                >
                                    {value}
                                </InputText>
                            ))}
                        {list.add && (
                            <div
                                className="mt-3 flex items-center gap-1 cursor-pointer"
                                onClick={() => {
                                    list.addPhone
                                        ? setDialogPhone("add")
                                        : setDialogPhone("sheba");
                                    document.getElementById("phone_id").showModal();
                                }}
                            >
                                <span className="icon-light-linear-Add text-default-500"></span>
                                <p className="font-normal text-sm text-default-500">
                                    {list.add}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="sticky bottom-4">
                <Button
                    text={"تایید اطلاعات"}
                    type={"bg-primary text-default-900 w-full mt-[27px]"}
                />
            </div>
        </div>
    );
}
