import React from 'react';

// For a native-like app, we often want the pages to control the full screen.
// We remove the default web navbar/footer to allow the mobile design to shine.
export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}