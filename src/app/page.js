"use client";

import SaleCard from "@/components/Homepage/SaleCard";
import BuyModal from "@/components/Modal/BuyModal";
import { dayNames, monthNames } from "@/components/static";
import Button from "@/components/UI/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import FilterLayout from "@/components/filters/FilterLayout";
import moment from "jalali-moment";
import PriceSuggestionModal from "@/components/Modal/PriceSuggestionModal";
import ShareLoadLinkModal from "@/components/Modal/ShareLoadLinkModal";
import { useOrigins } from "@/context/OriginsProvider";

export default function Home() {
  let j = moment();
  const [selectedCard, setSelectedCard] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    status: "",
    origins: [],
    print_types: [],
    yolk_types: [],
    qualities: [],
    brands: [],
  });

  const { provinces } = useOrigins();

  async function getLoads(lastID = "") {
    setIsLoading(true);

    await axios
      .post(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/loads`, {
        status: filterValues.status,
        print_types: filterValues.print_types,
        yolk_types: filterValues.yolk_types,
        qualities: filterValues.qualities,
        cities: filterValues.origins.map((origin) => String(origin.id)),
        brands: filterValues.brands,
        origins: [],
        pack_types: [],
        types: [],
        lastID: lastID, //برای صفحه بندی استفاده می شود. برای دریافت اطلاعات بیشتر یعنی صفحه بعد باید آخرین آیدی رو وارد کنید.
      })
      .then((response) => {
        setIsLoading(false);
        if (lastID) {
          setData([...data, ...response.data.loads]);
          setFilteredData([...data, ...response.data.loads]);
        } else {
          setData(response.data.loads);
          setFilteredData(response.data.loads);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }
  useEffect(() => {
    getLoads();
  }, [filterValues]);

  return (
    <main>
      <div className="sticky top-0 h-[55px] z-10 px-2 bg-surface-secondary filterShadow">
        <FilterLayout
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </div>
      <div className="px-4 pb-32">
        {isLoading && filteredData.length === 0 ? (
          <Loading />
        ) : filteredData.length === 0 ? (
          <p className="text-center mt-4 text-default-500">باری وجود ندارد</p>
        ) : (
          <>
            <div className="mb-4">
              {filteredData.map((load, index, arr) => {
                let isEqual = false;
                if (index !== 0) {
                  let previous = new Date(arr[index - 1].reg_just_date);
                  previous = new Intl.DateTimeFormat("fa-IR").format(previous);
                  let current = new Date(load.reg_just_date);
                  current = new Intl.DateTimeFormat("fa-IR").format(current);
                  isEqual = current === previous;
                }
                let date = new Date(load.reg_just_date);
                date = new Intl.DateTimeFormat("fa-IR").format(date).split("/");
                j = moment(load.reg_just_date);
                return (
                  <div key={index}>
                    {isEqual ? (
                      ""
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-4 my-4">
                          <hr className="w-full border-default-300" />
                          <p className="text-sm font-semibold text-default-900 basis-1 text-nowrap">
                            {`${dayNames[j.jDay()]} ${date[2]} ${
                              monthNames[
                                date[1].replace(/[۰-۹]/g, (d) =>
                                  "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
                                ) - 1
                              ]
                            } ${date[0]}`}
                          </p>
                          <hr className="w-full border-default-300" />
                        </div>
                        <div className="flex items-center justify-between text-default-500 my-2">
                          <p className="font-bold text-sm">
                            تعداد بارهای اعلامی:
                          </p>
                          <p className="text-xs">{`${
                            filteredData.filter(
                              (item) =>
                                item.reg_just_date === load.reg_just_date
                            ).length
                          } بارِ تخم‌مرغ`}</p>
                        </div>
                      </>
                    )}
                    <SaleCard
                      key={load.loadID}
                      load={load}
                      province={provinces.find(
                        (item) => item.id === load.origin_field1
                      )}
                      setSelectedCard={setSelectedCard}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              type="button-primary-2"
              text="مشاهده آگهی های بیشتر"
              width="w-full"
              onClick={() =>
                getLoads(filteredData[filteredData.length - 1].loadID)
              }
              loading={isLoading}
            />
          </>
        )}
        <a
          className="block"
          referrerpolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=529943&Code=E1c61yzJVW0wh3FeKLpQxVX7WxEEIkFB"
        >
          <img
            referrerpolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=529943&Code=E1c61yzJVW0wh3FeKLpQxVX7WxEEIkFB"
            alt=""
            className="cursor-pointer size-24"
            code="E1c61yzJVW0wh3FeKLpQxVX7WxEEIkFB"
          />
        </a>
      </div>
      <ShareLoadLinkModal
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <PriceSuggestionModal
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
      />
      <BuyModal load={selectedCard} setSelectedCard={setSelectedCard} />
    </main>
  );
}
