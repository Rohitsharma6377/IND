# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of INDJS seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please DO NOT:

- Open a public GitHub issue
- Disclose the vulnerability publicly before it has been addressed

### Please DO:

1. **Email us directly** at: **netcurion@outlook.com**
2. Include the following information:
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability
   - Suggested fix (if available)

### What to Expect:

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Communication**: We will keep you informed about the progress of fixing the vulnerability
- **Timeline**: We aim to patch critical vulnerabilities within 7 days
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using INDJS in production, we recommend:

### 1. Environment Variables
```bash
# Never commit .env files
# Use strong secrets
JWT_SECRET=<strong-random-secret>
DATABASE_URL=<secure-connection-string>
REVALIDATE_SECRET=<strong-random-secret>
```

### 2. Authentication
```javascript
// Use strong JWT secrets
Auth.configure({
  secret: process.env.JWT_SECRET, // At least 32 characters
  expiresIn: '7d',
  algorithm: 'HS256'
});
```

### 3. Database Security
```javascript
// Always use parameterized queries
Database.query('SELECT * FROM users WHERE id = ?', [userId]);

// Never concatenate user input
// ❌ BAD: Database.query(`SELECT * FROM users WHERE id = ${userId}`);
```

### 4. API Routes
```javascript
// Validate and sanitize input
export async function post({ body }) {
  // Validate
  if (!body.email || !isValidEmail(body.email)) {
    return { error: 'Invalid email' };
  }
  
  // Sanitize
  const sanitized = sanitizeInput(body);
  
  // Process
  return await processData(sanitized);
}
```

### 5. Rate Limiting
```javascript
// Configure rate limiting in production
export default {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};
```

### 6. CORS Configuration
```javascript
// Configure CORS properly
export default {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true
  }
};
```

### 7. Security Headers
```javascript
// Helmet is enabled by default in production
// Configure additional headers if needed
export default {
  security: {
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"]
        }
      }
    }
  }
};
```

### 8. Dependencies
```bash
# Regularly update dependencies
npm audit
npm audit fix

# Check for vulnerabilities
npm run audit
```

### 9. Production Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT secrets
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable security headers (Helmet)
- [ ] Validate and sanitize all user input
- [ ] Use parameterized database queries
- [ ] Keep dependencies up to date
- [ ] Enable logging and monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Regular security audits
- [ ] Implement proper authentication and authorization
- [ ] Use CSRF protection for forms
- [ ] Implement proper session management

## Known Security Features

INDJS includes the following security features by default:

- ✅ **Helmet** - Security headers
- ✅ **CORS** - Cross-Origin Resource Sharing protection
- ✅ **Rate Limiting** - DDoS protection
- ✅ **Input Validation** - Built-in validation utilities
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Protection** - React's built-in XSS protection
- ✅ **CSRF Protection** - Token-based CSRF protection
- ✅ **Password Hashing** - bcrypt for password hashing
- ✅ **JWT Security** - Secure token generation and validation
- ✅ **Session Security** - Secure session management

## Security Updates

We will announce security updates through:

1. GitHub Security Advisories
2. Release notes in CHANGELOG.md
3. NPM package updates
4. Email notifications (if you're subscribed)

## Bug Bounty Program

We currently do not have a bug bounty program, but we greatly appreciate security researchers who responsibly disclose vulnerabilities.

## Contact

For security concerns, please email: **netcurion@outlook.com**

For general questions, use GitHub Discussions or Issues.

---

**Last Updated**: December 8, 2025

Thank you for helping keep INDJS and our users safe! 🔒
