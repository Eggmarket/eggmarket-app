"use client";

import eggMarket from "@/image/eggmarket.svg";
import Image from "next/image";
import SearchModal from "./SearchModal";

const Search = () => {
  return (
    <>
      {/* <div className="w-full px-1 max-md:block hidden">
        <div
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="mt-2 flex cursor-text w-full py-3 px-4 rounded-xl border border-default-400 justify-start items-center bg-default-50 gap-2"
        >
          <span className="icon-Search text-2xl text-default-400"></span>
          <p className="text-default-400 font-light">جستجو در</p>
          <Image src={eggMarket} alt="eggMarket" />
        </div>
        <FilterLayout />
      </div>
      <SearchModal id={"my_modal_5"} /> */}
      <div className="w-full px-1 block">
        <div
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="mt-2 flex cursor-text w-full py-3 px-4 rounded-xl border border-default-400 justify-start items-center bg-default-50 gap-2"
        >
          <span className="icon-Search text-2xl text-default-400"></span>
          <p className="text-default-400 font-light">جستجو در</p>
          <Image src={eggMarket} alt="eggMarket" />
        </div>
        {/* <FilterLayout /> */}
      </div>
      <SearchModal id={"my_modal_5"} />
    </>
  );
};

export default Search;
