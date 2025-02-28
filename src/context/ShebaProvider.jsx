"use client";
import { Axios } from "@/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ShebaContext = createContext();

export const ShebaProvider = ({ children }) => {
  const [sheba, setSheba] = useState(null);

  const fetchSheba = async () => {
    const response = await Axios.post("/API/customers/shaba/list");
    if (response.status === 200) {
      setSheba(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchSheba();
  }, []);

  return (
    <ShebaContext.Provider value={{ sheba, fetchSheba }}>
      {children}
    </ShebaContext.Provider>
  );
};

export const useSheba = () => {
  const context = useContext(ShebaContext);
  if (context === undefined) {
    throw new Error("useSheba must be used within a useShebaProvider");
  }
  return context;
};
