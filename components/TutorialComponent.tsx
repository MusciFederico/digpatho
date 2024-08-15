// TutorialComponent.tsx
// This component displays a tutorial pop-up for guiding users through the image analysis process.
// It uses SweetAlert2 for displaying the tutorial, with content that adapts based on the selected language and dark mode.


import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { HelpCircle } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext'; // Import the hook
import { useLanguage } from '../context/LanguageContext'; // Import the language context


const ReactSwal = withReactContent(Swal);

const TutorialComponent: React.FC = () => {
    const { darkMode } = useDarkMode(); // Get the dark mode state
    const { language } = useLanguage(); // Get the current language

    const showTutorial = () => {
        ReactSwal.fire({
            title: language === 'es' ? 'Bienvenido al Análisis de Imágenes' : 'Welcome to Image Analysis',
            html: `
                ${language === 'es' ? `
                    Este es un tutorial rápido para guiarte a través del proceso:

                    <ul>
                        <li>Paso 1: Sube las imágenes haciendo clic en "Subir imágenes", o usa el arrastrar y soltar.</li>
                        <li>Paso 2: Asegúrate de que los archivos subidos sean imágenes válidas.</li>
                        <li>Paso 3: Una vez cargadas las imágenes, haz clic en "Iniciar análisis".</li>
                        <li>Paso 4: Espera a que se complete el análisis. Los resultados se mostrarán a continuación.</li>
                        <li>Paso 5: Revisa los resultados y actúa según corresponda.</li>
                    </ul>
                ` : `
                    This is a quick tutorial to guide you through the process:

                    <ul>
                        <li>Step 1: Upload images by clicking "Upload Images", or use the Drag and Drop.</li>
                        <li>Step 2: Ensure the uploaded files are valid images.</li>
                        <li>Step 3: Once the images are uploaded, click "Start Analysis".</li>
                        <li>Step 4: Wait for the analysis to complete. Results will be displayed below.</li>
                        <li>Step 5: Review the results and take appropriate actions.</li>
                    </ul>
                `}
            `,
            icon: 'info',
            confirmButtonText: language === 'es' ? '¡Entendido!' : 'Got it!',
            customClass: {
                htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`, // Adjust text color based on dark mode
                popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', // Adjust popup background and text color
                title: darkMode ? 'text-white' : 'text-gray-900', // Adjust title color
                confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white', // Adjust button style
            },
        });
    };

    return (
        <button
            onClick={showTutorial}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors"
            aria-label="Show tutorial"
        >
            <HelpCircle className="w-6 h-6" />
        </button>
    );
};

export default TutorialComponent;
