import React from "react";
import { monthNames } from "../static";
import moment from "jalali-moment";

function DatePicker({
  visibleDate,
  setDayCounter,
  dayCounter,
  setDateValue,
  historyModalId,
}) {
  let today = moment();
  return (
    <>
      <button
        className="flex items-center gap-0.5 h-full"
        onClick={() => {
          setDayCounter(dayCounter - 1);
          today.subtract(Math.abs(dayCounter - 1), "jDay");
          setDateValue({
            year: today.jYear(),
            month: monthNames[today.jMonth()],
            day: today.jDate(),
            weekday: today.jDay(),
          });
        }}
      >
        <span className="icon-light-linear-Right-1 text-xl text-default-500"></span>
        <span className="text-default-500 text-xs">روز قبل</span>
      </button>
      <button
        className="flex items-center gap-0.5 h-full"
        onClick={() => document.getElementById(`${historyModalId}`).showModal()}
      >
        <p className="flex items-center text-sm gap-1 text-default-900 font-medium">
          {visibleDate}
        </p>
        <span className="icon-light-linear-Calender-1 text-xl text-primary"></span>
      </button>
      <button
        className={`flex items-center gap-0.5 h-full ${
          dayCounter === 0 ? "text-default-300" : "text-default-500"
        }`}
        onClick={() => {
          if (dayCounter < 0) {
            setDayCounter(dayCounter + 1);
            today.subtract(Math.abs(dayCounter + 1), "jDay");
            setDateValue({
              year: today.jYear(),
              month: monthNames[today.jMonth()],
              day: today.jDate(),
              weekday: today.jDay(),
            });
          }
        }}
        disabled={dayCounter === 0 ? true : false}
      >
        <span className="text-xs">روز بعد</span>
        <span className="icon-light-linear-Left-1 text-xl"></span>
      </button>
    </>
  );
}

export default DatePicker;
