"use client";
import MyTransactionCard from "@/components/Cards/MyTransactionCard";
import { useToken } from "@/components/hook/useToken/useToken";
import FullModal from "@/components/Modal/FullModal";
import { monthNames } from "@/components/static";
import TransactionFilter from "@/components/TransactionPage/TransactionFilter";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import excelIcon from "@/components/svg/excelIcon.svg";

export default function Page() {
  const { back } = useRouter();
  // const [filterValues, setFilterValues] = useState({
  //   dateFrom: "",
  //   dateTo: "",
  //   priceFrom: "",
  //   priceTo: "",
  //   deposit: true,
  //   withdraw: true,
  //   filter: [1, 2], // 1 is for deposit and 2 is for withdraw
  // });

  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useToken();

  useEffect(() => {
    async function getUserTransactions() {
      setIsLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/list`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTransactions(response.data);
          setFilteredData(response.data);
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
      <div className="sticky top-0 bg-inherit flex justify-between items-center mb-2 py-6 px-4">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">
            درخواست‌های ثبت‌شده
          </h3>
        </div>
        <button
          onClick={() =>
            document.getElementById("walletTransactionModal").showModal()
          }
          className="icon-light-linear-Filter-1 text-2xl text-purple-900 ml-4"
        >
        </button>
      </div>
      <div className="pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : !filteredData?.length ? (
          <p className="text-center text-default-400 text-lg mt-4">
            شما فعالیتی ندارید
          </p>
        ) : (
          <div className="px-4">
            {filteredData.map((card, index, arr) => {
              // const prevCard = arr[index - 1];
              // const prevMonth = Number(prevCard?.time.split("-")[1]);
              // const prevYear = Number(prevCard?.time.split("-")[0]);
              // const curMonth = Number(card.time.split("-")[1]);
              // const curYear = Number(card.time.split("-")[0]);
              return (
                <React.Fragment key={card.id}>
                  {/* {(prevMonth !== curMonth || prevYear !== curYear) && (
                    <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                      <hr className="w-full border-default-300" />
                      <p className="text-xs text-default-500 basis-1 text-nowrap">
                        {monthNames[curMonth - 1]} {curYear}
                      </p>
                      <hr className="w-full border-default-300" />
                    </div>
                  )} */}
                  <MyTransactionCard item={card} />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      <FullModal id="walletTransactionModal">
        <TransactionFilter
          source="wallet"
          setFilteredData={setFilteredData}
          transactions={transactions}
        />
      </FullModal>
    </div>
  );
}
