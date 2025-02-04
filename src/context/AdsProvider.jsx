"use client";
import { Axios } from "@/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState(null);

  async function fetchAds() {
    const response = await Axios.get(`/API/loads/my_loads`);
    if (response.status === 200) {
      setAds(response.data.my_loads);
    }
  }

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <AdsContext.Provider value={{ ads, fetchAds }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error("useAds must be used within a useAdsProvider");
  }
  return context;
};
