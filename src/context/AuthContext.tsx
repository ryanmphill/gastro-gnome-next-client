'use client'

import { getCurrentUser } from "@/dataManagers/authManager";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (newToken: string) => void;
    isAdmin: string | null;
    setAdmin: (isStaff: string) => void;
    currentUserId: number;
    fetchCurrentUserId: () => Promise<void>;
  };


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
    // All your data goes here
    const [token, setTokenState] = useState<string | null>(null)
    const [isAdmin, setIsAdminState] = useState<string | null>(null)
    const [currentUserId, setCurrentUserId] = useState<number>(0)

    useEffect(
        () => {
            if (localStorage.getItem("gastro_token")) {
                setTokenState(localStorage.getItem("gastro_token"))
            }
        },
        [setTokenState]
    )

    const setToken = (newToken: string) => {
        localStorage.setItem('gastro_token', newToken)
        setTokenState(newToken)
    }

    const setAdmin = (isStaff: string) => {
        localStorage.setItem('gastro_admin', isStaff)
        setIsAdminState(isStaff)
    }

    const fetchCurrentUserId = useCallback(async () => {
        if (localStorage.getItem("gastro_token")) {
            const data = await getCurrentUser()
            setCurrentUserId(data.id)
        } else {
            setCurrentUserId(0)
        }
        
    },[])

    

    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <AuthContext.Provider
            value={{ token, setToken, isAdmin, setAdmin, currentUserId, fetchCurrentUserId }}
        >
            {children}
        </AuthContext.Provider>
    )
}