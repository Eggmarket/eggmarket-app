import { monthNames } from "@/components/static";
import moment from "jalali-moment";

export default function compareDate(itemTime, filterDate, source) {
  const itemDate = moment(itemTime.split(" ")[0], "YYYY-MM-DD")
    .locale("fa")
    .format("YYYY-MM-DD");
  const filterValue = `${filterDate.year}-${
    monthNames.indexOf(filterDate.month) + 1
  }-${filterDate.day}`;
  const filterMoment = moment(filterValue, "YYYY-MM-DD").format("YYYY-MM-DD");

  console.log(itemDate);
  console.log(filterMoment);
  if (source === "from") return itemDate >= filterMoment;
  if (source === "to") return itemDate <= filterMoment;
}
