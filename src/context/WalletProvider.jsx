"use client";
import { useToken } from "@/components/hook/useToken/useToken";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useToken();

  async function fetchWallet() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/transactions/balance`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setWallet(response.data.wallet);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    token && fetchWallet();
  }, [token]);

  return (
    <WalletContext.Provider
      value={{ wallet, loading, reFetchWallet: fetchWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a useWalletProvider");
  }
  return context;
};
