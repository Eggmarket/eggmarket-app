"use client";

import React, { useEffect, useState } from "react";
import SearchBox from "../UI/SearchBox";
import SelectBadge from "../UI/SelectBadge";
import Checkbox from "../UI/Checkbox";
import ScrollBar from "../UI/ScrollBar";

export default function OriginFilter({ selected, setSelected, provinces }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      setSearchResult(
        provinces.filter(({ title }) => title.includes(searchTerm))
      );
    }
  }, [searchTerm]);

  const handleCityChecked = (e, data) => {
    if (e.target.checked) {
      setSelected("origins", data.id, "add");
      // setSelectedBadges((prev) => [...prev, data]);
    } else {
      setSelected(
        "origins",
        selected.filter((city) => city !== data.id),
        "replace"
      );
      // setSelectedBadges(selectedBadges.filter((badge) => badge.id !== data.id));
    }
  };

  const closeBadgeHandler = (badge) => {
    setSelected(
      "origins",
      selected.filter((province) => province !== badge.id),
      "replace"
    );
    // setSelectedBadges(selectedBadges.filter((b) => b.id !== badge.id));
  };

  return (
    <>
      <div className="mb-4 px-8">
        <SearchBox
          text="شهر یا استان"
          value={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="mx-1 h-12">
          {selected.length !== 0 && (
            <div className="mt-4 gap-2 carousel w-full">
              {selected?.map((id) => (
                <SelectBadge
                  key={id}
                  badge={{
                    id: id,
                    title: provinces.find((item) => item.id === id).title,
                  }}
                  onClose={closeBadgeHandler}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ScrollBar>
        {searchResult.length ? (
          searchResult.map((data) => (
            <Checkbox
              key={data.id}
              data={data}
              onChange={handleCityChecked}
              checked={selected?.find((s) => s === data.id)}
            />
          ))
        ) : (
          <div className="list">
            {provinces.map((province) => {
              return (
                <Checkbox
                  key={province.id}
                  data={province}
                  onChange={handleCityChecked}
                  checked={selected.includes(province.id)}
                />
              );
            })}
          </div>
        )}
      </ScrollBar>
    </>
  );
}
