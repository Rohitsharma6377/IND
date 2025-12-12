// pages/docs/auth.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Auth() {
  const ui = {
    page: {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      minHeight: "100vh",
      margin: 0,
      background: "linear-gradient(180deg, #0ea5e9 0%, #111827 60%)",
      color: "#0f172a"
    },
    wrap: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "48px 20px"
    },
    hero: {
      background: "white",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: "#0b1220"
    },
    nav: {
      marginBottom: 20
    },
    backLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14
    },
    section: {
      marginBottom: 32
    },
    h2: {
      fontSize: 24,
      color: "#0b1220",
      marginBottom: 16,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: 8
    },
    h3: {
      fontSize: 20,
      color: "#0b1220",
      marginBottom: 12,
      marginTop: 24
    },
    p: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16
    },
    ul: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20
    },
    li: {
      marginBottom: 8
    },
    code: {
      background: "#f1f5f9",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "monospace"
    },
    codeBlock: {
      background: "#1e293b",
      color: "#e2e8f0",
      padding: 20,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: "monospace",
      overflow: "auto",
      marginBottom: 20,
      lineHeight: 1.5
    },
    warning: {
      background: "#fef3c7",
      border: "1px solid #f59e0b",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    warningTitle: {
      fontWeight: 600,
      color: "#92400e",
      marginBottom: 8
    },
    success: {
      background: "#dcfce7",
      border: "1px solid #16a34a",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    successTitle: {
      fontWeight: 600,
      color: "#15803d",
      marginBottom: 8
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 20,
      marginBottom: 32
    },
    card: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: 8,
      padding: 20
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#0b1220",
      marginBottom: 12
    }
  };
  return /* @__PURE__ */ jsx("main", { style: ui.page, children: /* @__PURE__ */ jsx("div", { style: ui.wrap, children: /* @__PURE__ */ jsxs("section", { style: ui.hero, children: [
    /* @__PURE__ */ jsx("nav", { style: ui.nav, children: /* @__PURE__ */ jsx("a", { href: "/docs", style: ui.backLink, children: "\u2190 Back to Documentation" }) }),
    /* @__PURE__ */ jsx("h1", { style: ui.h1, children: "Authentication Guide" }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Overview" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "INDJS provides a comprehensive authentication system with built-in support for JWT tokens, OAuth providers, session management, and role-based access control. This guide will help you implement secure authentication in your INDJS application." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Authentication Methods" }),
      /* @__PURE__ */ jsxs("div", { style: ui.grid, children: [
        /* @__PURE__ */ jsxs("div", { style: ui.card, children: [
          /* @__PURE__ */ jsx("div", { style: ui.cardTitle, children: "\u{1F510} JWT Authentication" }),
          /* @__PURE__ */ jsx("p", { style: { ...ui.p, marginBottom: 0 }, children: "Stateless token-based authentication perfect for APIs and SPAs. Includes automatic token refresh and secure cookie storage." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: ui.card, children: [
          /* @__PURE__ */ jsx("div", { style: ui.cardTitle, children: "\u{1F310} OAuth Integration" }),
          /* @__PURE__ */ jsx("p", { style: { ...ui.p, marginBottom: 0 }, children: "Built-in support for Google, GitHub, Facebook, and custom OAuth providers. Simplified setup with automatic user profile management." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: ui.card, children: [
          /* @__PURE__ */ jsx("div", { style: ui.cardTitle, children: "\u{1F36A} Session-Based Auth" }),
          /* @__PURE__ */ jsx("p", { style: { ...ui.p, marginBottom: 0 }, children: "Traditional server-side sessions with secure cookie management. Ideal for server-rendered applications." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: ui.card, children: [
          /* @__PURE__ */ jsx("div", { style: ui.cardTitle, children: "\u{1F465} Role-Based Access" }),
          /* @__PURE__ */ jsx("p", { style: { ...ui.p, marginBottom: 0 }, children: "Flexible role and permission system with middleware support. Protect routes and API endpoints based on user roles." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Quick Setup" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Get authentication up and running in your INDJS app with these simple steps:" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "1. Install Dependencies" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `# Install authentication packages
npm install jsonwebtoken bcryptjs
npm install @types/jsonwebtoken @types/bcryptjs --save-dev

# For OAuth (optional)
npm install passport passport-google-oauth20 passport-github2` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "2. Environment Variables" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `# .env.local
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "3. Create Auth Utilities" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// lib/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'indjs-app'
  });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, { issuer: 'indjs-app' });
}

export function getTokenFromRequest(req) {
  // Check Authorization header
  let token = req.headers.authorization?.replace('Bearer ', '');
  
  // Check cookies
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    token = cookies.authToken;
  }
  
  return token;
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Login & Registration" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Registration API" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/api/auth/register.js
import { hashPassword, signToken } from '../../../lib/auth';
import { createUser, getUserByEmail } from '../../../lib/database';

export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Name, email, and password are required' 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long' 
      });
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Set secure cookie
    res.setHeader('Set-Cookie', 
      \`authToken=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`
    );

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Login API" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/api/auth/login.js
import { verifyPassword, signToken } from '../../../lib/auth';
import { getUserByEmail } from '../../../lib/database';

export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Set secure cookie
    res.setHeader('Set-Cookie', 
      \`authToken=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Authentication Middleware" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Protect your API routes and pages with authentication middleware:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// lib/middleware/auth.js
import { verifyToken, getTokenFromRequest } from '../auth';
import { getUserById } from '../database';

export function requireAuth(handler) {
  return async ({ req, res, ...rest }) => {
    try {
      const token = getTokenFromRequest(req);
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const decoded = verifyToken(token);
      const user = await getUserById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Add user to request
      req.user = user;
      req.token = token;

      return handler({ req, res, ...rest });

    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export function requireRole(roles) {
  return (handler) => {
    return requireAuth(async ({ req, res, ...rest }) => {
      const userRole = req.user.role;
      
      if (!roles.includes(userRole)) {
        return res.status(403).json({ 
          error: 'Insufficient permissions' 
        });
      }

      return handler({ req, res, ...rest });
    });
  };
}

// Usage examples:
// export default requireAuth(myHandler);
// export default requireRole(['admin', 'moderator'])(myHandler);` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Client-Side Authentication" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Auth Context & Hook" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Protected Route Component" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// components/ProtectedRoute.jsx
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'indjs';
import { useEffect } from 'react';

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback = <div>Loading...</div> 
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }

    if (!loading && requiredRole && user?.role !== requiredRole) {
      router.push('/unauthorized');
    }
  }, [loading, isAuthenticated, user, requiredRole]);

  if (loading) return fallback;
  if (!isAuthenticated) return null;
  if (requiredRole && user?.role !== requiredRole) return null;

  return children;
}

// Usage:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>
//
// <ProtectedRoute requiredRole="admin">
//   <AdminPanel />
// </ProtectedRoute>` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "OAuth Integration" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Google OAuth Setup" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/api/auth/google.js
export default function handler({ req, res }) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline'
  });
  
  const authUrl = \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\`;
  res.redirect(authUrl);
}

// pages/api/auth/google/callback.js
import { signToken } from '../../../../lib/auth';
import { findOrCreateUser } from '../../../../lib/database';

export default async function handler({ req, res }) {
  try {
    const { code } = req.query;
    
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI
      })
    });
    
    const tokens = await tokenResponse.json();
    
    // Get user info
    const userResponse = await fetch(
      \`https://www.googleapis.com/oauth2/v2/userinfo?access_token=\${tokens.access_token}\`
    );
    const googleUser = await userResponse.json();
    
    // Find or create user
    const user = await findOrCreateUser({
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      provider: 'google',
      providerId: googleUser.id
    });
    
    // Generate JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    // Set cookie and redirect
    res.setHeader('Set-Cookie', 
      \`authToken=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`
    );
    res.redirect('/dashboard');
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.success, children: [
      /* @__PURE__ */ jsx("div", { style: ui.successTitle, children: "\u2705 Best Practices" }),
      /* @__PURE__ */ jsxs("ul", { style: { margin: 0, fontSize: 14, color: "#15803d" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Always use HTTPS in production" }),
        /* @__PURE__ */ jsx("li", { children: "Store secrets in environment variables" }),
        /* @__PURE__ */ jsx("li", { children: "Use HTTP-only cookies for token storage" }),
        /* @__PURE__ */ jsx("li", { children: "Implement proper password hashing (bcrypt with salt rounds \u2265 12)" }),
        /* @__PURE__ */ jsx("li", { children: "Add rate limiting to authentication endpoints" }),
        /* @__PURE__ */ jsx("li", { children: "Validate and sanitize all user inputs" }),
        /* @__PURE__ */ jsx("li", { children: "Implement proper session management and cleanup" }),
        /* @__PURE__ */ jsx("li", { children: "Use CSRF protection for session-based authentication" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Next Steps" }),
      /* @__PURE__ */ jsxs("ul", { style: ui.ul, children: [
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/database", style: { color: "#0ea5e9" }, children: "Set up database integration for user storage" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/api-routes", style: { color: "#0ea5e9" }, children: "Learn more about API routes and middleware" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/deployment", style: { color: "#0ea5e9" }, children: "Deploy your authenticated app securely" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/testing", style: { color: "#0ea5e9" }, children: "Test your authentication flows" }) })
      ] })
    ] })
  ] }) }) });
}
export {
  Auth as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9hdXRoLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXV0aCgpIHtcbiAgY29uc3QgdWkgPSB7XG4gICAgcGFnZToge1xuICAgICAgZm9udEZhbWlseTogJ3N5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCcsXG4gICAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBlYTVlOSAwJSwgIzExMTgyNyA2MCUpJyxcbiAgICAgIGNvbG9yOiAnIzBmMTcyYSdcbiAgICB9LFxuICAgIHdyYXA6IHtcbiAgICAgIG1heFdpZHRoOiA5ODAsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgcGFkZGluZzogJzQ4cHggMjBweCdcbiAgICB9LFxuICAgIGhlcm86IHtcbiAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICBib3JkZXJSYWRpdXM6IDE2LFxuICAgICAgcGFkZGluZzogMjgsXG4gICAgICBib3hTaGFkb3c6ICcwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuMTIpJ1xuICAgIH0sXG4gICAgaDE6IHtcbiAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgIGxpbmVIZWlnaHQ6IDEuMSxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCdcbiAgICB9LFxuICAgIG5hdjoge1xuICAgICAgbWFyZ2luQm90dG9tOiAyMFxuICAgIH0sXG4gICAgYmFja0xpbms6IHtcbiAgICAgIGNvbG9yOiAnIzBlYTVlOScsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgZm9udFNpemU6IDE0XG4gICAgfSxcbiAgICBzZWN0aW9uOiB7XG4gICAgICBtYXJnaW5Cb3R0b206IDMyXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgZm9udFNpemU6IDI0LFxuICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTYsXG4gICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2UyZThmMCcsXG4gICAgICBwYWRkaW5nQm90dG9tOiA4XG4gICAgfSxcbiAgICBoMzoge1xuICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTIsXG4gICAgICBtYXJnaW5Ub3A6IDI0XG4gICAgfSxcbiAgICBwOiB7XG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBjb2xvcjogJyMzMzQxNTUnLFxuICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgbWFyZ2luQm90dG9tOiAxNlxuICAgIH0sXG4gICAgdWw6IHtcbiAgICAgIGZvbnRTaXplOiAxNixcbiAgICAgIGNvbG9yOiAnIzMzNDE1NScsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICBtYXJnaW5Cb3R0b206IDE2LFxuICAgICAgcGFkZGluZ0xlZnQ6IDIwXG4gICAgfSxcbiAgICBsaToge1xuICAgICAgbWFyZ2luQm90dG9tOiA4XG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnI2YxZjVmOScsXG4gICAgICBwYWRkaW5nOiAnMnB4IDZweCcsXG4gICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJ1xuICAgIH0sXG4gICAgY29kZUJsb2NrOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnIzFlMjkzYicsXG4gICAgICBjb2xvcjogJyNlMmU4ZjAnLFxuICAgICAgcGFkZGluZzogMjAsXG4gICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICBtYXJnaW5Cb3R0b206IDIwLFxuICAgICAgbGluZUhlaWdodDogMS41XG4gICAgfSxcbiAgICB3YXJuaW5nOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnI2ZlZjNjNycsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgI2Y1OWUwYicsXG4gICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICBwYWRkaW5nOiAxNixcbiAgICAgIG1hcmdpbkJvdHRvbTogMjBcbiAgICB9LFxuICAgIHdhcm5pbmdUaXRsZToge1xuICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgY29sb3I6ICcjOTI0MDBlJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogOFxuICAgIH0sXG4gICAgc3VjY2Vzczoge1xuICAgICAgYmFja2dyb3VuZDogJyNkY2ZjZTcnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICMxNmEzNGEnLFxuICAgICAgYm9yZGVyUmFkaXVzOiA4LFxuICAgICAgcGFkZGluZzogMTYsXG4gICAgICBtYXJnaW5Cb3R0b206IDIwXG4gICAgfSxcbiAgICBzdWNjZXNzVGl0bGU6IHtcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIGNvbG9yOiAnIzE1ODAzZCcsXG4gICAgICBtYXJnaW5Cb3R0b206IDhcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgzMDBweCwgMWZyKSknLFxuICAgICAgZ2FwOiAyMCxcbiAgICAgIG1hcmdpbkJvdHRvbTogMzJcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgIGJhY2tncm91bmQ6ICcjZjhmYWZjJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTJlOGYwJyxcbiAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgIHBhZGRpbmc6IDIwXG4gICAgfSxcbiAgICBjYXJkVGl0bGU6IHtcbiAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCcsXG4gICAgICBtYXJnaW5Cb3R0b206IDEyXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW4gc3R5bGU9e3VpLnBhZ2V9PlxuICAgICAgPGRpdiBzdHlsZT17dWkud3JhcH0+XG4gICAgICAgIDxzZWN0aW9uIHN0eWxlPXt1aS5oZXJvfT5cbiAgICAgICAgICA8bmF2IHN0eWxlPXt1aS5uYXZ9PlxuICAgICAgICAgICAgPGEgaHJlZj1cIi9kb2NzXCIgc3R5bGU9e3VpLmJhY2tMaW5rfT5cdTIxOTAgQmFjayB0byBEb2N1bWVudGF0aW9uPC9hPlxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxoMSBzdHlsZT17dWkuaDF9PkF1dGhlbnRpY2F0aW9uIEd1aWRlPC9oMT5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9Pk92ZXJ2aWV3PC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgSU5ESlMgcHJvdmlkZXMgYSBjb21wcmVoZW5zaXZlIGF1dGhlbnRpY2F0aW9uIHN5c3RlbSB3aXRoIGJ1aWx0LWluIHN1cHBvcnQgZm9yIEpXVCB0b2tlbnMsIFxuICAgICAgICAgICAgICBPQXV0aCBwcm92aWRlcnMsIHNlc3Npb24gbWFuYWdlbWVudCwgYW5kIHJvbGUtYmFzZWQgYWNjZXNzIGNvbnRyb2wuIFRoaXMgZ3VpZGUgd2lsbCBoZWxwIHlvdSBcbiAgICAgICAgICAgICAgaW1wbGVtZW50IHNlY3VyZSBhdXRoZW50aWNhdGlvbiBpbiB5b3VyIElOREpTIGFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5BdXRoZW50aWNhdGlvbiBNZXRob2RzPC9oMj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmdyaWR9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jYXJkfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jYXJkVGl0bGV9Plx1RDgzRFx1REQxMCBKV1QgQXV0aGVudGljYXRpb248L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17eyAuLi51aS5wLCBtYXJnaW5Cb3R0b206IDAgfX0+XG4gICAgICAgICAgICAgICAgICBTdGF0ZWxlc3MgdG9rZW4tYmFzZWQgYXV0aGVudGljYXRpb24gcGVyZmVjdCBmb3IgQVBJcyBhbmQgU1BBcy4gXG4gICAgICAgICAgICAgICAgICBJbmNsdWRlcyBhdXRvbWF0aWMgdG9rZW4gcmVmcmVzaCBhbmQgc2VjdXJlIGNvb2tpZSBzdG9yYWdlLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmRUaXRsZX0+XHVEODNDXHVERjEwIE9BdXRoIEludGVncmF0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgLi4udWkucCwgbWFyZ2luQm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgQnVpbHQtaW4gc3VwcG9ydCBmb3IgR29vZ2xlLCBHaXRIdWIsIEZhY2Vib29rLCBhbmQgY3VzdG9tIE9BdXRoIHByb3ZpZGVycy4gXG4gICAgICAgICAgICAgICAgICBTaW1wbGlmaWVkIHNldHVwIHdpdGggYXV0b21hdGljIHVzZXIgcHJvZmlsZSBtYW5hZ2VtZW50LlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmRUaXRsZX0+XHVEODNDXHVERjZBIFNlc3Npb24tQmFzZWQgQXV0aDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7IC4uLnVpLnAsIG1hcmdpbkJvdHRvbTogMCB9fT5cbiAgICAgICAgICAgICAgICAgIFRyYWRpdGlvbmFsIHNlcnZlci1zaWRlIHNlc3Npb25zIHdpdGggc2VjdXJlIGNvb2tpZSBtYW5hZ2VtZW50LiBcbiAgICAgICAgICAgICAgICAgIElkZWFsIGZvciBzZXJ2ZXItcmVuZGVyZWQgYXBwbGljYXRpb25zLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmR9PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNhcmRUaXRsZX0+XHVEODNEXHVEQzY1IFJvbGUtQmFzZWQgQWNjZXNzPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgLi4udWkucCwgbWFyZ2luQm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgRmxleGlibGUgcm9sZSBhbmQgcGVybWlzc2lvbiBzeXN0ZW0gd2l0aCBtaWRkbGV3YXJlIHN1cHBvcnQuIFxuICAgICAgICAgICAgICAgICAgUHJvdGVjdCByb3V0ZXMgYW5kIEFQSSBlbmRwb2ludHMgYmFzZWQgb24gdXNlciByb2xlcy5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PlF1aWNrIFNldHVwPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgR2V0IGF1dGhlbnRpY2F0aW9uIHVwIGFuZCBydW5uaW5nIGluIHlvdXIgSU5ESlMgYXBwIHdpdGggdGhlc2Ugc2ltcGxlIHN0ZXBzOlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT4xLiBJbnN0YWxsIERlcGVuZGVuY2llczwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YCMgSW5zdGFsbCBhdXRoZW50aWNhdGlvbiBwYWNrYWdlc1xubnBtIGluc3RhbGwganNvbndlYnRva2VuIGJjcnlwdGpzXG5ucG0gaW5zdGFsbCBAdHlwZXMvanNvbndlYnRva2VuIEB0eXBlcy9iY3J5cHRqcyAtLXNhdmUtZGV2XG5cbiMgRm9yIE9BdXRoIChvcHRpb25hbClcbm5wbSBpbnN0YWxsIHBhc3Nwb3J0IHBhc3Nwb3J0LWdvb2dsZS1vYXV0aDIwIHBhc3Nwb3J0LWdpdGh1YjJgfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PjIuIEVudmlyb25tZW50IFZhcmlhYmxlczwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YCMgLmVudi5sb2NhbFxuSldUX1NFQ1JFVD15b3VyLXN1cGVyLXNlY3JldC1qd3Qta2V5LWhlcmVcbkpXVF9FWFBJUkVTX0lOPTdkXG5cbiMgT0F1dGggKG9wdGlvbmFsKVxuR09PR0xFX0NMSUVOVF9JRD15b3VyLWdvb2dsZS1jbGllbnQtaWRcbkdPT0dMRV9DTElFTlRfU0VDUkVUPXlvdXItZ29vZ2xlLWNsaWVudC1zZWNyZXRcbkdPT0dMRV9SRURJUkVDVF9VUkk9aHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9hdXRoL2dvb2dsZS9jYWxsYmFja1xuXG5HSVRIVUJfQ0xJRU5UX0lEPXlvdXItZ2l0aHViLWNsaWVudC1pZFxuR0lUSFVCX0NMSUVOVF9TRUNSRVQ9eW91ci1naXRodWItY2xpZW50LXNlY3JldGB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+My4gQ3JlYXRlIEF1dGggVXRpbGl0aWVzPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gbGliL2F1dGguanNcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVDtcbmNvbnN0IEpXVF9FWFBJUkVTX0lOID0gcHJvY2Vzcy5lbnYuSldUX0VYUElSRVNfSU4gfHwgJzdkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZCkge1xuICByZXR1cm4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZCkge1xuICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25Ub2tlbihwYXlsb2FkKSB7XG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBKV1RfU0VDUkVULCB7XG4gICAgZXhwaXJlc0luOiBKV1RfRVhQSVJFU19JTixcbiAgICBpc3N1ZXI6ICdpbmRqcy1hcHAnXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5VG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQsIHsgaXNzdWVyOiAnaW5kanMtYXBwJyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRva2VuRnJvbVJlcXVlc3QocmVxKSB7XG4gIC8vIENoZWNrIEF1dGhvcml6YXRpb24gaGVhZGVyXG4gIGxldCB0b2tlbiA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24/LnJlcGxhY2UoJ0JlYXJlciAnLCAnJyk7XG4gIFxuICAvLyBDaGVjayBjb29raWVzXG4gIGlmICghdG9rZW4gJiYgcmVxLmhlYWRlcnMuY29va2llKSB7XG4gICAgY29uc3QgY29va2llcyA9IHJlcS5oZWFkZXJzLmNvb2tpZS5zcGxpdCgnOycpLnJlZHVjZSgoYWNjLCBjb29raWUpID0+IHtcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGNvb2tpZS50cmltKCkuc3BsaXQoJz0nKTtcbiAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICB0b2tlbiA9IGNvb2tpZXMuYXV0aFRva2VuO1xuICB9XG4gIFxuICByZXR1cm4gdG9rZW47XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5Mb2dpbiAmIFJlZ2lzdHJhdGlvbjwvaDI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PlJlZ2lzdHJhdGlvbiBBUEk8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9hcGkvYXV0aC9yZWdpc3Rlci5qc1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCBzaWduVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9saWIvYXV0aCc7XG5pbXBvcnQgeyBjcmVhdGVVc2VyLCBnZXRVc2VyQnlFbWFpbCB9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoeyByZXEsIHJlcyB9KSB7XG4gIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcblxuICAgIC8vIFZhbGlkYXRpb25cbiAgICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgXG4gICAgICAgIGVycm9yOiAnTmFtZSwgZW1haWwsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnIFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IFxuICAgICAgICBlcnJvcjogJ1Bhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcnIFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBleGlzdHNcbiAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBnZXRVc2VyQnlFbWFpbChlbWFpbCk7XG4gICAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgZXhpc3RzJyB9KTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdXNlclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgY3JlYXRlVXNlcih7XG4gICAgICBuYW1lLFxuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICByb2xlOiAndXNlcidcbiAgICB9KTtcblxuICAgIC8vIEdlbmVyYXRlIHRva2VuXG4gICAgY29uc3QgdG9rZW4gPSBzaWduVG9rZW4oe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICByb2xlOiB1c2VyLnJvbGVcbiAgICB9KTtcblxuICAgIC8vIFNldCBzZWN1cmUgY29va2llXG4gICAgcmVzLnNldEhlYWRlcignU2V0LUNvb2tpZScsIFxuICAgICAgXFxgYXV0aFRva2VuPVxcJHt0b2tlbn07IEh0dHBPbmx5OyBTZWN1cmU7IFNhbWVTaXRlPVN0cmljdDsgTWF4LUFnZT02MDQ4MDA7IFBhdGg9L1xcYFxuICAgICk7XG5cbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgcm9sZTogdXNlci5yb2xlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdSZWdpc3RyYXRpb24gZXJyb3I6JywgZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdSZWdpc3RyYXRpb24gZmFpbGVkJyB9KTtcbiAgfVxufWB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+TG9naW4gQVBJPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvYXBpL2F1dGgvbG9naW4uanNcbmltcG9ydCB7IHZlcmlmeVBhc3N3b3JkLCBzaWduVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9saWIvYXV0aCc7XG5pbXBvcnQgeyBnZXRVc2VyQnlFbWFpbCB9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoeyByZXEsIHJlcyB9KSB7XG4gIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcblxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBcbiAgICAgICAgZXJyb3I6ICdFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJyBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEZpbmQgdXNlclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlFbWFpbChlbWFpbCk7XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgY3JlZGVudGlhbHMnIH0pO1xuICAgIH1cblxuICAgIC8vIFZlcmlmeSBwYXNzd29yZFxuICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB2ZXJpZnlQYXNzd29yZChwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgY3JlZGVudGlhbHMnIH0pO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHRva2VuXG4gICAgY29uc3QgdG9rZW4gPSBzaWduVG9rZW4oe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICByb2xlOiB1c2VyLnJvbGVcbiAgICB9KTtcblxuICAgIC8vIFNldCBzZWN1cmUgY29va2llXG4gICAgcmVzLnNldEhlYWRlcignU2V0LUNvb2tpZScsIFxuICAgICAgXFxgYXV0aFRva2VuPVxcJHt0b2tlbn07IEh0dHBPbmx5OyBTZWN1cmU7IFNhbWVTaXRlPVN0cmljdDsgTWF4LUFnZT02MDQ4MDA7IFBhdGg9L1xcYFxuICAgICk7XG5cbiAgICByZXMuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgcm9sZTogdXNlci5yb2xlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBlcnJvcjonLCBlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0xvZ2luIGZhaWxlZCcgfSk7XG4gIH1cbn1gfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PkF1dGhlbnRpY2F0aW9uIE1pZGRsZXdhcmU8L2gyPlxuICAgICAgICAgICAgPHAgc3R5bGU9e3VpLnB9PlxuICAgICAgICAgICAgICBQcm90ZWN0IHlvdXIgQVBJIHJvdXRlcyBhbmQgcGFnZXMgd2l0aCBhdXRoZW50aWNhdGlvbiBtaWRkbGV3YXJlOlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIGxpYi9taWRkbGV3YXJlL2F1dGguanNcbmltcG9ydCB7IHZlcmlmeVRva2VuLCBnZXRUb2tlbkZyb21SZXF1ZXN0IH0gZnJvbSAnLi4vYXV0aCc7XG5pbXBvcnQgeyBnZXRVc2VyQnlJZCB9IGZyb20gJy4uL2RhdGFiYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVBdXRoKGhhbmRsZXIpIHtcbiAgcmV0dXJuIGFzeW5jICh7IHJlcSwgcmVzLCAuLi5yZXN0IH0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbkZyb21SZXF1ZXN0KHJlcSk7XG4gICAgICBcbiAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdBdXRoZW50aWNhdGlvbiByZXF1aXJlZCcgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSB2ZXJpZnlUb2tlbih0b2tlbik7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5SWQoZGVjb2RlZC51c2VySWQpO1xuICAgICAgXG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB1c2VyIHRvIHJlcXVlc3RcbiAgICAgIHJlcS51c2VyID0gdXNlcjtcbiAgICAgIHJlcS50b2tlbiA9IHRva2VuO1xuXG4gICAgICByZXR1cm4gaGFuZGxlcih7IHJlcSwgcmVzLCAuLi5yZXN0IH0pO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnSW52YWxpZCB0b2tlbicgfSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVJvbGUocm9sZXMpIHtcbiAgcmV0dXJuIChoYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIHJlcXVpcmVBdXRoKGFzeW5jICh7IHJlcSwgcmVzLCAuLi5yZXN0IH0pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJSb2xlID0gcmVxLnVzZXIucm9sZTtcbiAgICAgIFxuICAgICAgaWYgKCFyb2xlcy5pbmNsdWRlcyh1c2VyUm9sZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHsgXG4gICAgICAgICAgZXJyb3I6ICdJbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMnIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhhbmRsZXIoeyByZXEsIHJlcywgLi4ucmVzdCB9KTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLy8gVXNhZ2UgZXhhbXBsZXM6XG4vLyBleHBvcnQgZGVmYXVsdCByZXF1aXJlQXV0aChteUhhbmRsZXIpO1xuLy8gZXhwb3J0IGRlZmF1bHQgcmVxdWlyZVJvbGUoWydhZG1pbicsICdtb2RlcmF0b3InXSkobXlIYW5kbGVyKTtgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PkNsaWVudC1TaWRlIEF1dGhlbnRpY2F0aW9uPC9oMj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+QXV0aCBDb250ZXh0ICYgSG9vazwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIGhvb2tzL3VzZUF1dGguanNcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjaGVja0F1dGhTdGF0dXMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNoZWNrQXV0aFN0YXR1cyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9hdXRoL21lJyk7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0VXNlcihkYXRhLnVzZXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBdXRoIGNoZWNrIGZhaWxlZDonLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBsb2dpbiA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9hdXRoL2xvZ2luJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldFVzZXIoZGF0YS51c2VyKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuZXJyb3IgfTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTG9naW4gZmFpbGVkJyB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoKCcvYXBpL2F1dGgvbG9nb3V0JywgeyBtZXRob2Q6ICdQT1NUJyB9KTtcbiAgICAgIHNldFVzZXIobnVsbCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ291dCBmYWlsZWQ6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jIChuYW1lLCBlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9hdXRoL3JlZ2lzdGVyJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0pXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldFVzZXIoZGF0YS51c2VyKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IuZXJyb3IgfTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUmVnaXN0cmF0aW9uIGZhaWxlZCcgfTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tcbiAgICAgIHVzZXIsXG4gICAgICBsb2FkaW5nLFxuICAgICAgbG9naW4sXG4gICAgICBsb2dvdXQsXG4gICAgICByZWdpc3RlcixcbiAgICAgIGlzQXV0aGVudGljYXRlZDogISF1c2VyXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUF1dGgoKSB7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gQXV0aFByb3ZpZGVyJyk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5Qcm90ZWN0ZWQgUm91dGUgQ29tcG9uZW50PC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gY29tcG9uZW50cy9Qcm90ZWN0ZWRSb3V0ZS5qc3hcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi9ob29rcy91c2VBdXRoJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ2luZGpzJztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvdGVjdGVkUm91dGUoeyBcbiAgY2hpbGRyZW4sIFxuICByZXF1aXJlZFJvbGUsIFxuICBmYWxsYmFjayA9IDxkaXY+TG9hZGluZy4uLjwvZGl2PiBcbn0pIHtcbiAgY29uc3QgeyB1c2VyLCBsb2FkaW5nLCBpc0F1dGhlbnRpY2F0ZWQgfSA9IHVzZUF1dGgoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWxvYWRpbmcgJiYgIWlzQXV0aGVudGljYXRlZCkge1xuICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgIH1cblxuICAgIGlmICghbG9hZGluZyAmJiByZXF1aXJlZFJvbGUgJiYgdXNlcj8ucm9sZSAhPT0gcmVxdWlyZWRSb2xlKSB7XG4gICAgICByb3V0ZXIucHVzaCgnL3VuYXV0aG9yaXplZCcpO1xuICAgIH1cbiAgfSwgW2xvYWRpbmcsIGlzQXV0aGVudGljYXRlZCwgdXNlciwgcmVxdWlyZWRSb2xlXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHJldHVybiBmYWxsYmFjaztcbiAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQpIHJldHVybiBudWxsO1xuICBpZiAocmVxdWlyZWRSb2xlICYmIHVzZXI/LnJvbGUgIT09IHJlcXVpcmVkUm9sZSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG4vLyBVc2FnZTpcbi8vIDxQcm90ZWN0ZWRSb3V0ZT5cbi8vICAgPERhc2hib2FyZCAvPlxuLy8gPC9Qcm90ZWN0ZWRSb3V0ZT5cbi8vXG4vLyA8UHJvdGVjdGVkUm91dGUgcmVxdWlyZWRSb2xlPVwiYWRtaW5cIj5cbi8vICAgPEFkbWluUGFuZWwgLz5cbi8vIDwvUHJvdGVjdGVkUm91dGU+YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5PQXV0aCBJbnRlZ3JhdGlvbjwvaDI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9Pkdvb2dsZSBPQXV0aCBTZXR1cDwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIHBhZ2VzL2FwaS9hdXRoL2dvb2dsZS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcih7IHJlcSwgcmVzIH0pIHtcbiAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgIHJlZGlyZWN0X3VyaTogcHJvY2Vzcy5lbnYuR09PR0xFX1JFRElSRUNUX1VSSSxcbiAgICByZXNwb25zZV90eXBlOiAnY29kZScsXG4gICAgc2NvcGU6ICdvcGVuaWQgZW1haWwgcHJvZmlsZScsXG4gICAgYWNjZXNzX3R5cGU6ICdvZmZsaW5lJ1xuICB9KTtcbiAgXG4gIGNvbnN0IGF1dGhVcmwgPSBcXGBodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdjIvYXV0aD9cXCR7cGFyYW1zfVxcYDtcbiAgcmVzLnJlZGlyZWN0KGF1dGhVcmwpO1xufVxuXG4vLyBwYWdlcy9hcGkvYXV0aC9nb29nbGUvY2FsbGJhY2suanNcbmltcG9ydCB7IHNpZ25Ub2tlbiB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9hdXRoJztcbmltcG9ydCB7IGZpbmRPckNyZWF0ZVVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvZGF0YWJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHsgcmVxLCByZXMgfSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgY29kZSB9ID0gcmVxLnF1ZXJ5O1xuICAgIFxuICAgIC8vIEV4Y2hhbmdlIGNvZGUgZm9yIHRva2Vuc1xuICAgIGNvbnN0IHRva2VuUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXG4gICAgICBib2R5OiBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgICBjbGllbnRfc2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgZ3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZScsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogcHJvY2Vzcy5lbnYuR09PR0xFX1JFRElSRUNUX1VSSVxuICAgICAgfSlcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0b2tlblJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICAvLyBHZXQgdXNlciBpbmZvXG4gICAgY29uc3QgdXNlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBcXGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjIvdXNlcmluZm8/YWNjZXNzX3Rva2VuPVxcJHt0b2tlbnMuYWNjZXNzX3Rva2VufVxcYFxuICAgICk7XG4gICAgY29uc3QgZ29vZ2xlVXNlciA9IGF3YWl0IHVzZXJSZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgLy8gRmluZCBvciBjcmVhdGUgdXNlclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBmaW5kT3JDcmVhdGVVc2VyKHtcbiAgICAgIGVtYWlsOiBnb29nbGVVc2VyLmVtYWlsLFxuICAgICAgbmFtZTogZ29vZ2xlVXNlci5uYW1lLFxuICAgICAgYXZhdGFyOiBnb29nbGVVc2VyLnBpY3R1cmUsXG4gICAgICBwcm92aWRlcjogJ2dvb2dsZScsXG4gICAgICBwcm92aWRlcklkOiBnb29nbGVVc2VyLmlkXG4gICAgfSk7XG4gICAgXG4gICAgLy8gR2VuZXJhdGUgSldUXG4gICAgY29uc3QgdG9rZW4gPSBzaWduVG9rZW4oe1xuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICByb2xlOiB1c2VyLnJvbGVcbiAgICB9KTtcbiAgICBcbiAgICAvLyBTZXQgY29va2llIGFuZCByZWRpcmVjdFxuICAgIHJlcy5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCBcbiAgICAgIFxcYGF1dGhUb2tlbj1cXCR7dG9rZW59OyBIdHRwT25seTsgU2VjdXJlOyBTYW1lU2l0ZT1TdHJpY3Q7IE1heC1BZ2U9NjA0ODAwOyBQYXRoPS9cXGBcbiAgICApO1xuICAgIHJlcy5yZWRpcmVjdCgnL2Rhc2hib2FyZCcpO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBPQXV0aCBlcnJvcjonLCBlcnJvcik7XG4gICAgcmVzLnJlZGlyZWN0KCcvbG9naW4/ZXJyb3I9b2F1dGhfZmFpbGVkJyk7XG4gIH1cbn1gfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zdWNjZXNzfT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnN1Y2Nlc3NUaXRsZX0+XHUyNzA1IEJlc3QgUHJhY3RpY2VzPC9kaXY+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3sgbWFyZ2luOiAwLCBmb250U2l6ZTogMTQsIGNvbG9yOiAnIzE1ODAzZCcgfX0+XG4gICAgICAgICAgICAgIDxsaT5BbHdheXMgdXNlIEhUVFBTIGluIHByb2R1Y3Rpb248L2xpPlxuICAgICAgICAgICAgICA8bGk+U3RvcmUgc2VjcmV0cyBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZXM8L2xpPlxuICAgICAgICAgICAgICA8bGk+VXNlIEhUVFAtb25seSBjb29raWVzIGZvciB0b2tlbiBzdG9yYWdlPC9saT5cbiAgICAgICAgICAgICAgPGxpPkltcGxlbWVudCBwcm9wZXIgcGFzc3dvcmQgaGFzaGluZyAoYmNyeXB0IHdpdGggc2FsdCByb3VuZHMgXHUyMjY1IDEyKTwvbGk+XG4gICAgICAgICAgICAgIDxsaT5BZGQgcmF0ZSBsaW1pdGluZyB0byBhdXRoZW50aWNhdGlvbiBlbmRwb2ludHM8L2xpPlxuICAgICAgICAgICAgICA8bGk+VmFsaWRhdGUgYW5kIHNhbml0aXplIGFsbCB1c2VyIGlucHV0czwvbGk+XG4gICAgICAgICAgICAgIDxsaT5JbXBsZW1lbnQgcHJvcGVyIHNlc3Npb24gbWFuYWdlbWVudCBhbmQgY2xlYW51cDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Vc2UgQ1NSRiBwcm90ZWN0aW9uIGZvciBzZXNzaW9uLWJhc2VkIGF1dGhlbnRpY2F0aW9uPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9Pk5leHQgU3RlcHM8L2gyPlxuICAgICAgICAgICAgPHVsIHN0eWxlPXt1aS51bH0+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17dWkubGl9PlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvZG9jcy9kYXRhYmFzZVwiIHN0eWxlPXt7IGNvbG9yOiAnIzBlYTVlOScgfX0+XG4gICAgICAgICAgICAgICAgICBTZXQgdXAgZGF0YWJhc2UgaW50ZWdyYXRpb24gZm9yIHVzZXIgc3RvcmFnZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXt1aS5saX0+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9kb2NzL2FwaS1yb3V0ZXNcIiBzdHlsZT17eyBjb2xvcjogJyMwZWE1ZTknIH19PlxuICAgICAgICAgICAgICAgICAgTGVhcm4gbW9yZSBhYm91dCBBUEkgcm91dGVzIGFuZCBtaWRkbGV3YXJlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2RvY3MvZGVwbG95bWVudFwiIHN0eWxlPXt7IGNvbG9yOiAnIzBlYTVlOScgfX0+XG4gICAgICAgICAgICAgICAgICBEZXBsb3kgeW91ciBhdXRoZW50aWNhdGVkIGFwcCBzZWN1cmVseVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXt1aS5saX0+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9kb2NzL3Rlc3RpbmdcIiBzdHlsZT17eyBjb2xvcjogJyMwZWE1ZTknIH19PlxuICAgICAgICAgICAgICAgICAgVGVzdCB5b3VyIGF1dGhlbnRpY2F0aW9uIGZsb3dzXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sV0FBVztBQXVJTixjQUtGLFlBTEU7QUFySUcsU0FBUixPQUF3QjtBQUM3QixRQUFNLEtBQUs7QUFBQSxJQUNULE1BQU07QUFBQSxNQUNKLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxjQUFjO0FBQUEsSUFDaEI7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLFVBQVU7QUFBQSxJQUNaO0FB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
