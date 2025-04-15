'use client';

import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex flex-col w-full">
            {/* Yellow top bar */}
            <div className="h-7 bg-[#895129] w-full" aria-hidden="true">
                <span className="sr-only">You Found Me!</span>
            </div>

            {/* Main header content */}
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex items-center justify-between py-8">
                        {/* Name on the left */}
                        <h1 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] tracking-wide">Cole Carter</h1>

                        {/* Desktop navigation - hidden on mobile */}
                        <div className="hidden md:flex gap-8 font-['Playfair_Display'] font-medium text-lg tracking-wide">
                            <a href="#" className="hover:text-yellow-950">ABOUT</a>
                            <a href="#" className="hover:text-yellow-950">PROJECTS</a>
                            <a href="#" className="hover:text-yellow-950">CONTACT</a>
                            <a href="#" className="hover:text-yellow-950">BLOG</a>
                        </div>

                        {/* Mobile menu button - right side */}
                        <button
                            className="md:hidden text-gray-700 hover:text-yellow-950"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 relative">
                                <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1'}`}></span>
                                <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-10 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>

            {/* Mobile menu - slides from right */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-20 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 pt-24">
                    {/* Close button in slideout menu */}
                    <button
                        className="absolute top-8 right-6 text-gray-700 hover:text-yellow-950"
                        onClick={toggleMenu}
                        aria-label="Close menu"
                    >
                        <div className="w-6 h-6 relative">
                            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform rotate-45"></span>
                            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -rotate-45"></span>
                        </div>
                    </button>

                    <div className="flex flex-col gap-6 font-['Playfair_Display'] font-medium text-lg tracking-wide">
                        <a href="#" className="hover:text-yellow-950">ABOUT</a>
                        <a href="#" className="hover:text-yellow-950">PROJECTS</a>
                        <a href="#" className="hover:text-yellow-950">CONTACT</a>
                        <a href="#" className="hover:text-yellow-950">BLOG</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;