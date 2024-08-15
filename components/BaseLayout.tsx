// BaseLayout.tsx
// This component serves as the base layout for different pages within the application.
// It includes the page title, header, and provides the AnalysisProvider context for managing analysis-related state.

import React from 'react';
import Head from 'next/head';
import { AnalysisProvider } from '../context/AnalysisContext';
import { useDarkMode } from '../context/DarkModeContext';

interface BaseLayoutProps {
    title: string;
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ title, children }) => {
    const { darkMode } = useDarkMode();

    return (
        <AnalysisProvider>
            <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900`}>
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header className="bg-white dark:bg-gray-800 shadow py-4 sm:py-6 lg:py-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-600 dark:text-purple-400 text-center sm:text-left">
                            {title}
                        </h1>
                    </div>
                </header>
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10 xl:py-12">
                    {children}
                </main>
            </div>
        </AnalysisProvider>
    );
};

export default BaseLayout;
