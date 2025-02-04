import { useWallet } from "@/context/WalletProvider";
import { trimPrice } from "@/utils/trimPrice";
import React, { useEffect, useRef, useState } from "react";

function WalletCard() {
  const [walletCard, setWalletCard] = useState(false);
  const [wallectCardWidth, setWalletCardWidth] = useState(0);
  const [screenSize, setScreenSize] = useState();

  const { wallet } = useWallet();
  const walletCardRef = useRef();
  const priceDiv = useRef();

  useEffect(() => {
    setWalletCardWidth(walletCardRef.current?.offsetWidth);
  }, [walletCardRef]);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenSize >= 360 ? (
    <button
      ref={walletCardRef}
      className="p-4 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 mb-8 relative h-[156px]"
      onClick={() => {
        setWalletCard(!walletCard);
      }}
    >
      {wallectCardWidth ? (
        <>
          <span
            className={`absolute ${
              walletCard
                ? "top-11 text-default-500 text-[70px]"
                : `top-4 text-[32px] text-default-300`
            } icon-light-linear-Wallet transition-all duration-300 ease-in-out`}
            style={{
              left: `${walletCard ? "50%" : `${wallectCardWidth / 2 - 16}px`}`,
            }}
          ></span>
          <p
            className={`absolute ${
              walletCard ? "top-8" : `top-14`
            } text-sm text-default-300 transition-all duration-300 ease-in-out`}
            style={{
              right: `${
                walletCard ? "24px" : `${wallectCardWidth / 2 - 50}px`
              }`,
            }}
          >
            موجودی کیف پول:
          </p>
          <div
            ref={priceDiv}
            className={`absolute flex items-center justify-center gap-1 ${
              walletCard
                ? "top-8 text-xl font-semibold"
                : `top-24 text-[28px] font-medium`
            } transition-all duration-300 ease-in-out`}
            style={{
              left: `${
                walletCard
                  ? "16px"
                  : `${
                      (wallectCardWidth - priceDiv.current?.offsetWidth) / 2
                    }px`
              }`,
            }}
          >
            <span className="text-default-50">
              {trimPrice(wallet?.balance, ",")}
            </span>
            <span className="text-[#C2C2C2] text-xs">تومان</span>
          </div>
        </>
      ) : (
        ""
      )}
      <div
        className={`${
          walletCard ? "opacity-100" : "opacity-0"
        } transition-opacity ease-in-out duration-500 absolute bottom-6 inset-x-6`}
      >
        <div className="flex items-center justify-between w-full mb-2">
          <p className="text-sm text-default-300">بلوکه شده:</p>
          <p className="flex items-center">
            <span className="font-semibold text-xl ml-2 text-primary">
              {trimPrice(wallet?.suspended, ",")}
            </span>
            <span className="text-xs text-primary">تومان</span>
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-default-300">قدرت خرید:</p>
          <p className="flex items-center">
            <span className="font-semibold text-xl ml-2 text-default-50">
              {trimPrice(wallet?.balance, ",")}
            </span>
            <span className="text-xs text-[#C2C2C2]">تومان</span>
          </p>
        </div>
      </div>
    </button>
  ) : (
    <button
      ref={walletCardRef}
      className="p-3 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 mb-8 relative h-[120px]"
      onClick={() => {
        setWalletCard(!walletCard);
      }}
    >
      {wallectCardWidth ? (
        <>
          <span
            className={`absolute ${
              walletCard
                ? "top-11 text-default-500 text-6xl sm:text-[70px]"
                : `top-4 text-[32px] text-default-300`
            } icon-light-linear-Wallet transition-all duration-300 ease-in-out`}
            style={{
              left: `${walletCard ? "50%" : `${wallectCardWidth / 2 - 16}px`}`,
            }}
          ></span>
          <p
            className={`absolute ${
              walletCard ? "top-4" : `top-14`
            } text-xs sm:text-sm text-default-300 transition-all duration-300 ease-in-out`}
            style={{
              right: `${
                walletCard ? "16px" : `${wallectCardWidth / 2 - 50}px`
              }`,
            }}
          >
            موجودی کیف پول:
          </p>
          <div
            ref={priceDiv}
            className={`absolute flex items-center justify-center gap-1  ${
              walletCard
                ? "top-4 font-semibold "
                : "bottom-3 top-20 font-medium"
            } transition-all duration-300 ease-in-out`}
            style={{
              left: `${
                walletCard
                  ? "16px"
                  : `${
                      (wallectCardWidth - priceDiv.current?.offsetWidth) / 2
                    }px`
              }`,
            }}
          >
            <span className="text-default-50 text-base sm:text-xl">
              {trimPrice(wallet?.balance, ",")}
            </span>
            <span className="text-[#C2C2C2] text-xs">تومان</span>
          </div>
        </>
      ) : (
        ""
      )}
      <div
        className={`${
          walletCard ? "opacity-100" : "opacity-0"
        } transition-opacity ease-in-out duration-500 absolute bottom-4 inset-x-4`}
      >
        <div className="flex items-center justify-between w-full mb-1.5">
          <p className="text-xs sm:text-sm text-default-300">بلوکه شده:</p>
          <p className="flex items-center">
            <span className="font-semibold text-base sm:text-xl ml-2 text-primary">
              {trimPrice(wallet?.suspended, ",")}
            </span>
            <span className="text-xs text-primary">تومان</span>
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs sm:text-sm text-default-300">قدرت خرید:</p>
          <p className="flex items-center">
            <span className="font-semibold text-base sm:text-xl ml-2 text-default-50">
              {trimPrice(wallet?.balance, ",")}
            </span>
            <span className="text-xs text-[#C2C2C2]">تومان</span>
          </p>
        </div>
      </div>
    </button>
  );
}

export default WalletCard;
