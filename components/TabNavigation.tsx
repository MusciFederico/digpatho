// TabNavigation.tsx
// The TabNavigation component is used to display tabs for navigating between different analysis methods.
// It highlights the active tab and calls the setActiveTab function when a tab is clicked.

import React from 'react';

interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, tabs }) => (
    <div className="flex flex-wrap border-b mb-4 sm:mb-6 lg:mb-8">
        {tabs.map((tab) => (
            <button
                key={tab}
                className={`px-1 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === tab
                    ? 'border-b-2 sm:border-b-4 border-purple-600 text-purple-600 font-semibold'
                    : 'text-gray-600 hover:text-purple-600'
                    }`}
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default TabNavigation;
