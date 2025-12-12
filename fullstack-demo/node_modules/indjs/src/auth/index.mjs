import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Default configuration
const defaultConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '7d',
  saltRounds: 12,
  cookieName: 'indjs-token',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};

let authConfig = { ...defaultConfig };

// Configure authentication
export function configure(config = {}) {
  authConfig = { ...defaultConfig, ...config };
}

// Password utilities
export async function hashPassword(password) {
  return bcrypt.hash(password, authConfig.saltRounds);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Token utilities
export function generateToken(payload) {
  return jwt.sign(payload, authConfig.secret, {
    expiresIn: authConfig.expiresIn
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, authConfig.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Generate secure random tokens
export function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Session management
export function setAuthCookie(res, token) {
  res.cookie(authConfig.cookieName, token, authConfig.cookieOptions);
}

export function clearAuthCookie(res) {
  res.clearCookie(authConfig.cookieName);
}

export function getTokenFromRequest(req) {
  // Try to get token from cookie first
  let token = req.cookies?.[authConfig.cookieName];
  
  // If not in cookie, try Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  return token;
}

// Middleware for protecting routes
export function requireAuth(options = {}) {
  return async function authMiddleware({ req, res }) {
    try {
      const token = getTokenFromRequest(req);
      
      if (!token) {
        if (options.redirect) {
          res.redirect(options.redirect);
          return false;
        }
        res.status(401).json({ error: 'Authentication required' });
        return false;
      }
      
      const decoded = verifyToken(token);
      req.user = decoded;
      
      // Check for role-based access
      if (options.roles && !options.roles.includes(decoded.role)) {
        res.status(403).json({ error: 'Insufficient permissions' });
        return false;
      }
      
      return true;
    } catch (error) {
      if (options.redirect) {
        res.redirect(options.redirect);
        return false;
      }
      res.status(401).json({ error: 'Invalid token' });
      return false;
    }
  };
}

// Optional auth middleware (doesn't block if no token)
export function optionalAuth() {
  return async function optionalAuthMiddleware({ req, res }) {
    try {
      const token = getTokenFromRequest(req);
      if (token) {
        const decoded = verifyToken(token);
        req.user = decoded;
      }
      return true;
    } catch (error) {
      // Ignore token errors for optional auth
      return true;
    }
  };
}

// User session utilities
export class UserSession {
  constructor(user) {
    this.user = user;
    this.createdAt = new Date();
    this.lastActivity = new Date();
  }
  
  updateActivity() {
    this.lastActivity = new Date();
  }
  
  isExpired(maxAge = 24 * 60 * 60 * 1000) { // 24 hours default
    return Date.now() - this.lastActivity.getTime() > maxAge;
  }
  
  toJSON() {
    return {
      user: this.user,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity
    };
  }
}

// In-memory session store (use Redis or database in production)
const sessions = new Map();

export function createSession(user) {
  const sessionId = generateSecureToken();
  const session = new UserSession(user);
  sessions.set(sessionId, session);
  return sessionId;
}

export function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (session && !session.isExpired()) {
    session.updateActivity();
    return session;
  }
  if (session) {
    sessions.delete(sessionId);
  }
  return null;
}

export function destroySession(sessionId) {
  return sessions.delete(sessionId);
}

export function cleanExpiredSessions() {
  for (const [id, session] of sessions.entries()) {
    if (session.isExpired()) {
      sessions.delete(id);
    }
  }
}

// OAuth helpers
export class OAuthProvider {
  constructor(config) {
    this.name = config.name;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    this.scope = config.scope || [];
    this.authUrl = config.authUrl;
    this.tokenUrl = config.tokenUrl;
    this.userUrl = config.userUrl;
  }
  
  getAuthUrl(state) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope.join(' '),
      response_type: 'code',
      state
    });
    
    return `${this.authUrl}?${params.toString()}`;
  }
  
  async exchangeCodeForToken(code) {
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
        grant_type: 'authorization_code'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }
    
    return response.json();
  }
  
  async getUserInfo(accessToken) {
    const response = await fetch(this.userUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    
    return response.json();
  }
}

// Predefined OAuth providers
export const providers = {
  google: (config) => new OAuthProvider({
    name: 'google',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: ['openid', 'email', 'profile'],
    ...config
  }),
  
  github: (config) => new OAuthProvider({
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userUrl: 'https://api.github.com/user',
    scope: ['user:email'],
    ...config
  }),
  
  discord: (config) => new OAuthProvider({
    name: 'discord',
    authUrl: 'https://discord.com/api/oauth2/authorize',
    tokenUrl: 'https://discord.com/api/oauth2/token',
    userUrl: 'https://discord.com/api/users/@me',
    scope: ['identify', 'email'],
    ...config
  })
};

// Rate limiting for auth endpoints
const rateLimitStore = new Map();

export function rateLimit(options = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 5, // 5 attempts
    keyGenerator = (req) => req.ip || req.connection.remoteAddress
  } = options;
  
  return async function rateLimitMiddleware({ req, res }) {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create rate limit data
    let rateLimitData = rateLimitStore.get(key) || { attempts: [], blocked: false };
    
    // Remove old attempts
    rateLimitData.attempts = rateLimitData.attempts.filter(time => time > windowStart);
    
    // Check if blocked
    if (rateLimitData.attempts.length >= max) {
      res.status(429).json({
        error: 'Too many attempts',
        retryAfter: Math.ceil((rateLimitData.attempts[0] + windowMs - now) / 1000)
      });
      return false;
    }
    
    // Add current attempt
    rateLimitData.attempts.push(now);
    rateLimitStore.set(key, rateLimitData);
    
    return true;
  };
}

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.attempts.length === 0 || data.attempts[data.attempts.length - 1] < now - 60 * 60 * 1000) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes

// Export all utilities
export default {
  configure,
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  generateSecureToken,
  setAuthCookie,
  clearAuthCookie,
  getTokenFromRequest,
  requireAuth,
  optionalAuth,
  UserSession,
  createSession,
  getSession,
  destroySession,
  cleanExpiredSessions,
  OAuthProvider,
  providers,
  rateLimit
};
