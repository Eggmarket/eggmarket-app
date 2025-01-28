"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const BrandsContext = createContext();

export const BrandsProvider = ({ children }) => {
  const [brands, setBrands] = useState(null);

  async function fetchBrands() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/get_brands`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandsContext.Provider value={{ brands }}>
      {children}
    </BrandsContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandsContext);
  if (context === undefined) {
    throw new Error("useBrands must be used within a useBrandsProvider");
  }
  return context;
};
