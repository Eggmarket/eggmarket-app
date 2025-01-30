"use client";
import { useToken } from "@/components/hook/useToken/useToken";
import FullModal from "@/components/Modal/FullModal";
import TransactionFilter from "@/components/TransactionPage/TransactionFilter";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MyRequestCard from "@/components/Cards/MyRequestCard";

export default function Page() {
  const { back } = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useToken();

  useEffect(() => {
    async function getUserTransactions() {
      setIsLoading(true);
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/payment-request/list`,
          {
            per_page: 1000,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          const data = response.data.reverse();

          setTransactions(data);
          setFilteredData(data);
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
        ></button>
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
            {filteredData.map((card, index) => (
              <MyRequestCard item={card} key={index} />
            ))}
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
