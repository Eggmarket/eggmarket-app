'use client'

import { Token } from '@/context/TokenProvider'
import { useContext } from 'react'

export const useToken = () => {
    const [token, setToken] = useContext(Token)
    return [token, setToken]
}