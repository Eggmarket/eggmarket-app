import React from "react";
import SearchInput from "./SearchInput";

const SearchModal = ({ id }) => {
  return (
    <dialog id={id} className="modal max-w-[440px] mx-auto min-h-screen">
      <div className="modal-box fullModal p-0">
        <div className="flex flex-col justify-center">
          <SearchInput />
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
