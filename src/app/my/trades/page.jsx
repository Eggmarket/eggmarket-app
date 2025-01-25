"use client";
import Loading from "@/app/loading";
import UnDoneTradeCard from "@/components/TradesPage/UnDoneTradeCard";
import { useToken } from "@/components/hook/useToken/useToken";
import HistoryModal from "@/components/Modal/HistoryModal";
import { monthNames } from "@/components/static";
import AcceptDeliverCard from "@/components/TradesPage/AcceptDeliverCard";
import Checkbox from "@/components/UI/Checkbox";
import compareDate from "@/utils/compareDate";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DoneTradeCard from "@/components/TradesPage/DoneTradeCard";
import DoneTradeFactorModal from "@/components/TradesPage/DoneTradeFactorModal";
import UnDoneTradeFactorModal from "@/components/TradesPage/UnDoneTradeFactorModal";

const items = [
  {
    id: 0,
    title: "خرید",
  },
  {
    id: 1,
    title: "فروش",
  },
];

export default function Page() {
  const { back } = useRouter();
  const [pendingTrades, setPendingTrades] = useState([]);
  const [pendingFiltered, setPendingFiltered] = useState([]);
  const [doneTrades, setDonetrades] = useState([]);
  const [doneFiltered, setDoneFiltered] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [tradeType, setTradeType] = useState({
    0: true,
    1: true,
  });
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [token, setToken] = useToken();
  const [isFactorLoading, setIsFactorLoading] = useState(false);
  const [factor, setFactor] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    async function getUserDoneTrades() {
      setDoneLoading(true);
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/factors`,
          {
            page_num: 1,
            per_page: 10,
            imperfect: false,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setDonetrades(response.data);
          setDoneFiltered(response.data);
          setDoneLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setDoneLoading(false);
        });
    }
    async function getUserPendingTrades() {
      setPendingLoading(true);
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/factors`,
          {
            page_num: 1,
            per_page: 10,
            imperfect: true,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setPendingTrades(response.data);
          setPendingFiltered(response.data);
          setPendingLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPendingLoading(false);
        });
    }
    getUserDoneTrades();
    getUserPendingTrades();
  }, []);

  useEffect(() => {
    doneTrades.length && setDoneFiltered(checkFilters(doneTrades));
    pendingTrades.length && setPendingFiltered(checkFilters(pendingTrades));
  }, [dateFrom, dateTo, tradeType]);

  const checkFilters = (data) => {
    let temp = data;
    if (!tradeType[0]) {
      temp = temp.filter((item) => item.type !== 0);
    }
    if (!tradeType[1]) {
      temp = temp.filter((item) => item.type !== 1);
    }
    if (dateFrom) {
      temp = temp.filter((item) => compareDate(item.time, dateFrom, "from"));
    }
    if (dateTo) {
      temp = temp.filter((item) => compareDate(item.time, dateTo, "to"));
    }
    return temp;
  };

  const listenToScroll = () => {
    let heightToHideFrom = 70;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  async function getFactor(tradeId) {
    setIsFactorLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}API/factors/factor`,
        {
          id: tradeId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFactor({ ...response.data });

      setIsFactorLoading(false);
    } catch (error) {
      setIsFactorLoading(false);
      console.log(error);
    }
  }

  const checkHandler = (e, data) => {
    setTradeType((prev) => ({
      ...prev,
      [data.id]: e.target.checked,
    }));
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="sticky top-0 bg-inherit flex justify-between items-center px-4 pt-8 pb-6 z-10">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">معاملات من</h3>
        </div>
        {(dateFrom || dateTo || !tradeType[0] || !tradeType[1]) && (
          <button
            className="text-sm text-danger-900"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
              setTradeType({
                0: true,
                1: true,
              });
            }}
          >
            حذف همۀ فیلترها
          </button>
        )}
      </div>
      <div className={`px-6 tradeFilter relative ${isVisible ? "" : "hide"}`}>
        <p className="text-sm text-default-500 mb-2">تاریخ</p>
        <div className="flex gap-4">
          <button
            className="border border-[#C2C2C2] rounded-lg py-3 pr-4 pl-3 flex-1 flex justify-between items-center"
            onClick={() => document.getElementById("dateFromModal").showModal()}
          >
            <span className="text-sm text-default-500">از:</span>
            <p className="font-medium text-default-900">
              {dateFrom
                ? `${dateFrom.year}/${monthNames.indexOf(dateFrom.month) + 1}/${
                    dateFrom.day
                  }`
                : ""}
            </p>
            <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
          </button>
          <button
            className="border border-[#C2C2C2] rounded-lg py-3 pr-4 pl-3 flex-1 flex justify-between items-center"
            onClick={() => document.getElementById("dateToModal").showModal()}
          >
            <span className="text-sm text-default-500">تا:</span>
            <p className="font-medium text-default-900">
              {dateTo
                ? `${dateTo.year}/${monthNames.indexOf(dateTo.month) + 1}/${
                    dateTo.day
                  }`
                : ""}
            </p>
            <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
          </button>
        </div>
        <div className="mt-8 flex items-center gap-10">
          {items.map((item, index) => (
            <Checkbox
              key={item.id}
              data={item}
              onChange={checkHandler}
              checked={tradeType[index]}
              hasLine={false}
            />
          ))}
        </div>
      </div>
      <div className="px-4 mb-16">
        <div role="tablist" className="tabs tabs-lifted *:text-base flex">
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] flex-1 [--tab-border: 0px] ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            در انتظار...
          </a>
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] flex-1 [--tab-border: 0px] ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            معاملات انجام شده
          </a>
        </div>
        <div
          className={`py-6 px-4 bg-default-50 rounded-b-xl h-full ${
            activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {activeTab === 1 ? (
            pendingLoading ? (
              <Loading />
            ) : pendingFiltered.length === 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="icon-light-linear-Document-Justify-Right-1 text-[96px] text-default-300"></span>
                <p className="text-center text-default-400 text-lg mt-4">
                  شما هیچ فاکتور در انتظار پرداختی ندارید.
                </p>
              </div>
            ) : (
              <>
                {pendingFiltered.map((card) => (
                  <UnDoneTradeCard
                    key={card.id}
                    card={card}
                    setSelectedTrade={setSelectedTrade}
                    getFactor={getFactor}
                  />
                ))}
                <AcceptDeliverCard />
              </>
            )
          ) : doneLoading ? (
            <Loading />
          ) : doneFiltered.length === 0 ? (
            <div className="flex flex-col items-center gap-6">
              <span className="icon-light-linear-Document-Justify-Right-1 text-[96px] text-default-300"></span>
              <p className="text-center text-default-400 text-lg mt-4">
                شما هیچ معامله ای ندارید
              </p>
            </div>
          ) : (
            <>
              {doneFiltered.map((card, index, arr) => {
                let isEqual = false;
                if (index !== 0) {
                  let previous = new Date(arr[index - 1].time);
                  previous = new Intl.DateTimeFormat("fa-IR").format(previous);
                  let current = new Date(card.time);
                  current = new Intl.DateTimeFormat("fa-IR").format(current);
                  isEqual = current === previous;
                }
                let date = new Date(card.time);
                date = new Intl.DateTimeFormat("fa-IR").format(date).split("-");
                return (
                  <React.Fragment key={card.id}>
                    {!isEqual && (
                      <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                        <hr className="w-full border-default-300" />
                        <p className="text-xs text-default-500 basis-1 text-nowrap">
                          {`${date[2]} ${
                            monthNames[
                              date[1].replace(/[۰-۹]/g, (d) =>
                                "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
                              ) - 1
                            ]
                          } ${date[0]}`}
                        </p>
                        <hr className="w-full border-default-300" />
                      </div>
                    )}
                    <DoneTradeCard
                      key={card.id}
                      card={card}
                      setSelectedTrade={setSelectedTrade}
                      getFactor={getFactor}
                    />
                  </React.Fragment>
                );
              })}
            </>
          )}
        </div>
      </div>
      <HistoryModal id="dateFromModal" setDateValue={setDateFrom} />
      <HistoryModal id="dateToModal" setDateValue={setDateTo} />

      <DoneTradeFactorModal
        setSelectedTrade={setSelectedTrade}
        factor={factor}
      />
      <UnDoneTradeFactorModal
        setSelectedTrade={setSelectedTrade}
        factor={factor}
      />
    </div>
  );
}
