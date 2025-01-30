import { trimPrice } from "@/utils/trimPrice";

export const calculateEggResult = (eggValues, price) => {
  //   const overallPrice = Math.trunc(
  //     weightBasePrice * eggValues.quantity * eggValues.weight
  //   );
  const boxPrice = Math.trunc(price * eggValues.weight);
  const bulkPrice = Math.trunc(boxPrice / 6);
  const eggPrice = trimPrice(Math.trunc(bulkPrice / 30));
  return {
    basePrice: price,
    boxPrice,
    bulkPrice,
    eggPrice,
  };
};
