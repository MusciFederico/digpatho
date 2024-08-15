// AnalysisResults.tsx
// This component handles the display of analysis results. It includes functionality 
// for generating a PDF of the results and displaying a SweetAlert notification 
// when the analysis is complete or encounters an error.

import React, { useEffect, useRef } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import Image from 'next/image';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';

const AnalysisResults: React.FC = () => {
    const { darkMode } = useDarkMode();
    const { language } = useLanguage();
    const { analysisResults, status, error } = useAnalysis();
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === 'complete') {
            Swal.fire({
                title: language === 'en' ? 'Analysis Complete!' : '¡Análisis completado!',
                text: language === 'en' ? 'Results are ready for review.' : 'Los resultados están listos para ser revisados.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`,
                    popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                    title: darkMode ? 'text-white' : 'text-gray-900',
                    confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white',
                },
            });
        } else if (status === 'error') {
            Swal.fire({
                title: language === 'en' ? 'Error' : 'Error',
                text: error || (language === 'en' ? 'An error occurred during the analysis.' : 'Ha ocurrido un error durante el análisis.'),
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`,
                    popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                    title: darkMode ? 'text-white' : 'text-gray-900',
                    confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white',
                },
            });
        }
    }, [status, error, darkMode, language]);

    const generatePDF = async () => {
        if (!resultsRef.current) return;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const elements = resultsRef.current.getElementsByClassName('result-item');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');

            if (i !== 0) pdf.addPage();

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        pdf.save('analysis-results.pdf');
    };

    if (status === 'idle') return null;

    if (status === 'processing') {
        return (
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Analysis in Progress' : 'Análisis en progreso'}
                </h2>
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mr-3"></div>
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Processing your images...' : 'Procesando sus imágenes...'}
                    </span>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
                    {language === 'en' ? 'Error' : 'Error'}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="mt-6 md:mt-8 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
                {language === 'en' ? 'Analysis Results' : 'Resultados del Análisis'}
            </h2>
            <button
                onClick={generatePDF}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {language === 'en' ? 'Download PDF' : 'Descargar PDF'}
            </button>
            <div ref={resultsRef}>
                {analysisResults.map((result, index) => (
                    <div key={index} className="result-item bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-4 md:p-6 mb-8 max-w-4xl w-full">
                        <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
                            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4 flex flex-col items-center">
                                <Image
                                    src={result.originalImageUrl}
                                    alt="Original Image"
                                    width={300}
                                    height={300}
                                    className="rounded-lg mb-2"
                                />
                            </div>
                            <div className="md:w-1/2 flex flex-col items-center">
                                <Image
                                    src={result.originalImageUrl}
                                    alt="Analyzed Image"
                                    width={300}
                                    height={300}
                                    className="rounded-lg mb-2"
                                />
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {['iaKi67', 'iaTotalCells', 'iaPositiveCells', 'iaNegativeCells', 'ki67', 'totalCells', 'positiveCells', 'negativeCells'].map((key) => {
                                const value = result[key as keyof typeof result];
                                const displayValue = typeof value === 'number' ? value.toFixed(2) : value;

                                return (
                                    <div key={key}>
                                        <p className="font-semibold text-center">{key.replace(/([A-Z])/g, ' $1').replace('Ia', 'IA')}:</p>
                                        <input
                                            type="text"
                                            value={displayValue}
                                            readOnly
                                            className="w-full border rounded px-2 py-1 text-center bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisResults;
