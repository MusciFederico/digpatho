// NavigationContext.tsx
// This file creates a context for managing navigation state across the application.
// It provides a way to keep track of the active tab and update it.

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
};

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </NavigationContext.Provider>
    );
};
