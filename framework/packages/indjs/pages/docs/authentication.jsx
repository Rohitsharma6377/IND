import React from "react";

export default function Authentication() {
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

          <h1 style={ui.h1}>Authentication</h1>

          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS provides built-in authentication utilities supporting JWT
              tokens, OAuth providers, and session-based authentication. The
              auth system is flexible and can be customized for your needs.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>JWT Authentication</h2>
            <p style={ui.p}>
              JSON Web Tokens (JWT) provide a stateless way to authenticate
              users. INDJS includes utilities for creating, verifying, and
              managing JWT tokens.
            </p>

            <h3 style={ui.h3}>Basic JWT Setup</h3>
            <div style={ui.codeBlock}>
              {`// lib/auth/jwt.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'indjs-app',
    audience: 'indjs-users'
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'indjs-app',
      audience: 'indjs-users'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function refreshToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    const { iat, exp, ...payload } = decoded;
    
    // Check if token is not too old (e.g., within 30 days)
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);
    if (iat < thirtyDaysAgo) {
      throw new Error('Token too old to refresh');
    }
    
    return signToken(payload);
  } catch (error) {
    throw new Error('Cannot refresh token');
  }
}`}
            </div>

            <h3 style={ui.h3}>Login API Route</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/auth/login.js
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth/jwt';
import { getUserByEmail } from '../../../lib/database/users';

export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Find user in database
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', \`token=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`);
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}`}
            </div>

            <h3 style={ui.h3}>Registration API Route</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/auth/register.js
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth/jwt';
import { createUser, getUserByEmail } from '../../../lib/database/users';

export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = await createUser({
      name,
      email,
      passwordHash,
      role: 'user'
    });
    
    // Create JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', \`token=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`);
    
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Authentication Middleware</h2>
            <p style={ui.p}>
              Create middleware to protect routes and verify authentication:
            </p>

            <div style={ui.codeBlock}>
              {`// lib/middleware/auth.js
import { verifyToken } from '../auth/jwt';
import { getUserById } from '../database/users';

export function requireAuth(handler) {
  return async ({ req, res, ...rest }) => {
    try {
      // Get token from header or cookie
      let token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        token = cookies.token;
      }
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      // Verify token
      const decoded = verifyToken(token);
      
      // Get user from database
      const user = await getUserById(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      
      // Add user to request
      req.user = user;
      req.token = token;
      
      return handler({ req, res, ...rest });
      
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export function requireRole(roles) {
  return (handler) => {
    return requireAuth(async ({ req, res, ...rest }) => {
      const userRole = req.user.role;
      
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      return handler({ req, res, ...rest });
    });
  };
}

// Usage in API routes
// pages/api/admin/users.js
import { requireRole } from '../../../lib/middleware/auth';

async function handler({ req, res }) {
  // This handler only runs for admin users
  const users = await getAllUsers();
  res.json(users);
}

export default requireRole(['admin'])(handler);`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>OAuth Integration</h2>
            <p style={ui.p}>
              Integrate with OAuth providers like Google, GitHub, and Facebook:
            </p>

            <h3 style={ui.h3}>Google OAuth</h3>
            <div style={ui.codeBlock}>
              {`// lib/auth/oauth.js
export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\`;
}

export async function exchangeGoogleCode(code) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    }),
  });
  
  return response.json();
}

export async function getGoogleUserInfo(accessToken) {
  const response = await fetch(\`https://www.googleapis.com/oauth2/v2/userinfo?access_token=\${accessToken}\`);
  return response.json();
}

// pages/api/auth/google.js
import { getGoogleAuthUrl } from '../../../lib/auth/oauth';

export default function handler({ req, res }) {
  const authUrl = getGoogleAuthUrl();
  res.redirect(authUrl);
}

// pages/api/auth/google/callback.js
import { exchangeGoogleCode, getGoogleUserInfo } from '../../../../lib/auth/oauth';
import { signToken } from '../../../../lib/auth/jwt';
import { findOrCreateUser } from '../../../../lib/database/users';

export default async function handler({ req, res }) {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }
    
    // Exchange code for tokens
    const tokens = await exchangeGoogleCode(code);
    
    // Get user info
    const googleUser = await getGoogleUserInfo(tokens.access_token);
    
    // Find or create user in database
    const user = await findOrCreateUser({
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      provider: 'google',
      providerId: googleUser.id
    });
    
    // Create JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    // Set cookie and redirect
    res.setHeader('Set-Cookie', \`token=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/\`);
    res.redirect('/dashboard');
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Session-Based Authentication</h2>
            <p style={ui.p}>
              For applications that prefer server-side sessions:
            </p>

            <div style={ui.codeBlock}>
              {`// lib/auth/session.js
import { randomBytes } from 'crypto';
import { createSession, getSession, deleteSession } from '../database/sessions';

export async function createUserSession(userId) {
  const sessionId = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await createSession({
    id: sessionId,
    userId,
    expiresAt
  });
  
  return sessionId;
}

export async function validateSession(sessionId) {
  if (!sessionId) return null;
  
  const session = await getSession(sessionId);
  
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await deleteSession(sessionId);
    }
    return null;
  }
  
  return session;
}

export async function destroySession(sessionId) {
  await deleteSession(sessionId);
}

// Session middleware
export function requireSession(handler) {
  return async ({ req, res, ...rest }) => {
    const sessionId = req.headers.cookie
      ?.split(';')
      .find(c => c.trim().startsWith('sessionId='))
      ?.split('=')[1];
    
    const session = await validateSession(sessionId);
    
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    
    req.session = session;
    req.user = session.user;
    
    return handler({ req, res, ...rest });
  };
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Client-Side Authentication</h2>
            <p style={ui.p}>
              Create React hooks and components for authentication state
              management:
            </p>

            <div style={ui.codeBlock}>
              {`// hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  };
  
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
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
}

// components/ProtectedRoute.jsx
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'indjs';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, requiredRole }) {
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
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }
  
  return children;
}

// Usage in pages
// pages/dashboard.jsx
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This page requires authentication</p>
      </div>
    </ProtectedRoute>
  );
}

// pages/admin.jsx
import ProtectedRoute from '../components/ProtectedRoute';

export default function Admin() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Panel</h1>
        <p>This page requires admin role</p>
      </div>
    </ProtectedRoute>
  );
}`}
            </div>
          </div>

          <div style={ui.warning}>
            <div style={ui.warningTitle}>🔒 Security Best Practices</div>
            <ul style={{ margin: 0, fontSize: 14, color: "#92400e" }}>
              <li>Always use HTTPS in production</li>
              <li>Store JWT secrets securely (environment variables)</li>
              <li>Use HTTP-only cookies for token storage</li>
              <li>Implement proper password hashing (bcrypt)</li>
              <li>Add rate limiting to auth endpoints</li>
              <li>Validate and sanitize all inputs</li>
              <li>Implement proper session management</li>
              <li>Use CSRF protection for session-based auth</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
