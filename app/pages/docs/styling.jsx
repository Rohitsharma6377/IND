import React from 'react';

export default function Styling() {
  const ui = {
    page: {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(180deg, #0ea5e9 0%, #111827 60%)',
      color: '#0f172a'
    },
    wrap: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '48px 20px'
    },
    hero: {
      background: 'white',
      borderRadius: 16,
      padding: 28,
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: '#0b1220'
    },
    nav: {
      marginBottom: 20
    },
    backLink: {
      color: '#0ea5e9',
      textDecoration: 'none',
      fontSize: 14
    },
    section: {
      marginBottom: 32
    },
    h2: {
      fontSize: 24,
      color: '#0b1220',
      marginBottom: 16,
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: 8
    },
    h3: {
      fontSize: 20,
      color: '#0b1220',
      marginBottom: 12,
      marginTop: 24
    },
    p: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16
    },
    ul: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20
    },
    li: {
      marginBottom: 8
    },
    code: {
      background: '#f1f5f9',
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: 14,
      fontFamily: 'monospace'
    },
    codeBlock: {
      background: '#1e293b',
      color: '#e2e8f0',
      padding: 20,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'monospace',
      overflow: 'auto',
      marginBottom: 20,
      lineHeight: 1.5
    },
    info: {
      background: '#dbeafe',
      border: '1px solid #3b82f6',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    infoTitle: {
      fontWeight: 600,
      color: '#1e40af',
      marginBottom: 8
    }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>← Back to Documentation</a>
          </nav>
          
          <h1 style={ui.h1}>Styling</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Built-in Tailwind CSS</h2>
            <p style={ui.p}>
              INDJS comes with Tailwind CSS pre-configured and ready to use. No setup required – just start using Tailwind classes in your components.
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/styled-page.jsx
import React from 'react';

export default function StyledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Beautiful Styling with Tailwind
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Card Title</h2>
            <p className="text-gray-600">Card content with Tailwind classes.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Click Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Tailwind Configuration</h2>
            <p style={ui.p}>
              Customize Tailwind by creating a <code style={ui.code}>tailwind.config.js</code> file in your project root:
            </p>
            
            <div style={ui.codeBlock}>
              {`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        custom: '#ff6b6b'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}`}
            </div>

            <h3 style={ui.h3}>INDJS Tailwind Configuration</h3>
            <div style={ui.codeBlock}>
              {`// indjs.config.js
export default {
  tailwind: {
    enabled: true,
    config: './tailwind.config.js', // Custom config path
    
    // Built-in optimizations
    purge: true, // Remove unused CSS in production
    
    // JIT mode for faster builds
    mode: 'jit',
    
    // Custom PostCSS plugins
    plugins: [
      'autoprefixer',
      'postcss-nested'
    ]
  }
};`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>CSS Modules</h2>
            <p style={ui.p}>
              Use CSS Modules for component-scoped styling by naming your CSS files with <code style={ui.code}>.module.css</code>:
            </p>
            
            <div style={ui.codeBlock}>
              {`/* components/Button.module.css */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}`}
            </div>

            <div style={ui.codeBlock}>
              {`// components/Button.jsx
import React from 'react';
import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  ...props 
}) {
  const className = [
    styles.button,
    styles[variant],
    size === 'large' && styles.large
  ].filter(Boolean).join(' ');
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

// Usage
export function MyPage() {
  return (
    <div>
      <Button variant="primary" size="large">
        Primary Button
      </Button>
      <Button variant="secondary">
        Secondary Button
      </Button>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Global CSS</h2>
            <p style={ui.p}>
              Add global styles by creating CSS files in the <code style={ui.code}>styles</code> directory:
            </p>
            
            <div style={ui.codeBlock}>
              {`/* styles/globals.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom global styles */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --spacing-unit: 0.25rem;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

/* Custom utility classes */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Component styles */
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}`}
            </div>

            <p style={ui.p}>
              INDJS automatically imports <code style={ui.code}>styles/globals.css</code> if it exists.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Styled Components</h2>
            <p style={ui.p}>
              Use CSS-in-JS libraries like styled-components for dynamic styling:
            </p>
            
            <div style={ui.codeBlock}>
              {`// Install styled-components
npm install styled-components

// components/StyledButton.jsx
import styled from 'styled-components';

const StyledButton = styled.button\`
  padding: \${props => props.size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
  background-color: \${props => props.primary ? '#3b82f6' : '#e5e7eb'};
  color: \${props => props.primary ? 'white' : '#374151'};
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: \${props => props.primary ? '#2563eb' : '#d1d5db'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
\`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

// Usage
export function MyComponent() {
  return (
    <div>
      <Button primary size="large">Primary Button</Button>
      <Button>Secondary Button</Button>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Sass/SCSS Support</h2>
            <p style={ui.p}>
              INDJS supports Sass/SCSS out of the box. Just install sass and start using .scss files:
            </p>
            
            <div style={ui.codeBlock}>
              {`# Install Sass
npm install sass

/* styles/components.scss */
$primary-color: #3b82f6;
$secondary-color: #64748b;
$border-radius: 0.5rem;

@mixin button-base {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: $border-radius;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.btn {
  @include button-base;
  
  &--primary {
    @include button-variant($primary-color);
  }
  
  &--secondary {
    @include button-variant($secondary-color);
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
}

// Nested selectors
.card {
  background: white;
  border-radius: $border-radius;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .card-header {
    padding: 1.5rem 1.5rem 0;
    
    h2 {
      margin: 0;
      color: #1f2937;
    }
  }
  
  .card-body {
    padding: 1.5rem;
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>CSS Variables</h2>
            <p style={ui.p}>
              Use CSS custom properties for dynamic theming:
            </p>
            
            <div style={ui.codeBlock}>
              {`/* styles/theme.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #1e40af;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-dark: #3b82f6;
  --color-secondary: #94a3b8;
  --bg-primary: #1f2937;
  --bg-secondary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
}

/* Component using CSS variables */
.themed-button {
  background-color: var(--color-primary);
  color: var(--text-primary, white);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--border-radius, 0.5rem);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.themed-button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}`}
            </div>

            <div style={ui.codeBlock}>
              {`// components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="themed-button"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Responsive Design</h2>
            <p style={ui.p}>
              Use Tailwind's responsive utilities or CSS media queries for responsive design:
            </p>
            
            <div style={ui.codeBlock}>
              {`// Tailwind responsive classes
export default function ResponsiveComponent() {
  return (
    <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-4 
      p-4 
      sm:p-6 
      lg:p-8
    ">
      <div className="
        bg-white 
        rounded-lg 
        shadow-md 
        p-4 
        sm:p-6 
        hover:shadow-lg 
        transition-shadow
      ">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
          Responsive Card
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          This card adapts to different screen sizes.
        </p>
      </div>
    </div>
  );
}

/* CSS Media Queries */
.responsive-container {
  padding: 1rem;
}

@media (min-width: 640px) {
  .responsive-container {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .responsive-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}`}
            </div>
          </div>

          <div style={ui.info}>
            <div style={ui.infoTitle}>💡 Styling Best Practices</div>
            <ul style={{ margin: 0, fontSize: 14, color: '#1e40af' }}>
              <li>Use Tailwind for rapid prototyping and utility-first styling</li>
              <li>Use CSS Modules for component-specific styles</li>
              <li>Use CSS variables for theming and dynamic values</li>
              <li>Keep global styles minimal and focused</li>
              <li>Use responsive design principles from the start</li>
              <li>Optimize for performance by purging unused CSS</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
