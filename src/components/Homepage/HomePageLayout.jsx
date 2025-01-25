import React, { useEffect, useState } from "react";
import SaleCard from "./SaleCard";
import Button from "../UI/Button";
import BuyModal from "../Modal/BuyModal";
import axios from "axios";

export default function HomePageLayout() {
  const [lastID, setLastID] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let today = new Date().toLocaleDateString("fa-IR", options);
  let result = today.replace(",", "");
  result = result.split(" ");

  useEffect(() => {
    async function getLoads(lastID) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/loads`, {
          origins: [], // 1 2 3 4 5 ...
          types: [], // announcement  request
          pack_types: [], // bulk box
          yolk_types: [], // golden simple corn
          print_types: [], // with without ability
          qualities: [], // lux grade-1 grade-2 for-factories
          lastID: lastID, //برای صفحه بندی استفاده می شود. برای دریافت اطلاعات بیشتر یعنی صفحه بعد باید آخرین آیدی رو وارد کنید.
        })
        .then((response) => {
          setIsLoading(false);
          setData(response.data.loads);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    getLoads(lastID);
  }, [lastID]);

  useEffect(() => {
    async function getProvinces() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
        .then((response) => {
          setProvinces(response.data.provinces);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProvinces();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading data</p>
      ) : data.length === 0 ? (
        <p className="text-center mt-4 text-default-500">باری وجود ندارد</p>
      ) : (
        <>
          <div className="flex items-center justify-center gap-4 my-4">
            <hr className="w-full border-default-300" />
            <p className="text-sm font-semibold text-default-900 basis-1 text-nowrap">
              {`${result[3]} ${result[2]} ${result[1]} ${result[0]}`}
            </p>
            <hr className="w-full border-default-300" />
          </div>
          <div className="flex items-center justify-between text-default-500 mb-2">
            <p className="font-bold text-sm">تعداد بارهای اعلامی:</p>
            <p className="text-xs">{`${data.length} بار تخم مرغ`}</p>
          </div>
          <div className="flex flex-col gap-6 mb-4">
            {data.map((load) => (
              <SaleCard
                key={load.loadId}
                load={load}
                province={provinces.find(
                  (item) => item.id === load.origin_field1
                )}
              />
            ))}
          </div>
          <Button
            type="button-primary-2"
            text="مشاهده آگهی های بیشتر"
            width="w-full"
            onClick={() =>
              setLastID(data.find((item, index) => index === 11).loadID)
            }
          />
          <BuyModal />
        </>
      )}
    </>
  );
}
