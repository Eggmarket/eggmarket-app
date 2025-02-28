"use client";

import { Axios } from "@/axios";
import React, { createContext, useEffect, useState } from "react";

export const UserProfile = createContext(null);

function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchProfile = async () => {
    setIsLoading(true);
    const response = await Axios(`/API/customers/profile`);
    if (response.status === 200) {
      setIsLoading(false);
      setUserProfile(response.data.profile);
      localStorage.setItem("profile", JSON.stringify(response.data.profile));
    } else {
      setIsLoading(false);
      console.log(response);
    }
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    } else {
      fetchProfile();
    }
  }, []);

  return (
    <UserProfile.Provider value={{ userProfile, fetchProfile, isLoading }}>
      {children}
    </UserProfile.Provider>
  );
}

export default ProfileProvider;
