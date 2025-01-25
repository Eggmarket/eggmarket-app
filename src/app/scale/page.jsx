'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const Page = () => {
    const totalNumbers = 30;
    const [activeIndex, setActiveIndex] = useState(0);

    // Function to update the scaling classes based on the active index
    const getScaleClass = (index) => {
        if (index === activeIndex) return 'scale-150 bg-green-500 text-white'; // Focused class
        if (index === activeIndex - 1 || index === activeIndex + 1) return 'scale-100'; // Before/After
        if (index === activeIndex - 2 || index === activeIndex + 2) return 'scale-50'; // Distant
        return 'scale-100'; // Default scale
    };

    // Swiper slide change handler
    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div className="swiper-container h-[80vh] w-[60px] overflow-y-auto relative">
            <Swiper
                direction="vertical"
                spaceBetween={5}
                slidesPerView={5}
                centeredSlides={true}
                onSlideChange={handleSlideChange}
                loop={true}
            >
                {[...Array(totalNumbers)].map((_, index) => (
                    <SwiperSlide
                        key={index}
                        className={`swiper-slide flex justify-center items-center w-[40px] h-[40px] rounded-lg transition-transform duration-300 ease-in-out ${getScaleClass(index)}`}
                    >
                        {index + 1}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Page;
