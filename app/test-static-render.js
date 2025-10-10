import React from 'react';
import { renderToString } from 'react-dom/server';
import { loadModule } from '../framework/packages/indjs/src/load.mjs';

async function testStaticRender() {
  try {
    console.log('Testing static render of index.jsx...');
    
    // Load the index component
    const mod = await loadModule('./pages/index.jsx');
    const Component = mod.default;
    
    if (!Component) {
      console.error('No default export found in index.jsx');
      return;
    }
    
    // Render to string
    const html = renderToString(React.createElement(Component));
    
    console.log('Rendered HTML length:', html.length);
    console.log('First 500 characters:');
    console.log(html.substring(0, 500));
    
    // Check if styles are included
    if (html.includes('style=')) {
      console.log('✅ Inline styles found in rendered HTML');
    } else {
      console.log('❌ No inline styles found in rendered HTML');
    }
    
  } catch (error) {
    console.error('Error during test render:', error);
  }
}

testStaticRender();
