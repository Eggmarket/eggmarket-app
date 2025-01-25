import React, { useCallback, useEffect, useState, useRef } from "react";

const MultiRangeSlider = ({ min, max, onChange, value }) => {
  const [minVal, setMinVal] = useState(value.min);
  const [maxVal, setMaxVal] = useState(value.max);
  const minValRef = useRef(value.min);
  const maxValRef = useRef(value.max);
  const range = useRef(null);

  useEffect(() => {
    let min = value.min;
    let max = value.max;
    if (minVal !== min || maxVal !== max) {
      if (!min || !max) {
        minValRef.current = 8;
        maxValRef.current = 14;
        setMinVal(8);
        setMaxVal(14);
      } else {
        minValRef.current = min;
        maxValRef.current = max;
        setMinVal(min);
        setMaxVal(max);
      }
    }
  }, [value]);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent, value]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent, value]);

  // Get min and max values when their state changes

  return (
    <div dir="ltr" className="">
      <input
        dir="ltr"
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={0.1}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          onChange(value, maxVal);
        }}
        className="thumb thumb--left"
      />
      <input
        dir="ltr"
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={0.1}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          onChange(minVal, value);
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
      <div className="flex justify-between mt-4">
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
        <p>14</p>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
