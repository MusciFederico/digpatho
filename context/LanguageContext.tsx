// LanguageProvider.tsx
// This file defines the LanguageContext and LanguageProvider, providing a way 
// to toggle between Spanish and English languages within the application. The 
// context can be used to access and update the current language preference.

import React, { createContext, useContext, useState } from 'react';

interface LanguageContextProps {
    language: 'es' | 'en';
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'es' | 'en'>('es');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
