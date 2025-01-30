import React, { useEffect, useState } from "react";
import SearchBox from "../UI/SearchBox";
import Checkbox from "../UI/Checkbox";
import SelectBadge from "../UI/SelectBadge";
import { useBrands } from "@/context/BrandsProvider";
import ScrollBar from "../UI/ScrollBar";

export default function Brand({ selected, setSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { brands } = useBrands();

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult(brands);
    } else {
      setSearchResult(
        brands.filter((brand) => brand.brand_name.startsWith(searchTerm))
      );
    }
  }, [searchTerm]);

  const handleChecked = (e, { id, title }) => {
    if (e.target.checked) {
      const checked = {
        id,
        title,
      };
      setSelected("brands", checked, "add");
    } else {
      setSelected(
        "brands",
        selected.filter((item) => item.id !== id),
        "replace"
      );
    }
  };

  const closeHandler = (badge) =>
    setSelected(
      "brands",
      selected.filter((item) => item.id !== badge.id),
      "replace"
    );
  return (
    <div className="flex-1 pt-4 bg-default-50">
      <div className="px-8 mb-8">
        <SearchBox
          text="برند"
          value={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="pr-4">
          {selected.length !== 0 ? (
            <div className="carousel gap-1 mt-8">
              {selected?.map((item) => (
                <div className="carousel-item" key={item.id}>
                  <SelectBadge badge={item} onClose={closeHandler} />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ScrollBar>
        {searchResult.map((item) => (
          <Checkbox
            key={item.id}
            data={{ id: item.id, title: item.brand_name }}
            onChange={handleChecked}
            checked={selected?.find((s) => s.id === item.id) ? true : false}
          />
        ))}
      </ScrollBar>
    </div>
  );
}
