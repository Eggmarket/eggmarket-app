"use client";
import Loading from "@/app/loading";
import { useToken } from "@/components/hook/useToken/useToken";
import BottomModal from "@/components/Modal/BottomModal";
import HistoryModal from "@/components/Modal/HistoryModal";
import EditAdForm from "@/components/myAdsPage/EditAdForm";
import MyAdCard from "@/components/myAdsPage/MyAdCard";
import { monthNames } from "@/components/static";
import Button from "@/components/UI/Button";
import compareDate from "@/utils/compareDate";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoAdIcon from "@/components/svg/NoAdIcon.svg";
import Image from "next/image";

export default function Page() {
  const { back } = useRouter();
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [selected, setSelected] = useState("");

  const [token, setToken] = useToken();

  const loadDateMaker = (time) => {
    let loadDate = new Intl.DateTimeFormat("fa-IR")
      .format(new Date(time))
      .split("/");

    loadDate = `${loadDate[0].replace(/[۰-۹]/g, (d) =>
      "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
    )}/${loadDate[1].replace(/[۰-۹]/g, (d) =>
      "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
    )}/${loadDate[2].replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))}`;
    return loadDate;
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/my_loads`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setAds(res.data.my_loads);
        setFilteredAds(res.data.my_loads);
        dateHandler(res.data.my_loads);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("data failed:", err);
    }
  };
  const getProvinces = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
      .then((response) => {
        setProvinces(response.data.provinces);
      })
      .catch((error) => {});
  };
  const deleteData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/delete`,
        {
          loadID: selected.loadID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        getData();
        setIsDeleteLoading(false);
        setSelected("");
        document.getElementById("deleteAdModal").close();
        toast.info("آگهی با موفقیت حذف شد.", { autoClose: 2000 });
      }
    } catch (error) {
      setIsDeleteLoading(false);
      console.log(error);
    }
  };
  const handleDelete = () => {
    setIsDeleteLoading(true);
    deleteData();
  };
  // const dateHandler = (data) => {
  //   if (dateFrom && dateTo) {
  //     const to = `${dateTo.year}/${monthNames.indexOf(dateTo.month) + 1}/${
  //       dateTo.day
  //     }`;
  //     const from = `${dateFrom.year}/${
  //       monthNames.indexOf(dateFrom.month) + 1
  //     }/${dateFrom.day}`;
  //     setFiltereData(
  //       data.filter((item) => {
  //         if (loadDateMaker(item.reg_date) >= from && loadDate <= to) {
  //           return item;
  //         }
  //       })
  //     );
  //   } else if (dateFrom && !dateTo) {
  //     const from = `${dateFrom.year}/${
  //       monthNames.indexOf(dateFrom.month) + 1
  //     }/${dateFrom.day}`;
  //     setFiltereData(
  //       data.filter((item) => {
  //         if (loadDateMaker(item.reg_date) >= from) {
  //           return item;
  //         }
  //       })
  //     );
  //   } else if (!dateFrom && dateTo) {
  //     const to = `${dateTo.year}/${monthNames.indexOf(dateTo.month) + 1}/${
  //       dateTo.day
  //     }`;
  //     setFiltereData(
  //       data.filter((item) => {
  //         if (loadDateMaker(item.reg_date) <= to) {
  //           return item;
  //         }
  //       })
  //     );
  //   } else {
  //     setFiltereData(data);
  //   }
  // };
  const listenToScroll = () => {
    let heightToHideFrom = 10;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    getData();
    getProvinces();
  }, []);

  useEffect(() => {
    let tempData = ads;
    if (dateFrom) {
      tempData = tempData.filter((item) =>
        compareDate(item.reg_date, dateFrom, "from")
      );
    }
    if (dateTo) {
      tempData = tempData.filter((item) =>
        compareDate(item.reg_date, dateTo, "to")
      );
    }
    setFilteredAds(tempData);
  }, [dateFrom, dateTo]);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="sticky top-0 flex justify-between items-center mb-2 px-4 pt-8 pb-4 z-10 bg-inherit">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">
            آگهی‌های من
          </h3>
        </div>
        {(dateFrom || dateTo) && (
          <button
            className="text-sm text-danger-900"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
            }}
          >
            حذف همۀ فیلترها
          </button>
        )}
      </div>
      <div className={`px-6 dateFilter relative ${isVisible ? "" : "hide"}`}>
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
      </div>
      <div className="pb-8">
        {isLoading ? (
          <Loading />
        ) : filteredAds?.length === 0 ? (
          <div className="p-4">
            <div className="bg-default-50 cardShadow border border-default-200 rounded-lg aspect-square flex flex-col items-center justify-center">
              <Image src={NoAdIcon} height={96} width={96} alt="icon" />
              <p className="text-default-500 text-xl font-medium mt-4">
                شما هیچ آگهی ثبت‌شده‌ای‌ ندارید.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4 z-10">
            {filteredAds?.map((card, index, arr) => {
              let isEqual = false;
              if (index !== 0) {
                let previous = new Date(arr[index - 1].reg_date);
                previous = new Intl.DateTimeFormat("fa-IR").format(previous);
                let current = new Date(card.reg_date);
                current = new Intl.DateTimeFormat("fa-IR").format(current);
                isEqual = current === previous;
              }
              let date = new Date(card.reg_date);
              date = new Intl.DateTimeFormat("fa-IR").format(date).split("/");
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
                  <MyAdCard
                    key={card.id}
                    card={card}
                    provinces={provinces}
                    setSelected={setSelected}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      <HistoryModal id="dateFromModal" setDateValue={setDateFrom} />
      <HistoryModal id="dateToModal" setDateValue={setDateTo} />
      <BottomModal id="deleteAdModal" onClose={() => setSelected("")}>
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">حذف آگهی</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setSelected("")}
          >
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <p className="text-base font-bold px-8 py-5">
          از حذف آگهی اطمینان دارید؟
        </p>
        <div className="bg-default-50 border-t-default-300 w-full flex gap-3 px-6 py-4 mb-4">
          <button
            onClick={() => handleDelete()}
            className={`button button-danger w-3/5 ${
              isDeleteLoading ? "isLoading" : ""
            }`}
            disabled={isDeleteLoading ? true : false}
          >
            حذف آگهی
          </button>
          <form method="dialog" className="w-2/5">
            <Button
              type="button-ghost"
              text="لغو"
              width="w-full"
              onClick={() => setSelected("")}
            />
          </form>
        </div>
      </BottomModal>
      <BottomModal id="editAdModal" onClose={() => setSelected("")}>
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-tertiary">ویرایش آگهی</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setSelected("")}
          >
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        {selected && (
          <EditAdForm
            card={selected}
            provinces={provinces}
            setSelected={setSelected}
            getData={getData}
          />
        )}
      </BottomModal>
    </div>
  );
}
