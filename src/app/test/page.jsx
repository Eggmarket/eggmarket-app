"use client";
import { Axios } from "@/axios";
import { useWallet } from "@/context/WalletProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Page() {
  const [balance, setBalance] = useState(0);

  const { reFetchWallet } = useWallet();
  async function addCredit() {
    const response = await Axios.post(`/API/transactions/add-credit`, {
      credit: balance,
    });
    if (response.status === 200) {
      toast.info("کیف پول شما شارژ شد.");
      reFetchWallet();
    }
  }
  return (
    <div>
      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button onClick={() => addCredit()}>add credit</button>
    </div>
  );
}

export default Page;
