import React from 'react';
import { renderToString } from 'react-dom/server';

// Test components
function TestPage() {
  return React.createElement('div', null, 'Hello World');
}

function TestApp({ children }) {
  return React.createElement('div', null, children);
}

function TestLayout({ children }) {
  return React.createElement('div', null, children);
}

// Test the composition logic
try {
  console.log('Testing SSR composition...');
  
  // Test 1: Basic page rendering
  let content = React.createElement(TestPage, {});
  console.log('✓ Basic page element created');
  
  // Test 2: Layout wrapping
  content = React.createElement(TestLayout, {}, content);
  console.log('✓ Layout wrapping works');
  
  // Test 3: App wrapping
  content = React.createElement(TestApp, {}, content);
  console.log('✓ App wrapping works');
  
  // Test 4: Render to string
  const html = renderToString(content);
  console.log('✓ SSR rendering successful');
  console.log('Rendered HTML:', html);
  
} catch (error) {
  console.error('❌ SSR test failed:', error.message);
  console.error(error.stack);
}
