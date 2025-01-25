import { monthNames } from "@/components/static";
import moment from "jalali-moment";

export const getDifferenceOfTwoDates = (dateValue) => {
  let m = moment(); // Parse a Jalaali date
  let date1 = m.format("YYYY/M/D");

  let x = moment(
    `${dateValue.year}/${monthNames.indexOf(dateValue.month) + 1}/${
      dateValue.day
    }`,
    "jYYYY/jM/jD"
  );
  let date2 = x.format("YYYY/M/D");

  date1 = date1.split("/");
  date2 = date2.split("/");

  var startDate = new Date(date1[0], date1[1] - 1, date1[2]); // 2000-01-01
  var endDate = new Date(date2[0], date2[1] - 1, date2[2]); // Today

  // Calculate the difference of two dates in total days
  function diffDays(d1, d2) {
    var ndays;
    var tv1 = d1.valueOf(); // msec since 1970
    var tv2 = d2.valueOf();

    ndays = (tv2 - tv1) / 1000 / 86400;
    ndays = Math.round(ndays - 0.5);
    return ndays;
  }
  return diffDays(startDate, endDate);
};
