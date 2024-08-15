// types.ts
// This file defines TypeScript interfaces and types used throughout the application.
// It includes types for the analysis results, analysis status, and the shape of the context state.

export interface TabItem {
    id: string;
    label: string;
}

export interface AnalysisResult {
    filename: string;
    iaKi67: number;
    iaTotalCells: number;
    iaPositiveCells: number;
    iaNegativeCells: number;
    ki67: number;
    totalCells: number;
    positiveCells: number;
    negativeCells: number;
    originalImageUrl: string;
    analyzedImageUrl: string;
}

export type AnalysisStatus = 'idle' | 'processing' | 'complete' | 'error';

export interface AnalysisState {
    selectedFiles: File[];
    analysisResults: AnalysisResult[];
    activeTab: string;
    status: AnalysisStatus;
    error: string | null;
}

export interface AnalysisContextType extends AnalysisState {
    setSelectedFiles: (files: File[]) => void;
    setAnalysisResults: (results: AnalysisResult[]) => void;
    setActiveTab: (tab: string) => void;
    setStatus: (status: AnalysisStatus) => void;
    setError: (error: string | null) => void;
    startAnalysis: () => void;
}
