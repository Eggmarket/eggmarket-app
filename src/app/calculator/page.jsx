"use client";
import BoxCalculation from "@/components/calculator/BoxCalculation";
import { calculateBoxResult } from "@/components/calculator/calculateBoxResult";
import { calculateEggResult } from "@/components/calculator/calculateEggResult";
import CalculateResultModal from "@/components/calculator/CalculateResultModal";
import EggCalcaulation from "@/components/calculator/EggCalcaulation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  const [eggValues, setEggValues] = useState({
    weight: "",
    lux: false,
    yolk: false,
    print: false,
    printType: "",
    oneMonth: false,
    oneMonthValue: "1500",
  });

  const [finalValue, setFinalValue] = useState({
    basePrice: "",
    boxPrice: "",
    bulkPrice: "",
    eggPrice: "",
  });

  useEffect(() => {
    setFinalValue(calculateEggResult(eggValues, 46000));
  }, [eggValues]);

  return (
    <div className="px-4 pt-8 pb-20 flex flex-col">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">ماشین حساب</h3>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div role="tablist" className="tabs tabs-lifted flex tabs-custom">
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-10px leading-2 sm:text-sm ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            محاسبه قیمت کارتنی
          </a>
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-10px leading-2 sm:text-sm ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            کشف قیمت با پایه اگمارکت
          </a>
        </div>
        <div
          className={`flex-1 flex flex-col justify-between py-6 bg-default-50 rounded-b-xl ${
            activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {activeTab === 1 ? (
            <BoxCalculation />
          ) : (
            <EggCalcaulation values={eggValues} setValues={setEggValues} />
          )}
        </div>
      </div>

      <CalculateResultModal finalValue={finalValue} source="egg" />
    </div>
  );
}
