// CancerDeMamaPage.tsx
// This component represents the "Cáncer de Mama" page. It functions similarly to the prostate page
// but focuses on breast cancer with different analysis methods available in the tab navigation.

import React, { useState } from 'react';
import BaseLayout from './BaseLayout';
import TabNavigation from './TabNavigation';
import FileUpload from './FileUpload';
import AnalysisResults from './AnalysisResults';
import TutorialComponent from './TutorialComponent';
import { useLanguage } from '../context/LanguageContext';

const CancerMamaPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Ki67');
    const mamaTabs = ['Ki67', 'HER2', 'Estrógeno', 'Progesterona'];
    const comingSoonTabs = ['HER2', 'Estrógeno', 'Progesterona'];
    const { language } = useLanguage(); // Get the current language

    const renderContent = () => {
        if (comingSoonTabs.includes(activeTab)) {
            return (
                <div className="text-center mt-4 md:mt-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                        {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                        {language === 'es' ? 'Estamos trabajando en esta sección. ¡Vuelve pronto para más actualizaciones!' : 'We are working on this section. Come back soon for more updates!'}
                    </p>
                </div>
            );
        }
        return (
            <div className="flex flex-col space-y-8">
                <div>
                    <FileUpload />
                </div>
                <div>
                    <AnalysisResults />
                </div>
            </div>
        );
    };

    return (
        <BaseLayout title={language === 'es' ? 'Cáncer de Mama' : 'Breast Cancer'}>
            <div className="flex justify-between items-center mb-4">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={mamaTabs} />
                <TutorialComponent />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-6">
                {renderContent()}
            </div>
        </BaseLayout>
    );
};

export default CancerMamaPage;
