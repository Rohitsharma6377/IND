import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50/80">
      <Navbar />
      <main className="flex-1 pt-[66px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}