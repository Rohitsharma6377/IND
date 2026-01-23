import React, { useState, useEffect } from 'react';
import { Link } from 'indjs';

// SVG Icons inline for navbar
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ZapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/features', label: 'Features', icon: ZapIcon },
        { href: '/components', label: 'Components', icon: GridIcon },
        { href: '/docs', label: 'Docs', icon: BookIcon },
        { href: '/examples', label: 'Examples', icon: CodeIcon },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/50' 
                : 'bg-white/70 backdrop-blur-md'
        }`}>
            {/* Animated gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-18">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center cursor-pointer group">
                            {/* Logo Image */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <img 
                                    src="/logo.svg" 
                                    alt="INDJS Logo" 
                                    className="relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                                />
                            </div>
                            {/* Logo Text */}
                            <div className="ml-2 flex flex-col">
                                <span className="text-xl font-black tracking-tight">
                                    <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">indjs</span>
                                </span>
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider -mt-0.5 hidden sm:block">
                                    Framework
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        {/* Nav Links with glass effect */}
                        <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-full p-1.5 mr-4 shadow-inner">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <Link key={link.href} href={link.href}>
                                        <span className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-200 rounded-full hover:bg-white hover:shadow-md flex items-center gap-1.5 group">
                                            <IconComponent />
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Get Started Button */}
                            <Link href="/docs">
                                <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 group">
                                    Get Started
                                    <ArrowRightIcon />
                                </button>
                            </Link>
                            
                            {/* GitHub Button */}
                            <a
                                href="https://github.com/Rohitsharma6377/IND"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-gray-900/25"
                            >
                                <GithubIcon />
                                <span className="font-semibold text-sm">Star</span>
                                <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                                    <StarIcon />
                                    1K+
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileMenuOpen ? 'max-h-[450px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-900/10 p-3 mt-2 border border-gray-100">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <Link key={link.href} href={link.href}>
                                        <span 
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
                                        >
                                            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <IconComponent />
                                            </span>
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2 mx-4"></div>
                            <Link href="/docs">
                                <span 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer shadow-md"
                                >
                                    Get Started
                                    <ArrowRightIcon />
                                </span>
                            </Link>
                            <a
                                href="https://github.com/Rohitsharma6377/IND"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 mt-1 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                            >
                                <GithubIcon />
                                Star on GitHub
                                <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                                    <StarIcon />
                                    1K+
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}