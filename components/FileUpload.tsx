// export default FileUpload;
// FileUpload.tsx
// This component handles file uploading functionality for image analysis.
// It allows users to select multiple image files, displays previews, and triggers the analysis process.

import React, { useState, useCallback } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import Swal from 'sweetalert2';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext'; // Import the language hook

const FileUpload: React.FC = () => {
    const { darkMode } = useDarkMode();
    const { selectedFiles, setSelectedFiles, status, startAnalysis } = useAnalysis();
    const [error, setError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const { language } = useLanguage(); // Get the current language

    const processFiles = (files: FileList | File[]) => {
        setError(null);
        const invalidFiles = Array.from(files).filter((file) => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            const errorMessage = language === 'es'
                ? 'Por favor, suba solo archivos de imagen.'
                : 'Please upload only image files.';
            setError(errorMessage);
            Swal.fire({
                title: language === 'es' ? 'Error' : 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: language === 'es' ? 'OK' : 'OK',
                customClass: {
                    htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`,
                    popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                    title: darkMode ? 'text-white' : 'text-gray-900',
                    confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white',
                },
            });
            return;
        }

        setSelectedFiles(Array.from(files));

        // Generate previews
        const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews);

        Swal.fire({
            title: language === 'es' ? '¡Imágenes cargadas!' : 'Images Uploaded!',
            text: language === 'es'
                ? `${files.length} archivo(s) seleccionado(s)`
                : `${files.length} file(s) selected`,
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
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        processFiles(files);
    };

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        processFiles(files);
    }, []);

    const handleStartAnalysis = () => {
        Swal.fire({
            title: language === 'es' ? '¿Iniciar análisis?' : 'Start Analysis?',
            text: language === 'es'
                ? '¿Está seguro de que desea iniciar el análisis?'
                : 'Are you sure you want to start the analysis?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: language === 'es' ? 'Sí, iniciar' : 'Yes, start',
            cancelButtonText: language === 'es' ? 'Cancelar' : 'Cancel',
            customClass: {
                htmlContainer: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`,
                popup: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                title: darkMode ? 'text-white' : 'text-gray-900',
                confirmButton: darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                startAnalysis();
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-4">
            <div
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-purple-600 bg-purple-100' : 'border-gray-300'
                    } ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <p className={`mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {language === 'es'
                        ? 'Arrastre y suelte las imágenes aquí, o'
                        : 'Drag and drop images here, or'}
                </p>
                <label
                    htmlFor="file-upload"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer transition-colors"
                >
                    {language === 'es' ? 'Seleccionar archivos' : 'Select files'}
                    <input
                        id="file-upload"
                        type="file"
                        onChange={onChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                </label>
            </div>
            <span className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedFiles.length > 0
                    ? language === 'es'
                        ? `${selectedFiles.length} archivo(s) seleccionado(s)`
                        : `${selectedFiles.length} file(s) selected`
                    : language === 'es'
                        ? 'No se han seleccionado archivos'
                        : 'No files selected'}
            </span>
            {selectedFiles.length > 0 && (
                <button
                    onClick={handleStartAnalysis}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                    disabled={status === 'processing'}
                >
                    {language === 'es' ? 'Iniciar análisis' : 'Start analysis'}
                </button>
            )}
            {error && <p className="mt-2 text-red-500">{error}</p>}
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {previews.map((preview, index) => (
                        <img
                            key={index}
                            src={preview}
                            alt={language === 'es' ? `Vista previa ${index + 1}` : `Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
