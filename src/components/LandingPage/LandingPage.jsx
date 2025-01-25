import Image from "next/image";
import React from "react";
import heroImage from "../../../public/assets/images/hero-image.svg";
import Link from "next/link";
import LandingItems from "./LandingItems";
import LandingFooter from "./LandingFooter";

const LandingPage = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src={heroImage}
          priority
          className="w-full"
          style={{ objectFit: "cover" }}
          alt="hero image"
        />
        <div className="absolute inset-0 transition-mask" />
        <div className="absolute bottom-0 inset-x-6 flex flex-col">
          <p
            className="font-medium text-[40px] max-[400px]:text-3xl max-[400px]:leading-[50px] text-white leading-[62.5px]"
            style={{
              textShadow:
                "0 0 7px white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 3px white, 0 0 0 white",
            }}
          >
            بار تخم‌مرغ داری؟
            <br />
            بار تخم‌مرغ می‌خوای؟
          </p>
          <p
            className="font-thin text-base mt-2 text-white"
            style={{
              textShadow:
                "0 0 1px white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 3px white, 0 0 0 white",
            }}
          >
            بیا تو بازار اگمارکت...
          </p>
          <Link
            href="/"
            className="mt-6 mb-8 w-full h-12 text-white font-black bg-primary flex items-center justify-center rounded-lg"
          >
            ورود به بازار اگمارکت
          </Link>
        </div>
      </div>
      <LandingItems />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
