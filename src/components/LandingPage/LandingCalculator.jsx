import React, { useEffect, useState } from "react";
import BoxCalculation from "../calculator/BoxCalculation";
import CalculateResultModal from "../calculator/CalculateResultModal";
import { calculateBoxResult } from "../calculator/calculateBoxResult";

function LandingCalculator() {
  const [boxValues, setBoxValues] = useState({
    price: "",
    weight: "",
    quantity: "",
    fee: "",
  });
  const [finalValue, setFinalValue] = useState({
    weightBasePrice: "",
    overallPrice: "",
    boxPrice: "",
    bulkPrice: "",
    eggPrice: "",
  });

  useEffect(() => {
    setFinalValue(calculateBoxResult(boxValues));
  }, [boxValues]);
  return (
    <div className="pt-6 pb-8 bg-default-50 shadow-[0px_1px_4px_0px_#00000026]">
      <div className="flex gap-1 mr-4 mb-6">
        <p className="font-bold">ماشین حساب</p>
        <p>(محاسبه سریع قیمت کارتنی)</p>
      </div>
      <div className="px-4">
        <BoxCalculation
          values={boxValues}
          setValues={setBoxValues}
          source="landing"
        />
      </div>
      <CalculateResultModal finalValue={finalValue} />
    </div>
  );
}

export default LandingCalculator;
