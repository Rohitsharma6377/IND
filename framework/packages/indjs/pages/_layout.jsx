import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans antialiased transition-colors duration-300">
            <Navbar />

            <main className="pt-16 min-h-screen">
                {children}
            </main>

            <Footer />
        </div>
    );
}
