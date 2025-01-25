import React, { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollBar({ children }) {
  const [isScroll, setIsScroll] = useState("");
  const trackRef = useRef();
  const thumbRef = useRef();
  const contentRef = useRef();

  const handleScrollContent = () => {
    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;
    if (!thumbEle || !contentEle) {
      return;
    }
    thumbEle.style.top = `${
      (contentEle.scrollTop * 100) / contentEle.scrollHeight
    }%`;
  };

  const handleClickTrack = (e) => {
    const trackEle = trackRef.current;
    const contentEle = contentRef.current;
    if (!trackEle || !contentEle) {
      return;
    }
    const bound = trackEle.getBoundingClientRect();
    const percentage = (e.clientY - bound.top) / bound.height;
    contentEle.scrollTop =
      percentage * (contentEle.scrollHeight - contentEle.clientHeight);
  };

  useEffect(() => {
    const contentEle = contentRef.current;
    const thumbEle = thumbRef.current;

    if (!contentEle) {
      console.error("Content element not found!");
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!contentRef.current || !thumbRef.current) {
        return;
      }

      const scrollNeeded =
        contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsScroll(scrollNeeded);

      if (scrollNeeded) {
        const scrollRatio =
          contentRef.current.clientHeight / contentRef.current.scrollHeight;
        thumbRef.current.style.height = `${scrollRatio * 100}%`;
      }
    });
    resizeObserver.observe(contentEle);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  const handleMouseDown = useCallback((e) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const startPos = {
      top: contentEle.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetCursor(ele);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const touch = e.touches[0];
    const startPos = {
      top: contentEle.scrollTop,
      x: touch.clientX,
      y: touch.clientY,
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x;
      const dy = touch.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };
    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      resetCursor(ele);
    };
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  }, []);

  const updateCursor = (ele) => {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const resetCursor = (ele) => {
    ele.style.cursor = "grab";
    ele.style.userSelect = "";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  return (
    <div className="scroll-container">
      <div
        className="container__content"
        ref={contentRef}
        onScroll={handleScrollContent}
      >
        {children}
      </div>
      <div className={`scrollbar ${isScroll ? "show" : "hide"}`}>
        <div
          className="scrollbar__track"
          ref={trackRef}
          onClick={handleClickTrack}
        />
        <div
          className="scrollbar__thumb"
          ref={thumbRef}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}
