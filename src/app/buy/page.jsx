"use client";

import Button from "@/components/UI/Button";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import border from "@/image/border.svg";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { Axios } from "@/axios";
import { toast } from "react-toastify";

export default function Page() {
  const searchParams = useSearchParams();

  const captureRef = useRef();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (searchParams.get("0[status]") === "1") {
      setData([
        {
          name: "شماره فاکتور",
          text: searchParams.get("0[OrderID]"),
        },
        {
          name: "شماره پیگیری",
          text: searchParams.get("0[TRACENO]"),
        },
        {
          name: "نوع پرداخت",
          text: "پرداخت آنلاین",
        },
        {
          name: "تاریخ",
          text: JSON.parse(searchParams.get("0[params]")).date.split(" ")[0], //convert
          second: JSON.parse(searchParams.get("0[params]"))
            .date.split(" ")[1]
            .slice(0, 5),
        },
        {
          name: "مبلغ",
          text: JSON.parse(searchParams.get("0[params]")).Amount.substring(
            0,
            JSON.parse(searchParams.get("0[params]")).Amount.length - 1
          ),
          second: "تومان",
        },
      ]);
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  const prePurchaseLoad = async () => {
    const response = await Axios.post("/API/transactions/purchase", {
      load_id: Number(localStorage.getItem("prePurcahsedId")),
    });
    if (response.status === 200) {
      toast.info("بار با موفقیت پیش خرید شد");
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("prePurcahsedId");
    } else {
      // Handle other errors
      console.error("Error occurred:", response);
      toast.warning("Unexpected error occurred. Please try again.");
    }
  };

  const onlinePay = async () => {
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/paymethods/pay`,
      {
        paymethod: "sep",
        amount: 200000000,
      }
    );
    if (response.status === 200) {
      toast.info(response.data[0].message);
      const payForm = document.getElementById("formPay");
      const toeknInput = document.getElementById("tokenInput");
      payForm.setAttribute("action", response.data[0].params.actionURL);
      toeknInput.setAttribute("value", response.data[0].params.Token);
      document.getElementById("submitBtn").click();
      localStorage.removeItem("paymentStatus");
      localStorage.setItem("paymentStatus", "done");
    } else {
      toast.error("مشکلی در درخواست وجود دارد");
      console.log(error);
    }
  };

  useEffect(() => {
    const local = localStorage.getItem("paymentStatus");
    if (local === "done") {
      prePurchaseLoad();
    }
    setStatus(localStorage.getItem("paymentStatus"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center gap-7 px-6">
      <form method="post" id="formPay" className="hidden">
        <input type="hidden" name="Token" id="tokenInput" />
        <button id="submitBtn"></button>
      </form>
      <div
        ref={captureRef}
        className="relative bg-[#F7F7F7] w-full rounded-tl-2xl rounded-tr-2xl border-solid border-t border-x border-[#C2C2C2]"
      >
        <span className="icon-Share absolute top-4 right-4 text-xl text-default-500 cursor-pointer"></span>
        <Image
          className="absolute top-[100%] inset-x-0 w-full"
          src={border}
          alt="style"
        />
        {searchParams.get("0[status]") === "0" ? (
          <div className="mt-6 flex flex-col gap-6 justify-center items-center mb-10">
            <div className="flex justify-center items-center rounded-full w-[85px] h-[85px] bg-denger-900">
              <span className="icon-light-bold-Close-Circle text-[85px] text-danger-900"></span>
            </div>
            <p className="text-xl font-bold text-danger-900">
              {searchParams.get("0[message]")}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-6 justify-center items-center">
              <div className="flex justify-center items-center rounded-full w-[85px] h-[85px] bg-success">
                <span className="icon-light-linear-Tick-success text-6xl"></span>
              </div>
              <p className="text-xl font-bold text-success">
                پرداخت شما با موفقیت انجام شد.
              </p>
            </div>
            <ul className="mt-10 mb-6 flex flex-col">
              {data.map((list, index) => (
                <li
                  key={index + 1}
                  className="flex justify-between items-center px-6 h-11"
                >
                  <p className="text-sm font-normal text-default-500">
                    {list.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-default-900">
                      {list.text}
                    </p>
                    <p className="text-sm font-normal text-default-500">
                      {list.second}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {status === "second" ? (
        <>
          <p className="text-sm">
            شما اولین پرداخت علی الحساب برای این بار را انجام دادید. برای انجام
            پرداخت دوم و پیش خرید بار کلیک کنید.
          </p>
          <Button
            text="پرداخت آنلاین"
            type="w-full text-tertiary border-solid border-[2px] border-tertiary"
            onClick={() => onlinePay()}
          />
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Button
            text="ذخیره"
            type="w-full text-tertiary border-solid border-[2px] border-tertiary"
            onClick={() => {
              const element = captureRef.current;
              html2canvas(element, {
                useCORS: true,
                allowTaint: false,
              }).then((canvas) => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "screenshot.png";
                link.click();
              });
            }}
          />
          <Button
            text="بازگشت به آگهی‌ها"
            type="w-full text-tertiary border-solid border-[2px] border-tertiary"
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
}
