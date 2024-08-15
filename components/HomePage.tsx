// // HomePage.tsx
// // This component represents the home page of the application.
// // It displays a hero section with a background image, overlay, and content about early cancer detection using AI.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const { language } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.5}px)`,
    };

    return (
        <div className="min-h-screen">
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0" style={parallaxStyle}>
                    <Image
                        src="/lab-background.jpg"
                        alt="Laboratory background"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50">
                    <div className="container mx-auto h-full flex flex-col justify-center items-center text-white text-center px-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                            {language === 'es' ? 'Detección temprana de cáncer con IA' : 'Early Cancer Detection with AI'}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl">
                            {language === 'es'
                                ? 'Nuestra tecnología permite que la detección de cáncer sea más rápida y precisa. El futuro de la patología es ahora. El futuro es DigPatho'
                                : 'Our technology makes cancer detection faster and more accurate. The future of pathology is now. The future is DigPatho'}
                        </p>
                        <a
                            href="https://www.digpatho.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg text-base md:text-lg transition duration-300 shadow-lg">
                                {language === 'es' ? 'Conoce más' : 'Learn More'}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
