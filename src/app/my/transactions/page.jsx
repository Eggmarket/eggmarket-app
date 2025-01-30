"use client";
import MyTransactionCard from "@/components/Cards/MyTransactionCard";
import FullModal from "@/components/Modal/FullModal";
import { monthNames } from "@/components/static";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TransactionFilter from "@/components/TransactionPage/TransactionFilter";
import axios from "axios";
import { useToken } from "@/components/hook/useToken/useToken";
import excelIcon from "@/components/svg/excelIcon.svg";
import Image from "next/image";
import BottomModal from "@/components/Modal/BottomModal";
import Button from "@/components/UI/Button";
import HistoryModal from "@/components/Modal/HistoryModal";

export default function Page() {
  const { back } = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [excelDate, setExcelDate] = useState({
    from: "",
    to: "",
  });
  const [token, setToken] = useToken();

  useEffect(() => {
    async function getUserTransactions() {
      setIsLoading(true);
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/list`,
          { per_page: 1000 },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
    getUserTransactions();
  }, []);

  return (
    <div className="bg-default-50 min-h-screen">
      <div className="sticky top-0 bg-inherit flex justify-between items-center mb-2 py-8 px-4">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">گردش حساب</h3>
        </div>
        <div className="flex gap-2 items-center ml-4">
          <button
            onClick={() => {
              document.getElementById("excelExportSettingModal").showModal();
              console.log("here");
            }}
          >
            <Image src={excelIcon} height={24} width={24} alt="excel icon" />
          </button>
          <button
            onClick={() =>
              document.getElementById("walletTransactionModal").showModal()
            }
            className="icon-light-linear-Filter-1 text-2xl text-purple-900"
          ></button>
        </div>
      </div>
      <div className="pb-8">
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : !filteredTransactions?.length ? (
          <p className="text-center text-default-400 text-lg mt-4">
            شما فعالیتی ندارید
          </p>
        ) : (
          <div className="px-4">
            {filteredTransactions.map((card, index, arr) => {
              const prevCard = arr[index - 1];

              let currentDate = new Date(card.time * 1000);
              let prevDate = new Date(prevCard?.time * 1000);

              currentDate = currentDate.toLocaleDateString("fa-IR");
              prevDate = prevDate.toLocaleDateString("fa-IR");

              currentDate = currentDate.split("/");
              prevDate = prevDate.split("/");

              return (
                <React.Fragment key={card.id}>
                  {(!index ||
                    prevDate[1] !== currentDate[1] ||
                    prevDate[0] !== currentDate[0]) && (
                    <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                      <hr className="w-full border-default-300" />
                      <p
                        className="text-xs text-default-500 basis-1 text-nowrap"
                        dir="ltr"
                      >
                        {currentDate[0]}{" "}
                        {
                          monthNames[
                            currentDate[1].replace(/[۰-۹]/g, (d) =>
                              "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
                            ) - 1
                          ]
                        }
                      </p>
                      <hr className="w-full border-default-300" />
                    </div>
                  )}
                  <MyTransactionCard key={index} item={card} />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      <FullModal id="walletTransactionModal">
        <TransactionFilter
          setFilteredData={setFilteredTransactions}
          transactions={transactions}
          source="transactions"
        />
      </FullModal>
      <BottomModal id="excelExportSettingModal">
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center h-[46px] px-4 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">خروجی اکسل</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <div className="p-4">
          <p className="text-sm text-default-600 mb-2">
            بازه زمانی خروجی اکسل را مشخص کنید
          </p>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() =>
                document.getElementById("dateFromExcelModal").showModal()
              }
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-3 flex-1 flex justify-between items-center ${
                excelDate?.from ? "bg-inherit" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500">از:</span>
              <p className="font-medium text-default-900 text-base">
                {excelDate.from
                  ? `${excelDate.from.year}/${
                      monthNames.indexOf(excelDate.from.month) + 1
                    }/${excelDate.from.day}`
                  : ""}
              </p>
              <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
            </button>
            <button
              onClick={() =>
                document.getElementById("dateToExcelModal").showModal()
              }
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-3 flex-1 flex justify-between items-center ${
                excelDate.to ? "bg-inherit" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500">تا:</span>
              <p className="font-medium text-default-900 text-base">
                {excelDate.to
                ? `${excelDate.to.year}/${
                    monthNames.indexOf(excelDate.to.month) + 1
                  }/${excelDate.to.day}`
                : ""}
              </p>
              <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
            </button>
          </div>
          <Button
            type="button-primary-2"
            text="دانلود"
            width="w-full"
            disabled={
              excelDate.from === "" || excelDate.to === "" ? true : false
            }
            onClick={() => {
              document.getElementById("excelExportSettingModal").close();
            }}
          />
        </div>
      </BottomModal>

      <HistoryModal
        id="dateFromExcelModal"
        setDateValue={(data) => setExcelDate({ ...excelDate, from: data })}
      />
      <HistoryModal
        id="dateToExcelModal"
        setDateValue={(data) => setExcelDate({ ...excelDate, to: data })}
      />
    </div>
  );
}
