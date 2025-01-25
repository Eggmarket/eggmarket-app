"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const OriginContext = createContext();

export const OriginsProvider = ({ children }) => {
  const [provinces, setProvinces] = useState(null);
  const [cities, setCities] = useState(null);

  async function fetchProvinces() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
      .then((response) => {
        setProvinces(response.data.provinces);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function fetchCities() {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/area_suggestion`,
        {
          area: "",
          province: "",
        }
      )
      .then((response) => {
        setCities(response.data.suggestions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProvinces();
    fetchCities();
  }, []);

  return (
    <OriginContext.Provider value={{ provinces, cities }}>
      {children}
    </OriginContext.Provider>
  );
};

export const useOrigins = () => {
  const context = useContext(OriginContext);
  if (context === undefined) {
    throw new Error("useOrigins must be used within a useOriginsProvider");
  }
  return context;
};
