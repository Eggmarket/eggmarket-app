"use client";
import { useToken } from "@/components/hook/useToken/useToken";
import BottomModal from "@/components/Modal/BottomModal";
import DepositTabs from "@/components/wallet/DepositTabs";
import WithdrawTab from "@/components/wallet/WithdrawTab";
import { useWallet } from "@/context/WalletProvider";
import { trimPrice } from "@/utils/trimPrice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import walletTrxIcon from "@/components/svg/walletTrx.svg";
import Image from "next/image";
import MyRequestCard from "@/components/Cards/MyRequestCard";
import WalletCard from "@/components/wallet/WalletCard";
import moment from "jalali-moment";
import { monthNames } from "@/components/static";

export default function Page() {
  const today = moment().local("fa");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billRegister, setBillRegister] = useState({
    depositValue: "",
    billNumber: "",
    date: {
      day: today.jDate(),
      month: monthNames[today.jMonth()],
      year: today.jYear(),
    },
    selectedImage: "",
  });

  const { back } = useRouter();
  const { reFetchWallet } = useWallet();
  const [token, setToken] = useToken();

  const updateHandler = () => {
    getUserTransactions();
    reFetchWallet();
  };

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
        setTransactions(response.data.reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getUserTransactions();
  }, []);

  return (
    <div className="bg-default-50 min-h-screen flex flex-col">
      <div className="flex-0 sticky top-0 bg-default-50 w-full mb-2 p-8 gap-4 flex justify-start items-center z-50">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">کیف پول</h3>
      </div>
      <div className="flex-1 px-8">
        <WalletCard />
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => document.getElementById("depositModal").showModal()}
            className="grid-span-1 rounded-xl border border-[#7AD68F] bg-gradient-to-r from-[#A6E3B5] to-[#E9F8EC] py-3 flex flex-col items-start pr-4"
          >
            <div className="mb-4 relative">
              <span className="icon-light-outline-Wallet text-green-200 text-2xl"></span>
              <span className="w-4 h-4 rounded-md border border-green-200 bg-white text-green-200 absolute top-3 flex items-center justify-center font-bold -left-1">
                <span className="text-lg">+</span>
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-default-700 text-sm text-start">
                افزایش موجودی
              </p>
              <span className="icon-light-linear-Left-2 text-2xl text-[#2D264B]"></span>
            </div>
          </button>
          <button
            onClick={() => document.getElementById("withdrawModal").showModal()}
            className="grid-span-1 rounded-xl border border-[#F28E86] bg-gradient-to-r from-[#F7B4AE] to-danger-100 py-3 flex flex-col items-start pr-4"
          >
            <div className="mb-4 relative">
              <span className="icon-light-outline-Wallet text-danger-900 text-2xl"></span>
              <span className="w-4 h-4 rounded-md border border-danger-900 bg-white text-danger-900 absolute top-3 flex items-center justify-center font-bold -left-1">
                <span className="text-lg">-</span>
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-default-700 text-sm text-start">
                نقد کردن موجودی
              </p>
              <span className="icon-light-linear-Left-2 text-2xl text-[#2D264B]"></span>
            </div>
          </button>
          <Link
            href="wallet/transactions"
            className="col-span-2 rounded-xl border border-default-400 bg-gradient-to-r from-default-300 to-default-100 h-[60px] flex items-center justify-between pr-4"
          >
            <Image src={walletTrxIcon} height={24} width={24} alt="icon" />
            <p className="text-default-700 text-sm text-start">گردش کیف پول</p>
            <span className="icon-light-linear-Left-2 text-2xl text-[#2D264B]"></span>
          </Link>
        </div>
        <div className="mb-8">
          <p className="text-xs text-default-400 mb-2">
            آخرین درخواست‌های ثبت‌شده
          </p>
          {isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center text-xs text-default-500">
              تراکنشی ندارید
            </p>
          ) : (
            transactions
              .slice(0, 3)
              .map((card, index) => <MyRequestCard key={index} item={card} />)
          )}
        </div>
      </div>
      <Link
        href="wallet/requests"
        className="flex-0 block border border-tertiary text-tertiary rounded-xl py-3 text-center mx-8 mb-6"
      >
        مشاهده همه درخواست‌های ثبت‌شده
      </Link>
      <BottomModal
        id="depositModal"
        onClose={() => {
          // setBillRegister({
          //   depositValue: "",
          //   billNumber: "",
          //   date: {
          //     day: today.jDate(),
          //     month: monthNames[today.jMonth()],
          //     year: today.jYear(),
          //   },
          //   selectedImage: "",
          // });
        }}
      >
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center h-[46px] px-4 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">افزایش موجودی</h3>
          <button className="btn btn-xs btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-xl text-[#2D264B]"></span>
          </button>
        </form>
        <DepositTabs
          billRegister={billRegister}
          setBillRegister={setBillRegister}
          updateHandler={updateHandler}
        />
      </BottomModal>
      <WithdrawTab updateHandler={updateHandler} />
    </div>
  );
}
