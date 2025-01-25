"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Button from "../UI/Button";
import moment from "jalali-moment";
import "swiper/css";
import "swiper/css/pagination";

const HistoryModal = ({ id, dateValue, setDateValue }) => {
  const [lastSlideIndex, setLastSlideIndex] = useState(0);
  const [lastSlideIndexDay, setLastSlideIndexDay] = useState(0);
  const [lastSlideIndexMonth, setLastSlideIndexMonth] = useState(0);
  const [date, setDate] = useState(dateValue);
  const [day, setDay] = useState([]);

  const years = Array.from({ length: 1500 - 1400 + 1 }, (_, index) =>
    (1400 + index).toString()
  );
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());

  const swiperYearRef = useRef(null);
  const swiperMonthRef = useRef(null);
  const swiperDayRef = useRef(null);

  // Get current date in Shamsi
  const getCurrentShamsiDate = () => {
    const today = moment();
    return {
      year: today.jYear(),
      month: today.jMonth() + 1, // 0-based index
      day: today.jDate(),
      weekday: today.jDay(),
    };
  };

  // Set Swipers to the current date
  const scrollToCurrentDate = () => {
    const { year, month, day, weekday } = getCurrentShamsiDate();
    const yearIndex = years.indexOf(year.toString());
    const monthIndex = month - 1;
    const dayIndex = day - 1;

    if (swiperYearRef.current) swiperYearRef.current.swiper.slideTo(yearIndex);
    if (swiperMonthRef.current)
      swiperMonthRef.current.swiper.slideTo(monthIndex);
    if (swiperDayRef.current) swiperDayRef.current.swiper.slideTo(dayIndex);

    setDate({
      year,
      month: months[monthIndex],
      day: days[dayIndex],
      weekday,
    });

    setLastSlideIndex(yearIndex);
    setLastSlideIndexMonth(monthIndex);
    setLastSlideIndexDay(dayIndex);
  };
  const scrollToMyDate = (date) => {
    // const { year, month, day, weekday } = getCurrentShamsiDate();
    const yearIndex = years.indexOf(date.year.toString());
    const monthIndex = months.indexOf(date.month);
    const dayIndex = date.day - 1;

    if (swiperYearRef.current) swiperYearRef.current.swiper.slideTo(yearIndex);
    if (swiperMonthRef.current)
      swiperMonthRef.current.swiper.slideTo(monthIndex);
    if (swiperDayRef.current) swiperDayRef.current.swiper.slideTo(dayIndex);

    setLastSlideIndex(yearIndex);
    setLastSlideIndexMonth(monthIndex);
    setLastSlideIndexDay(dayIndex);
  };
  const updateDays = (year, month) => {
    const daysInMonth = moment(`${year}/${month}`, "jYYYY/jM").jDaysInMonth();
    setTimeout(
      () =>
        setDay(
          Array.from({ length: daysInMonth }, (_, day) => (day + 1).toString())
        ),
      0
    );
  };

  useEffect(() => {
    if (typeof dateValue === "undefined") {
      scrollToCurrentDate();
    } else {
      setDate(dateValue);
      scrollToMyDate(dateValue);
    }
  }, [dateValue]);

  useEffect(() => {
    if (date?.year && date?.month) {
      const monthIndex = months.indexOf(date.month) + 1; // Convert month name to index
      updateDays(date.year, monthIndex);
    }
  }, [date?.year, date?.month]);

  return (
    <dialog id={id} className="modal modal-bottom max-w-[440px] mx-auto">
      <div className="modal-box p-0">
        <div className="modal-action mt-4 px-4 flex justify-between items-center">
          <p className="text-tertiary">انتخاب تاریخ</p>
          <form method="dialog">
            <button className="">
              <span className="icon-light-bold-Close text-2xl"></span>
            </button>
          </form>
        </div>
        <div className="bg-default-300 h-px mt-3"></div>
        <div className="relative grid grid-cols-3 h-[322px] mt-10 mx-8">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[46px] rounded-xl bg-[#3422771A]"></div>
          {/* Day */}
          <Swiper
            direction="vertical"
            mousewheel={true}
            grabCursor={true}
            modules={[Mousewheel]}
            slidesPerView={7}
            centeredSlides={true}
            initialSlide={3}
            className="mySwiper h-full"
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              setDate((prev) => ({
                ...prev,
                day: days[currentIndex % days.length],
              }));
              setLastSlideIndexDay(currentIndex);
            }}
            onSliderMove={(swiper) => {
              const slideCount = swiper.slides.length;
              const progress = swiper.progress;
              let calculatedIndex = Math.round(progress * (slideCount - 1));
              if (calculatedIndex < 0) {
                calculatedIndex = slideCount - 1;
              } else if (calculatedIndex >= slideCount) {
                calculatedIndex = 0;
              }
              if (calculatedIndex !== lastSlideIndexDay) {
                setLastSlideIndexDay(calculatedIndex);
                setDate((prev) => ({
                  ...prev,
                  day: days[calculatedIndex % days.length],
                }));
              }
            }}
            ref={swiperDayRef}
          >
            {days.map((list, index) => {
              const next = lastSlideIndexDay + 1 === index;
              const prev = lastSlideIndexDay - 1 === index;
              const nextTwo = lastSlideIndexDay + 2 === index;
              const prevTwo = lastSlideIndexDay - 2 === index;
              const nextThree = lastSlideIndexDay + 3 === index;
              const prevThree = lastSlideIndexDay - 3 === index;
              const nextFour = lastSlideIndexDay + 4 === index;
              const prevFour = lastSlideIndexDay - 4 === index;

              return day.length === 31 && index <= 30 ? (
                <SwiperSlide
                  key={index + 1}
                  className={`px-5 select-none !flex items-center justify-center transition-all duration-[0.02s] ease-in-out ${lastSlideIndexDay === index
                    ? "text-default-900 scale-150 font-extrabold"
                    : prev || next
                      ? "text-default-300 font-light scale-125"
                      : prevTwo || nextTwo
                        ? "text-default-300 font-light scale-100"
                        : prevThree || nextThree
                          ? "text-default-200 scale-95 font-light"
                          : prevFour || nextFour
                            ? "text-default-100 scale-90 font-light"
                            : index === 0
                              ? "text-default-900 scale-150 font-extrabold"
                              : index === 1
                                ? "text-default-300 font-light scale-125"
                                : index === 2
                                  ? "text-default-300 font-light scale-100"
                                  : index === 3
                                    ? "text-default-200 font-light scale-95"
                                    : lastSlideIndexDay === 0 && index === days.length - 1
                                      ? "text-default-900 scale-150 font-extrabold"
                                      : index === days.length - 2
                                        ? "text-default-300 font-light scale-125"
                                        : index === days.length - 3
                                          ? "text-default-300 font-light scale-100"
                                          : index === days.length - 4
                                            ? "text-default-200 font-light scale-95"
                                            : "scale-0"
                    }`}
                  style={{ transitionProperty: "color, transform" }}
                >
                  {list}
                </SwiperSlide>
              ) : day.length === 30 && index <= 29 ? (
                <SwiperSlide
                  key={index + 1}
                  className={`px-5 select-none !flex items-center justify-center transition-all duration-[0.02s] ease-in-out ${lastSlideIndexDay === index
                    ? "text-default-900 scale-150 font-extrabold"
                    : prev || next
                      ? "text-default-300 font-light scale-125"
                      : prevTwo || nextTwo
                        ? "text-default-300 font-light scale-100"
                        : prevThree || nextThree
                          ? "text-default-200 scale-95 font-light"
                          : prevFour || nextFour
                            ? "text-default-100 scale-90 font-light"
                            : index === 0
                              ? "text-default-900 scale-150 font-extrabold"
                              : index === 1
                                ? "text-default-300 font-light scale-125"
                                : index === 2
                                  ? "text-default-300 font-light scale-100"
                                  : index === 3
                                    ? "text-default-200 scale-95 font-light"
                                    : lastSlideIndexDay === 0 && index === days.length - 1
                                      ? "text-default-900 scale-150 font-extrabold"
                                      : index === days.length - 2
                                        ? "text-default-300 font-light scale-125"
                                        : "scale-0"
                    }`}
                  style={{ transitionProperty: "color, transform" }}
                >
                  {list}
                </SwiperSlide>
              ) : (
                day.length === 29 &&
                index <= 28 && (
                  <SwiperSlide
                    key={index + 1}
                    className={`px-5 select-none !flex items-center justify-center transition-all duration-[0.02s] ease-in-out ${lastSlideIndexDay === index
                      ? "text-default-900 scale-150 font-extrabold"
                      : prev || next
                        ? "text-default-300 font-light scale-125"
                        : prevTwo || nextTwo
                          ? "text-default-300 font-light scale-100"
                          : prevThree || nextThree
                            ? "text-default-200 scale-95 font-light"
                            : prevFour || nextFour
                              ? "text-default-100 scale-90 font-light"
                              : index === 0
                                ? "text-default-900 scale-150 font-extrabold"
                                : index === 1
                                  ? "text-default-300 font-light scale-125"
                                  : index === 2
                                    ? "text-default-300 font-light scale-100"
                                    : index === 3
                                      ? "text-default-200 scale-95 font-light"
                                      : lastSlideIndexDay === 0 && index === days.length - 1
                                        ? "text-default-900 scale-150 font-extrabold"
                                        : index === days.length - 2
                                          ? "text-default-300 font-light scale-125"
                                          : "scale-0"
                      }`}
                    style={{ transitionProperty: "color, transform" }}
                  >
                    {list}
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
          {/* Month */}
          <Swiper
            direction="vertical"
            mousewheel={true}
            grabCursor={true}
            modules={[Mousewheel]}
            slidesPerView={7}
            centeredSlides={true}
            className="mySwiper h-full"
            initialSlide={4}
            freeMode={true}
            onSlideChange={(swiper) => {
              // This event fires when the slide change is finished
              const currentIndex = swiper.realIndex;
              setDate((prev) => ({
                ...prev,
                month: months[currentIndex % months.length],
              }));
              setLastSlideIndexMonth(currentIndex);
            }}
            onSliderMove={(swiper) => {
              const slideCount = swiper.slides.length;
              const progress = swiper.progress;
              let calculatedIndex = Math.round(progress * (slideCount - 1));

              // Prevent wrapping around to the last slide when scrolling too far up
              if (calculatedIndex < 0) {
                calculatedIndex = 0; // Lock it to the first slide
              }
              // Prevent wrapping around to the first slide when scrolling too far down
              else if (calculatedIndex >= slideCount) {
                calculatedIndex = slideCount - 1; // Lock it to the last slide
              }

              // Only update if the calculated index has actually changed
              if (calculatedIndex !== lastSlideIndexMonth) {
                setLastSlideIndexMonth(calculatedIndex);
                // updateDays(years[lastSlideIndex], calculatedIndex)
                setDate((prev) => ({
                  ...prev,
                  month: months[calculatedIndex % months.length],
                }));
              }
            }}
            ref={swiperMonthRef}
          >
            {months.map((list, index) => {
              const next = lastSlideIndexMonth + 1 === index;
              const prev = lastSlideIndexMonth - 1 === index;
              const nextTwo = lastSlideIndexMonth + 2 === index;
              const prevTwo = lastSlideIndexMonth - 2 === index;
              const nextThree = lastSlideIndexMonth + 3 === index;
              const prevThree = lastSlideIndexMonth - 3 === index;
              const nextFour = lastSlideIndexMonth + 4 === index;
              const prevFour = lastSlideIndexMonth - 4 === index;

              return (
                <SwiperSlide
                  key={index + 1}
                  className={`px-5 select-none !flex items-center justify-center transition-all duration-[0.02s] ease-in-out ${lastSlideIndexMonth === index
                    ? "text-default-900 scale-150 font-extrabold"
                    : prev || next
                      ? "text-default-300 font-light scale-125"
                      : prevTwo || nextTwo
                        ? "text-default-300 font-light scale-100"
                        : prevThree || nextThree
                          ? "text-default-200 scale-95 font-light"
                          : prevFour || nextFour
                            ? "text-default-100 scale-90 font-light"
                            : lastSlideIndexMonth === 11 && index === 0
                              ? "text-default-900 scale-150 font-extrabold"
                              : index === 1
                                ? "text-default-300 font-light scale-125"
                                : index === 2
                                  ? "text-default-300 font-light scale-100"
                                  : index === 3
                                    ? "text-default-200 scale-95 font-light"
                                    : lastSlideIndexMonth === 0 && index === months.length - 1
                                      ? "text-default-900 scale-150 font-extrabold"
                                      : index === months.length - 2
                                        ? "text-default-300 font-light scale-125"
                                        : "scale-0"
                    }`}
                  style={{ transitionProperty: "color, transform" }}
                >
                  {list}
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Year */}
          <Swiper
            direction="vertical"
            mousewheel={true}
            grabCursor={true}
            modules={[Mousewheel]}
            slidesPerView={7}
            centeredSlides={true}
            className="mySwiper h-full"
            initialSlide={3}
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              const totalSlides = years.length;
              setDate((prev) => ({
                ...prev,
                year: parseInt(years[currentIndex % totalSlides], 10),
              }));
              setLastSlideIndex(currentIndex);
            }}
            onSliderMove={(swiper) => {
              const slideCount = swiper.slides.length;
              const progress = swiper.progress;
              let calculatedIndex = Math.round(progress * (slideCount - 1));

              // Prevent wrapping around the first or last slide
              if (calculatedIndex < 0) {
                calculatedIndex = slideCount - 1; // Lock it to the last slide
              } else if (calculatedIndex >= slideCount) {
                calculatedIndex = 0; // Lock it to the first slide
              }

              if (calculatedIndex !== lastSlideIndex) {
                setLastSlideIndex(calculatedIndex); // Update the last slide index

                const newYear = parseInt(
                  years[calculatedIndex % years.length],
                  10
                );

                // Update the year and log whether we're going up or down
                setDate((prev) => ({ ...prev, year: newYear }));
              }
            }}
            ref={swiperYearRef}
          >
            {years.map((list, index) => {
              const next = lastSlideIndex + 1 === index;
              const prev = lastSlideIndex - 1 === index;
              const nextTwo = lastSlideIndex + 2 === index;
              const prevTwo = lastSlideIndex - 2 === index;
              const nextThree = lastSlideIndex + 3 === index;
              const prevThree = lastSlideIndex - 3 === index;
              const nextFour = lastSlideIndex + 4 === index;
              const prevFour = lastSlideIndex - 4 === index;

              return (
                <SwiperSlide
                  key={index + 1}
                  className={`px-5 select-none !flex items-center justify-center transition-all duration-[0.02s] ease-in-out ${lastSlideIndex === index
                    ? "text-default-900 scale-150 font-extrabold"
                    : prev || next
                      ? "text-default-300 font-light scale-125"
                      : prevTwo || nextTwo
                        ? "text-default-300 font-light scale-100"
                        : prevThree || nextThree
                          ? "text-default-200 scale-95 font-light"
                          : prevFour || nextFour
                            ? "text-default-100 scale-90 font-light"
                            : index === 0
                              ? "text-default-900 scale-150 font-extrabold"
                              : index === 1
                                ? "text-default-300 font-light scale-125"
                                : index === 2
                                  ? "text-default-300 font-light scale-100"
                                  : index === 3
                                    ? "text-default-200 scale-95 font-light"
                                    : index === years.length - 1
                                      ? "text-default-900 scale-150 font-extrabold"
                                      : index === years.length - 2
                                        ? "text-default-300 font-light scale-125"
                                        : index === years.length - 3
                                          ? "text-default-300 font-light scale-100"
                                          : index === years.length - 4
                                            ? "text-default-200 scale-95 font-light"
                                            : "scale-0"
                    }`}
                  style={{ transitionProperty: "color, transform" }}
                >
                  {list}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <p
          className="font-normal mx-auto mt-10 cursor-pointer w-fit"
          onClick={scrollToCurrentDate}
        >
          برو به تاریخ امروز
        </p>
        <form
          method="dialog"
          className="mt-14 mb-6 flex justify-center gap-3 px-6 w-full"
        >
          <Button
            text={"تایید"}
            type={"bg-primary max-w-full w-[200px]"}
            onClick={() => {
              setDateValue({ ...date });
            }}
          />
          <Button
            onClick={() => scrollToMyDate(dateValue)}
            text={"لغو"}
            type={
              "border-solid border-[2px] border-primary text-primary max-w-full w-[152px]"
            }
          />
        </form>
      </div>
    </dialog>
  );
};

export default HistoryModal;
