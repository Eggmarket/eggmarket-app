'use client';
import React, { createContext, useEffect, useState } from 'react';

export const Token = createContext(null);

// export const useToken = () => {
//     const context = useContext(Token);
//     if (!context) {
//         throw new Error("useToken must be used within a TokenProvider");
//     }
//     return context;
// };

export default function TokenProvider({ children }) {
    const [token, setToken] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(JSON.parse(savedToken));
            }
        } catch (err) {
            console.error('Failed to load token from localStorage:', err);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (token !== null) {
            try {
                localStorage.setItem('token', JSON.stringify(token));
            } catch (err) {
                console.error('Failed to save token to localStorage:', err);
            }
        }
    }, [token]);

    if (!isLoaded) {
        return null; // Or a loader/spinner component
    }

    return (
        <Token.Provider value={[token, setToken]}>
            {children}
        </Token.Provider>
    );
}
