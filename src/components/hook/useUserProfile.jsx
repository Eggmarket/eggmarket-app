'use client'

import { UserProfile } from '@/context/ProfileProvider'
import React, { useContext } from 'react'

const useUserProfile = () => {
    const context = useContext(UserProfile)
    return context
}

export default useUserProfile