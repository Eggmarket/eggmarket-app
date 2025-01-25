import { trimPrice } from "@/utils/trimPrice";

export const calculateBoxResult = (boxValues) => {
  const weightBasePrice = boxValues.price.replace(/,/g, "");
  const overallPrice = Math.trunc(
    weightBasePrice * boxValues.quantity * boxValues.weight
  );
  const boxPrice = Math.trunc(overallPrice / boxValues.quantity);
  const bulkPrice = Math.trunc(boxPrice / 6);
  const eggPrice = trimPrice(Math.trunc(bulkPrice / 30));
  return {
    weightBasePrice,
    overallPrice,
    boxPrice,
    bulkPrice,
    eggPrice,
  };
};
