import { monthNames } from "@/components/static";
import moment from "jalali-moment";

export default function compareDate(itemTime, sentFilterDate, source) {
  const currentDate = moment(new Date(itemTime * 1000).toDateString());
  const currentFormatedDate = currentDate.format("jYYYY/jMM/jDD");

  const filterDate = moment(
    `${sentFilterDate.year}/${monthNames.indexOf(sentFilterDate.month) + 1}/${
      sentFilterDate.day
    }`,
    "jYYYY/jMM/jDD"
  );
  const currentFilterDate = filterDate.format("jYYYY/jMM/jDD");

  if (source === "from") return currentFormatedDate >= currentFilterDate;
  if (source === "to") return currentFormatedDate <= currentFilterDate;
}
