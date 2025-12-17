import React from "react";

export default function Auth() {
  const ui = {
    page: {
      fontFamily:
        "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      minHeight: "100vh",
      margin: 0,
      background: "linear-gradient(180deg, #0ea5e9 0%, #111827 60%)",
      color: "#0f172a",
    },
    wrap: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "48px 20px",
    },
    hero: {
      background: "white",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: "#0b1220",
    },
    nav: {
      marginBottom: 20,
    },
    backLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14,
    },
    section: {
      marginBottom: 32,
    },
    h2: {
      fontSize: 24,
      color: "#0b1220",
      marginBottom: 16,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: 8,
    },
    h3: {
      fontSize: 20,
      color: "#0b1220",
      marginBottom: 12,
      marginTop: 24,
    },
    p: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
    },
    ul: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20,
    },
    li: {
      marginBottom: 8,
    },
    code: {
      background: "#f1f5f9",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "monospace",
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
      lineHeight: 1.5,
    },
    warning: {
      background: "#fef3c7",
      border: "1px solid #f59e0b",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
    },
    warningTitle: {
      fontWeight: 600,
      color: "#92400e",
      marginBottom: 8,
    },
    success: {
      background: "#dcfce7",
      border: "1px solid #16a34a",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
    },
    successTitle: {
      fontWeight: 600,
      color: "#15803d",
      marginBottom: 8,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 20,
      marginBottom: 32,
    },
    card: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: 8,
      padding: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#0b1220",
      marginBottom: 12,
    },
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>
              ← Back to Documentation
            </a>
          </nav>

          <h1 style={ui.h1}>Authentication Guide</h1>

          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS provides a comprehensive authentication system with built-in
              support for JWT tokens, OAuth providers, session management, and
              role-based access control. This guide will help you implement
              secure authentication in your INDJS application.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Authentication Methods</h2>
            <div style={ui.grid}>
              <div style={ui.card}>
                <div style={ui.cardTitle}>🔐 JWT Authentication</div>
                <p style={{ ...ui.p, marginBottom: 0 }}>
                  Stateless token-based authentication perfect for APIs and
                  SPAs. Includes automatic token refresh and secure cookie
                  storage.
                </p>
              </div>
              <div style={ui.card}>
                <div style={ui.cardTitle}>🌐 OAuth Integration</div>
                <p style={{ ...ui.p, marginBottom: 0 }}>
                  Built-in support for Google, GitHub, Facebook, and custom
                  OAuth providers. Simplified setup with automatic user profile
                  management.
                </p>
              </div>
              <div style={ui.card}>
                <div style={ui.cardTitle}>🍪 Session-Based Auth</div>
                <p style={{ ...ui.p, marginBottom: 0 }}>
                  Traditional server-side sessions with secure cookie
                  management. Ideal for server-rendered applications.
                </p>
              </div>
              <div style={ui.card}>
                <div style={ui.cardTitle}>👥 Role-Based Access</div>
                <p style={{ ...ui.p, marginBottom: 0 }}>
                  Flexible role and permission system with middleware support.
                  Protect routes and API endpoints based on user roles.
                </p>
              </div>
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Quick Setup</h2>
            <p style={ui.p}>
              Get authentication up and running in your INDJS app with these
              simple steps:
            </p>

            <h3 style={ui.h3}>1. Install Dependencies</h3>
            <div style={ui.codeBlock}>
              {`# Install authentication packages
npm install jsonwebtoken bcryptjs
npm install @types/jsonwebtoken @types/bcryptjs --save-dev

# For OAuth (optional)
npm install passport passport-google-oauth20 passport-github2`}
            </div>

            <h3 style={ui.h3}>2. Environment Variables</h3>
            <div style={ui.codeBlock}>
              {`# .env.local
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret`}
            </div>

            <h3 style={ui.h3}>3. Create Auth Utilities</h3>
            <div style={ui.codeBlock}>
              {`// lib/auth.js
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Login & Registration</h2>

            <h3 style={ui.h3}>Registration API</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/auth/register.js
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
}`}
            </div>

            <h3 style={ui.h3}>Login API</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/auth/login.js
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Authentication Middleware</h2>
            <p style={ui.p}>
              Protect your API routes and pages with authentication middleware:
            </p>

            <div style={ui.codeBlock}>
              {`// lib/middleware/auth.js
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
// export default requireRole(['admin', 'moderator'])(myHandler);`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Client-Side Authentication</h2>

            <h3 style={ui.h3}>Auth Context & Hook</h3>
            <div style={ui.codeBlock}>
              {`// hooks/useAuth.js
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
}`}
            </div>

            <h3 style={ui.h3}>Protected Route Component</h3>
            <div style={ui.codeBlock}>
              {`// components/ProtectedRoute.jsx
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
// </ProtectedRoute>`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>OAuth Integration</h2>

            <h3 style={ui.h3}>Google OAuth Setup</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/auth/google.js
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
}`}
            </div>
          </div>

          <div style={ui.success}>
            <div style={ui.successTitle}>✅ Best Practices</div>
            <ul style={{ margin: 0, fontSize: 14, color: "#15803d" }}>
              <li>Always use HTTPS in production</li>
              <li>Store secrets in environment variables</li>
              <li>Use HTTP-only cookies for token storage</li>
              <li>
                Implement proper password hashing (bcrypt with salt rounds ≥ 12)
              </li>
              <li>Add rate limiting to authentication endpoints</li>
              <li>Validate and sanitize all user inputs</li>
              <li>Implement proper session management and cleanup</li>
              <li>Use CSRF protection for session-based authentication</li>
            </ul>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Next Steps</h2>
            <ul style={ui.ul}>
              <li style={ui.li}>
                <a href="/docs/database" style={{ color: "#0ea5e9" }}>
                  Set up database integration for user storage
                </a>
              </li>
              <li style={ui.li}>
                <a href="/docs/api-routes" style={{ color: "#0ea5e9" }}>
                  Learn more about API routes and middleware
                </a>
              </li>
              <li style={ui.li}>
                <a href="/docs/deployment" style={{ color: "#0ea5e9" }}>
                  Deploy your authenticated app securely
                </a>
              </li>
              <li style={ui.li}>
                <a href="/docs/testing" style={{ color: "#0ea5e9" }}>
                  Test your authentication flows
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
