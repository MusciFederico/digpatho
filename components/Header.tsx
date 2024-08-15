// Header.tsx
// The Header component provides the main navigation for the application. It includes buttons for navigating 
// between the home, breast cancer, and prostate cancer pages, as well as a logo and logout button.

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { useNavigation } from '../context/NavigationContext';
import DarkModeToggle from './DarkModeToggleComponent';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
    const { darkMode } = useDarkMode();
    const { setActiveTab } = useNavigation();
    const { isLoggedIn, logout } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const handleLogout = () => {
        Swal.fire({
            title: language === 'es' ? '¿Estás seguro?' : 'Are you sure?',
            text: language === 'es' ? '¿Quieres cerrar sesión?' : 'Do you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: language === 'es' ? 'Sí, cerrar sesión' : 'Yes, log out',
            cancelButtonText: language === 'es' ? 'Cancelar' : 'Cancel',
            customClass: {
                htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`,
                popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                title: darkMode ? 'text-white' : 'text-gray-900',
                confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                setActiveTab('home');
            }
        });
    };

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <>
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center justify-evenly w-full sm:w-auto">
                        <Image src="/logopng.png" alt="DigPatho Logo" width={150} height={40} />
                    </div>

                    <nav className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => setActiveTab('home')} className="text-pink-600 dark:text-pink-400 text-base sm:text-lg hover:text-pink-800 dark:hover:text-pink-200">
                                    {language === 'es' ? 'Inicio' : 'Home'}
                                </button>
                                <button onClick={() => setActiveTab('cancer-de-mama')} className="text-pink-600 dark:text-pink-400 text-base sm:text-lg hover:text-pink-800 dark:hover:text-pink-200">
                                    {language === 'es' ? 'Cáncer de Mama' : 'Breast Cancer'}
                                </button>
                                <button onClick={() => setActiveTab('cancer-de-prostata')} className="text-pink-600 dark:text-pink-400 text-base sm:text-lg hover:text-pink-800 dark:hover:text-pink-200">
                                    {language === 'es' ? 'Cáncer de Próstata' : 'Prostate Cancer'}
                                </button>
                            </>
                        ) : null}
                    </nav>

                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <DarkModeToggle />
                        <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="bg-pink-600 text-white px-4 py-2 rounded text-base sm:text-lg hover:bg-pink-700 transition-colors">
                                {language === 'es' ? 'Cerrar sesión' : 'Logout'}
                            </button>
                        ) : (
                            <button onClick={handleLogin} className="bg-pink-600 text-white px-4 py-2 rounded text-base sm:text-lg hover:bg-pink-700 transition-colors">
                                {language === 'es' ? 'Iniciar sesión' : 'Login'}
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};

export default Header;
