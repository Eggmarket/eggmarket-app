import React, { useEffect, useState } from "react";
import SearchBox from "../UI/SearchBox";
import Checkbox from "../UI/Checkbox";
import SelectBadge from "../UI/SelectBadge";
import { BrandOptions } from "../static";

export default function Brand({ selected, setSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult(BrandOptions);
    } else {
      setSearchResult(
        BrandOptions.filter((item) => item.title.includes(searchTerm))
      );
    }
  }, [searchTerm]);

  const handleChecked = (e, { id, title }) => {
    if (e.target.checked) {
      const checked = {
        id,
        title,
      };
      setSelected("brand", checked, "add");
    } else {
      setSelected(
        "brand",
        selected.filter((item) => item.id !== id),
        "replace"
      );
    }
  };

  const closeHandler = (badge) =>
    setSelected(
      "brand",
      selected.filter((item) => item.id !== badge.id),
      "replace"
    );
  return (
    <div className="pt-4">
      <div className="px-8 mb-8">
        <SearchBox
          text="برند"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="pr-4">
          {selected.length !== 0 ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {selected?.map((item) => (
                <SelectBadge
                  key={item.id}
                  badge={item}
                  onClose={closeHandler}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="px-8">
        {searchResult.map((item) => (
          <Checkbox
            key={item.id}
            data={item}
            onChange={handleChecked}
            checked={selected?.find((s) => s.id === item.id) ? true : false}
          />
        ))}
      </div>
    </div>
  );
}
