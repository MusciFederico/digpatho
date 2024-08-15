// AuthContext.tsx
// This file defines an authentication context using React's Context API.
// It manages login, logout, and state persistence, with support for dark mode
// and multi-language SweetAlert notifications.

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDarkMode } from './DarkModeContext';
import { useLanguage } from './LanguageContext';

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { darkMode } = useDarkMode(); // Get the dark mode state
    const { language } = useLanguage(); //

    useEffect(() => {
        // Check if user is already logged in (e.g., from localStorage)
        const storedLoginState = localStorage.getItem('isLoggedIn');
        if (storedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (username: string, password: string) => {
        if (username === 'candidate' && password === 'jb<6TD5]Q^hW>Gr.hOpL') {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            Swal.fire({
                title: language === 'en' ? 'Welcome!' : '¡Bienvenido!',
                text: language === 'en' ? 'You have logged in successfully.' : 'Has iniciado sesión correctamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`, // Adjust text color based on dark mode
                    popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', // Adjust popup background and text color
                    title: darkMode ? 'text-white' : 'text-gray-900', // Adjust title color
                    confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white', // Adjust button style
                },
            });
            return true;
        }
        Swal.fire({
            title: 'Error',
            text: language === 'en' ? 'Incorrect username or password.' : 'Usuario o contraseña incorrectos.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`, // Adjust text color based on dark mode
                popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', // Adjust popup background and text color
                title: darkMode ? 'text-white' : 'text-gray-900', // Adjust title color
                confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white', // Adjust button style
            },
        });
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        Swal.fire({
            title: language === 'en' ? 'Goodbye!' : '¡Hasta luego!',
            text: language === 'en' ? 'You have successfully logged out.' : 'Has cerrado sesión correctamente.',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`, // Adjust text color based on dark mode
                popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', // Adjust popup background and text color
                title: darkMode ? 'text-white' : 'text-gray-900', // Adjust title color
                confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white', // Adjust button style
            },
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};