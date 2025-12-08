# Full-Stack SaaS Template

A complete SaaS application template with authentication, database, payments, and admin dashboard.

## Features

- ✅ User Authentication (JWT + OAuth)
- ✅ Database Integration (PostgreSQL/MongoDB)
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Subscription Plans
- ✅ Payment Integration (Stripe ready)
- ✅ Email Notifications
- ✅ API Routes
- ✅ Role-Based Access Control
- ✅ Responsive Design
- ✅ Dark Mode Support

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Project Structure

```
├── pages/
│   ├── index.jsx              # Landing page
│   ├── login.jsx              # Login page
│   ├── signup.jsx             # Signup page
│   ├── dashboard.jsx          # User dashboard
│   ├── admin/
│   │   ├── index.jsx          # Admin dashboard
│   │   └── users.jsx          # User management
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js       # Login API
│   │   │   ├── signup.js      # Signup API
│   │   │   └── logout.js      # Logout API
│   │   ├── users/
│   │   │   ├── index.js       # List users
│   │   │   └── [id].js        # User CRUD
│   │   └── subscriptions/
│   │       └── index.js       # Subscription management
│   └── _layout.jsx            # Global layout
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AuthGuard.jsx
│   └── AdminGuard.jsx
├── lib/
│   ├── db.js                  # Database client
│   ├── auth.js                # Auth utilities
│   └── email.js               # Email utilities
└── styles/
    └── globals.css
```

## Usage

### Authentication

```javascript
import { Auth } from 'indjs';

// Login
const token = await Auth.login(email, password);

// Signup
const user = await Auth.signup({ email, password, name });

// Logout
Auth.logout();
```

### Database

```javascript
import { Database } from 'indjs';

// Query users
const users = await Database.query('SELECT * FROM users');

// Create user
const user = await Database.query(
  'INSERT INTO users (email, name) VALUES (?, ?)',
  [email, name]
);
```

### Protected Routes

```javascript
import { AuthGuard } from '../components/AuthGuard';

export default function Dashboard() {
  return (
    <AuthGuard>
      <h1>Dashboard</h1>
    </AuthGuard>
  );
}
```

## Deployment

```bash
# Deploy to Vercel
indjs deploy vercel

# Deploy to Netlify
indjs deploy netlify

# Deploy with Docker
indjs deploy docker
```

## License

MIT
