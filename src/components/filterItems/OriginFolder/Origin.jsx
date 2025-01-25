"use client";

import React, { useEffect, useState } from "react";
import SearchBox from "../../UI/SearchBox";
import Checkbox from "../../UI/Checkbox";
import SelectBadge from "../../UI/SelectBadge";
import Cities from "./Cities";
import Provinces from "./Provinces";
import ScrollBar from "@/components/UI/ScrollBar";
import { useOrigins } from "@/context/OriginsProvider";

export default function Origin({ selected, setSelected }) {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [allCitiesChecked, setAllCitiesChecked] = useState([]);
  const [partialCityChecked, setPartialCityChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { provinces, cities } = useOrigins();

  // useEffect(() => {
  //   if (!selected.length && !allCitiesChecked.length && selectedBadges.length)
  //     setSelectedBadges([]);
  // }, [selected]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      setSearchResult(cities.filter(({ title }) => title.includes(searchTerm)));
    }
  }, [searchTerm]);

  const handleAllChecked = (e, data) => {
    if (e.target.checked) {
      const checked = {
        id: data.id,
        title: `همه شهرهای ${provinces.find((p) => p.id === data.id).title}`,
        allOption: true,
      };

      setAllCitiesChecked((prev) => [...prev, data.id]);
      // setSelectedBadges((prev) => [...prev, checked]);

      let citiesInProvince = cities.filter((city) => city.province === data.id);
      let filteredCities = citiesInProvince.filter(
        (city) => !selected.find((elem) => elem.id === city.id)
      );
      filteredCities = [...selected, ...filteredCities, checked];

      setSelected("origins", filteredCities, "replace");
    } else {
      // all cities option is deselected, so we delete all the badges for this province and uncheck all the cities
      setAllCitiesChecked(allCitiesChecked.filter((item) => item !== data.id));

      let filteredCities = selected.filter((item) => item.province !== data.id);
      filteredCities = filteredCities.filter(
        (item) => !item.allOption && item.id !== data.id
      );

      setSelected("origins", filteredCities, "replace");
      // let values = selectedBadges;
      // values = values.filter((item) => {
      //   if (item.allOption && item.id !== data.id) {
      //     // all cities option
      //     return item;
      //   } else if (item.province && item.province !== data.id) {
      //     // city
      //     return item;
      //   }
      // });
      // setSelectedBadges(values);
    }
  };

  const handleCityChecked = (e, data) => {
    if (e.target.checked) {
      if (!selected.find((city) => city.id === data.id)) {
        setSelected("origins", data, "add");
        // setSelectedBadges((prev) => [...prev, data]);
      }
    } else {
      //de select a city which its all cities option is selected
      if (allCitiesChecked.includes(data.province)) {
        // 1. remove that province from allCitiesChecked
        setAllCitiesChecked(
          allCitiesChecked.filter((item) => item !== data.province)
        );
        // 2. remove the unchecked city from the list of selected cities
        setSelected(
          "origins",
          selected.filter((city) => city !== String(data.id))
        );

        //3. add province to partialCityChecked

        setPartialCityChecked((prev) => [...prev, data.province]);

        //4. add badge for each city in this province individually and remove from allCities option

        let values = selectedBadges;
        // first I should save the previous values except this city all option and other cities in this province that have badge
        values = values.filter((item) => {
          if (item.allOption && item.id !== data.province) {
            // all cities option
            return item;
          } else if (item.province && item.province !== data.province) {
            return item;
          }
        });

        // then I will add the new values
        selected
          .filter(
            (item) => item.province === data.province && item.id !== data.id
          )
          .map((elem) => {
            values = [...values, elem];
          });
        // setSelectedBadges(values);
      } else {
        if (partialCityChecked.includes(data.province)) {
          let filtered = selected.find(
            (item) =>
              item.province &&
              item.province === data.province &&
              item.id !== data.id
          );
          if (!filtered)
            setPartialCityChecked(
              partialCityChecked.filter((item) => item !== data.province)
            );
        }
        setSelected(
          "origins",
          selected.filter((city) => city.id !== data.id),
          "replace"
        );
        // setSelectedBadges(
        //   selectedBadges.filter((badge) => badge.id !== data.id)
        // );
      }
    }
  };

  const closeBadgeHandler = (badge) => {
    if (badge.allOption) {
      // all cities option
      setAllCitiesChecked(allCitiesChecked.filter((item) => item !== badge.id));
      setSelected(
        "origins",
        selected.filter((selectedCity) => selectedCity.province !== badge.id),
        "replace"
      );
      setSelectedBadges(
        selectedBadges.filter((item) => {
          if (item.allOption && item.id !== badge.id) {
            // all cities option
            return item;
          } else if (item.province && item.province !== badge.id) {
            return item;
          }
        })
      );
    } else {
      if (allCitiesChecked.includes(badge.province)) {
        // 1. remove that province from allCitiesChecked
        setAllCitiesChecked(
          allCitiesChecked.filter((item) => item !== badge.province)
        );
        // 3. remove the unchecked city from the list of selected cities
        setSelected(
          "origins",
          selected.filter((city) => city.id !== badge.id)
        );

        //3. add province to partialCityChecked

        //4. add badge for each city in this province individually and remove from allCities option

        let values = selectedBadges;
        // first I should save the previous values except this city all option and other cities in this province that have badge
        values = values.filter((item) => {
          if (item.allOption && item.id !== badge.province) {
            // all cities option
            return item;
          } else if (item.province && item.province !== badge.province) {
            return item;
          }
        });

        // then I will add the new values
        selected
          .filter(
            (item) => item.province === badge.province && item.id !== badge.id
          )
          .map((elem) => {
            values = [...values, elem];
          });
        setSelectedBadges(values);
      } else {
        setSelected(
          "origins",
          selected.filter((city) => city.id !== badge.id),
          "replace"
        );
        setSelectedBadges(selectedBadges.filter((b) => b.id !== badge.id));
      }
    }
  };

  return (
    <>
      <div className="px-8 mb-8">
        <SearchBox
          text="شهر یا استان"
          value={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="pr-4 h-12">
          {selected.length !== 0 && (
            <div className="mt-4 gap-2 carousel w-full">
              {selected?.map((item) => (
                <SelectBadge
                  key={item.id}
                  badge={item}
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
              checked={selected?.find((s) => s.id === data.id)}
            />
          ))
        ) : selectedProvince.length === 0 ? (
          <Provinces
            provinceClickHandler={(province) => setSelectedProvince(province)}
          />
        ) : (
          <Cities
            cities={cities.filter(
              (city) => city.province === selectedProvince.id
            )}
            backClickHandler={() => setSelectedProvince([])}
            provinceName={
              provinces.find((province) => province.id === selectedProvince.id)
                .title
            }
            handleAllChecked={handleAllChecked}
            handleCityChecked={handleCityChecked}
            selectedProvince={selectedProvince}
            allCitiesChecked={allCitiesChecked}
            selectedCities={selected}
            partialCityChecked={partialCityChecked}
          />
        )}
      </ScrollBar>
    </>
  );
}
