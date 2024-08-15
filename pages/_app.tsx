// _app.tsx
// This is the main App component which wraps the entire application.
// It uses a NavigationProvider to manage the active tab state across different pages.
// The Header component provides navigation options, and the Content component 
// displays the appropriate page content based on the active tab.

import React from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavigationProvider, useNavigation } from "../context/NavigationContext";
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";
import Header from "../components/Header";
import CancerDeMamaPage from '../components/CancerDeMamaPage';
import CancerDeProstataPage from '../components/CancerDeProstataPage';
import HomePage from '../components/HomePage';
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from '../context/LanguageContext';

const Content: React.FC = () => {
  const { activeTab } = useNavigation();
  switch (activeTab) {
    case 'home': return <HomePage />;
    case 'cancer-de-mama': return <CancerDeMamaPage />;
    case 'cancer-de-prostata': return <CancerDeProstataPage />;
    default: return null;
  }
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NavigationProvider>
            <InnerApp Component={Component} pageProps={pageProps} router={router} />
          </NavigationProvider>
        </AuthProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

const InnerApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <Content />
      </div>
    </div>
  );
};

