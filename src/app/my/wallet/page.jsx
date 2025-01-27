"use client";
import MyTransactionCard from "@/components/Cards/MyTransactionCard";
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
import { useRef } from "react";

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletCard, setWalletCard] = useState(false);
  const [wallectCardWidth, setWalletCardWidth] = useState(0);

  const { back } = useRouter();
  const { wallet, loading, reFetchWallet } = useWallet();
  const [token, setToken] = useToken();
  const walletCardRef = useRef();

  const updateHandler = () => {
    getUserTransactions();
    reFetchWallet();
  };

  async function getUserTransactions() {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTransactions(
          response.data.filter((item) => item.reason === 4 || item.reason === 3)
        );
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

  useEffect(() => {
    getUserTransactions();
    setWalletCardWidth(walletCardRef.current?.offsetWidth);
  }, [wallectCardWidth]);

  return (
    <div className="bg-default-50 min-h-screen flex flex-col">
      <div className="flex-0 sticky top-0 bg-inherit w-full mb-2 p-8 gap-4 flex justify-start items-center">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">کیف پول</h3>
      </div>
      <div className="flex-1 px-8">
        {walletCardRef && (
          <button
            ref={walletCardRef}
            className="p-4 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 mb-8 relative h-[156px]"
            onClick={() => {
              setWalletCard(!walletCard);
            }}
          >
            {wallectCardWidth ? (
              <>
                <span
                  className={`absolute ${
                    walletCard
                      ? "top-11 left-1/2 text-default-500 text-[70px]"
                      : `top-4 text-[32px] text-default-300 left-[${
                          wallectCardWidth / 2 - 16
                        }px]`
                  } icon-light-linear-Wallet transition-all duration-300 ease-in-out`}
                ></span>
                <p
                  className={`absolute ${
                    walletCard
                      ? "right-6 top-8"
                      : `top-14 right-[${wallectCardWidth / 2 - 50}px]`
                  } text-sm text-default-300 transition-all duration-300 ease-in-out`}
                >
                  موجودی کیف پول:
                </p>
                <div
                  className={`absolute flex items-center gap-1 ${
                    walletCard
                      ? "left-6 top-8 text-xl font-semibold"
                      : `top-24 text-[28px] font-medium left-[${
                          wallectCardWidth / 2 - 90
                        }px] `
                  } transition-all duration-300 ease-in-out`}
                >
                  <span className="text-default-50">
                    {trimPrice(wallet?.value, ",")}
                  </span>
                  <span className="text-[#C2C2C2] text-xs">تومان</span>
                </div>
              </>
            ) : (
              ""
            )}

            {/* <div
            className={`${
              walletCard ? "hidden" : "flex"
            } flex-col items-center transition-all duration-300 ease-in-out`}
          >
            <span className="icon-light-linear-Wallet text-[32px] text-default-300"></span>
            <p className="text-sm text-default-300 mt-2 mb-4">
              موجودی کیف پول:
            </p>
            <div>
              <span className="text-default-50">
                {trimPrice(wallet?.value, ",")}
              </span>
              <span className="text-[#C2C2C2] text-xs"> تومان</span>
            </div>
          </div>*/}
            <div
              className={`${
                walletCard ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out duration-500 absolute bottom-6 inset-x-6`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-sm text-default-300">بلوکه شده:</p>
                <p className="flex items-center">
                  <span className="font-semibold text-xl ml-2 text-primary">
                    {loading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      trimPrice(wallet?.suspended, ",")
                    )}
                  </span>
                  <span className="text-xs text-primary">تومان</span>
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-default-300">قدرت خرید:</p>
                <p className="flex items-center">
                  <span className="font-semibold text-xl ml-2 text-default-50">
                    {loading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      trimPrice(wallet?.balance, ",")
                    )}
                  </span>
                  <span className="text-xs text-[#C2C2C2]">تومان</span>
                </p>
              </div>
            </div>
          </button>
        )}
        {/* <div className="py-6 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 flex flex-col items-center mb-8">
          <div className="flex items-center justify-between w-full mb-2">
            <p className="text-sm text-default-300">موجودی کل:</p>
            <p className="flex items-center">
              <span className="font-semibold text-xl ml-2 text-default-50">
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  trimPrice(wallet?.value, ",")
                )}
              </span>
              <span className="text-xs text-[#C2C2C2]">تومان</span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full mb-2">
            <p className="text-sm text-default-300">بلوکه شده:</p>
            <p className="flex items-center">
              <span className="font-semibold text-xl ml-2 text-primary">
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  trimPrice(wallet?.suspended, ",")
                )}
              </span>
              <span className="text-xs text-primary">تومان</span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-default-300">قدرت خرید:</p>
            <p className="flex items-center">
              <span className="font-semibold text-xl ml-2 text-default-50">
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  trimPrice(wallet?.balance, ",")
                )}
              </span>
              <span className="text-xs text-[#C2C2C2]">تومان</span>
            </p>
          </div>
        </div> */}
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
          {loading ? (
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
              .map((card, index) => (
                <MyTransactionCard key={index} item={card} />
              ))
          )}
        </div>
      </div>
      <Link
        href="wallet/requests"
        className="flex-0 block border border-tertiary text-tertiary rounded-xl py-3 text-center mx-8 mb-6"
      >
        مشاهده همه درخواست‌های ثبت‌شده
      </Link>
      <BottomModal id="depositModal">
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center h-[46px] px-4 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">افزایش موجودی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <DepositTabs updateHandler={updateHandler} />
      </BottomModal>
      <BottomModal id="withdrawModal" onClose={() => {}}>
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center h-[46px] px-4 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">نقد کردن موجودی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <WithdrawTab />
      </BottomModal>
    </div>
  );
}
