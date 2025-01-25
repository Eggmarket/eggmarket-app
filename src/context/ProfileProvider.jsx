'use client'

import React, { createContext, useState } from 'react'

export const UserProfile = createContext(null)

function ProfileProvider({ children }) {
    const [userProfile, setUserProfile] = useState({})

    return (
        <UserProfile.Provider value={[userProfile, setUserProfile]}>
            {children}
        </UserProfile.Provider>
    )
}

export default ProfileProvider