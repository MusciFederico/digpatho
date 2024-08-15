// CancerDeProstataPage.tsx
// This component represents the "Cáncer de Próstata" page. It allows users to upload files for analysis
// and provides a tab navigation to switch between different prostate cancer analysis methods.

import React, { useState } from 'react';
import BaseLayout from './BaseLayout';
import TabNavigation from '../components/TabNavigation';
import { useLanguage } from '../context/LanguageContext';

const CancerProstataPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Gleason');
    const prostataTabs = ['Gleason', 'PSA', 'Andrógeno'];
    const { language } = useLanguage(); // Get the current language

    return (
        <BaseLayout title={language === 'es' ? 'Cáncer de Próstata' : 'Prostate Cancer'}>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={prostataTabs} />

            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-6 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'es'
                        ? 'Estamos trabajando arduamente para traerte las herramientas de análisis de cáncer de próstata. ¡Vuelve pronto para descubrir nuestras nuevas funcionalidades!'
                        : 'We are working hard to bring you prostate cancer analysis tools. Check back soon to discover our new features!'}
                </p>
                <p className="text-md md:text-lg text-gray-500 dark:text-gray-400">
                    {language === 'es'
                        ? 'Mientras tanto, puedes explorar nuestras herramientas para el análisis de cáncer de mama.'
                        : 'In the meantime, you can explore our tools for breast cancer analysis.'}
                </p>
            </div>
        </BaseLayout>
    );
};

export default CancerProstataPage;
