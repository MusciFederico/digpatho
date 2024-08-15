// AnalysisContext.tsx
// This file creates a context for managing the analysis-related state in the application.
// It includes a provider component (AnalysisProvider) and a custom hook (useAnalysis) for accessing the context.

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { AnalysisState, AnalysisContextType, AnalysisResult, AnalysisStatus } from '../types';

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error('useAnalysis must be used within an AnalysisProvider');
    }
    return context;
};

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AnalysisState>({
        selectedFiles: [],
        analysisResults: [],
        activeTab: 'Ki67',
        status: 'idle',
        error: null,
    });

    const setSelectedFiles = useCallback((files: File[]) => {
        setState(prev => ({ ...prev, selectedFiles: files }));
    }, []);

    const setAnalysisResults = useCallback((results: AnalysisResult[]) => {
        setState(prev => ({ ...prev, analysisResults: results }));
    }, []);

    const setActiveTab = (tab: string) => {
        setState(prev => ({ ...prev, activeTab: tab }));
    };

    const setStatus = useCallback((status: AnalysisStatus) => {
        setState(prev => ({ ...prev, status }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    const startAnalysis = useCallback(async () => {
        setStatus('processing');
        setError(null);
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            const results: AnalysisResult[] = state.selectedFiles.map(file => ({
                filename: file.name,
                iaKi67: Math.random(),
                iaTotalCells: Math.floor(Math.random() * 500),
                iaPositiveCells: Math.floor(Math.random() * 100),
                iaNegativeCells: Math.floor(Math.random() * 400),
                ki67: Math.random(),
                totalCells: Math.floor(Math.random() * 500),
                positiveCells: Math.floor(Math.random() * 100),
                negativeCells: Math.floor(Math.random() * 400),
                originalImageUrl: URL.createObjectURL(file),
                analyzedImageUrl: '/path-to-analyzed-image.png',
            }));
            setAnalysisResults(results);
            setStatus('complete');
        } catch (error) {
            setError('An error occurred during analysis');
            setStatus('error');
        }
    }, [state.selectedFiles, setStatus, setError, setAnalysisResults]);

    return (
        <AnalysisContext.Provider
            value={{
                ...state,
                setSelectedFiles,
                setAnalysisResults,
                setActiveTab,
                setStatus,
                setError,
                startAnalysis,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
};

