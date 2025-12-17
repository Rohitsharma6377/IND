import React from "react";

export default function Testing() {
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
    info: {
      background: "#dbeafe",
      border: "1px solid #3b82f6",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
    },
    infoTitle: {
      fontWeight: 600,
      color: "#1e40af",
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

          <h1 style={ui.h1}>Testing</h1>

          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS includes comprehensive testing utilities built on Vitest and
              Playwright. Write unit tests, integration tests, and end-to-end
              tests with confidence.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Unit Testing with Vitest</h2>
            <p style={ui.p}>
              Vitest provides a fast and modern testing experience with built-in
              TypeScript support.
            </p>

            <h3 style={ui.h3}>Basic Test Setup</h3>
            <div style={ui.codeBlock}>
              {`# Install testing dependencies (already included in INDJS)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    globals: true
  }
});

# tests/setup.js
import '@testing-library/jest-dom';`}
            </div>

            <h3 style={ui.h3}>Component Testing</h3>
            <div style={ui.codeBlock}>
              {`// components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies correct CSS classes', () => {
    render(<Button variant="primary" size="large">Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-large');
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});`}
            </div>

            <h3 style={ui.h3}>Hook Testing</h3>
            <div style={ui.codeBlock}>
              {`// hooks/useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>API Route Testing</h2>
            <p style={ui.p}>
              Test your API routes with HTTP requests and mock databases.
            </p>

            <div style={ui.codeBlock}>
              {`// tests/api/users.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/users';
import * as userService from '../../lib/services/userService';

// Mock the user service
vi.mock('../../lib/services/userService');

describe('/api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('GET /api/users', () => {
    it('returns list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      
      userService.getAllUsers.mockResolvedValue(mockUsers);
      
      const { req, res } = createMocks({
        method: 'GET'
      });
      
      await handler({ req, res });
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(mockUsers);
    });
    
    it('handles database errors', async () => {
      userService.getAllUsers.mockRejectedValue(new Error('Database error'));
      
      const { req, res } = createMocks({
        method: 'GET'
      });
      
      await handler({ req, res });
      
      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Internal server error'
      });
    });
  });
  
  describe('POST /api/users', () => {
    it('creates a new user', async () => {
      const newUser = { name: 'New User', email: 'new@example.com' };
      const createdUser = { id: 3, ...newUser };
      
      userService.createUser.mockResolvedValue(createdUser);
      
      const { req, res } = createMocks({
        method: 'POST',
        body: newUser
      });
      
      await handler({ req, res });
      
      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
    
    it('validates required fields', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { name: 'No Email' } // Missing email
      });
      
      await handler({ req, res });
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Email is required'
      });
    });
  });
});`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Integration Testing</h2>
            <p style={ui.p}>
              Test complete user flows and component interactions.
            </p>

            <div style={ui.codeBlock}>
              {`// tests/integration/auth.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider } from '../../contexts/AuthContext';
import LoginForm from '../../components/LoginForm';
import Dashboard from '../../pages/dashboard';

// Mock fetch
global.fetch = vi.fn();

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  
  it('logs in user and redirects to dashboard', async () => {
    // Mock successful login response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        user: { id: 1, name: 'John Doe', email: 'john@example.com' },
        token: 'fake-jwt-token'
      })
    });
    
    renderWithAuth(<LoginForm />);
    
    // Fill in login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'john@example.com',
          password: 'password123'
        })
      });
    });
    
    // Verify user is logged in
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
    });
  });
  
  it('shows error message on failed login', async () => {
    // Mock failed login response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Invalid credentials'
      })
    });
    
    renderWithAuth(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>End-to-End Testing with Playwright</h2>
            <p style={ui.p}>
              Test your application from a user's perspective with real browser
              automation.
            </p>

            <h3 style={ui.h3}>Playwright Configuration</h3>
            <div style={ui.codeBlock}>
              {`// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});`}
            </div>

            <h3 style={ui.h3}>E2E Test Examples</h3>
            <div style={ui.codeBlock}>
              {`// e2e/auth.spec.js
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign up and log in', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
    
    // Fill signup form
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    
    // Submit form
    await page.click('[data-testid="signup-button"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome, Test User');
    
    // Log out
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL('/');
    
    // Log back in
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Should be logged in again
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome, Test User');
  });
  
  test('shows error for invalid login', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'wrong@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]'))
      .toContainText('Invalid credentials');
  });
});

// e2e/blog.spec.js
import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('user can create and view blog posts', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-button"]');
    
    // Navigate to create post
    await page.goto('/admin/posts/new');
    
    // Fill post form
    await page.fill('[data-testid="title-input"]', 'My Test Post');
    await page.fill('[data-testid="content-textarea"]', 'This is the content of my test post.');
    await page.check('[data-testid="published-checkbox"]');
    
    // Submit form
    await page.click('[data-testid="save-button"]');
    
    // Should redirect to post view
    await expect(page.locator('h1')).toContainText('My Test Post');
    await expect(page.locator('[data-testid="post-content"]'))
      .toContainText('This is the content of my test post.');
    
    // Check that post appears in blog listing
    await page.goto('/blog');
    await expect(page.locator('[data-testid="post-title"]').first())
      .toContainText('My Test Post');
  });
  
  test('pagination works correctly', async ({ page }) => {
    await page.goto('/blog');
    
    // Check first page
    await expect(page.locator('[data-testid="post-item"]')).toHaveCount(10);
    
    // Go to next page
    await page.click('[data-testid="next-page-button"]');
    await expect(page).toHaveURL('/blog?page=2');
    
    // Go back to first page
    await page.click('[data-testid="prev-page-button"]');
    await expect(page).toHaveURL('/blog');
  });
});`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Mocking and Test Utilities</h2>
            <p style={ui.p}>
              INDJS provides utilities for mocking external dependencies and
              creating test data.
            </p>

            <h3 style={ui.h3}>Database Mocking</h3>
            <div style={ui.codeBlock}>
              {`// tests/utils/mockDb.js
import { vi } from 'vitest';

export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01')
};

export const mockUsers = [
  mockUser,
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02')
  }
];

// Mock Prisma client
export const mockPrisma = {
  user: {
    findMany: vi.fn().mockResolvedValue(mockUsers),
    findUnique: vi.fn().mockResolvedValue(mockUser),
    create: vi.fn().mockResolvedValue(mockUser),
    update: vi.fn().mockResolvedValue(mockUser),
    delete: vi.fn().mockResolvedValue(mockUser)
  },
  post: {
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({})
  }
};

// Mock database module
vi.mock('../../lib/database/prisma', () => ({
  prisma: mockPrisma
}));`}
            </div>

            <h3 style={ui.h3}>API Mocking</h3>
            <div style={ui.codeBlock}>
              {`// tests/utils/mockApi.js
import { vi } from 'vitest';

export const mockFetch = vi.fn();

// Mock successful responses
export const mockSuccessResponse = (data) => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => data,
    text: async () => JSON.stringify(data)
  });
};

// Mock error responses
export const mockErrorResponse = (status, error) => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ error }),
    text: async () => JSON.stringify({ error })
  });
};

// Setup global fetch mock
beforeEach(() => {
  global.fetch = mockFetch;
  mockFetch.mockClear();
});

// Usage in tests
describe('API calls', () => {
  it('handles successful response', async () => {
    mockSuccessResponse({ message: 'Success' });
    
    const result = await apiCall('/api/test');
    expect(result).toEqual({ message: 'Success' });
  });
  
  it('handles error response', async () => {
    mockErrorResponse(400, 'Bad Request');
    
    await expect(apiCall('/api/test')).rejects.toThrow('Bad Request');
  });
});`}
            </div>

            <h3 style={ui.h3}>Test Factories</h3>
            <div style={ui.codeBlock}>
              {`// tests/factories/userFactory.js
import { faker } from '@faker-js/faker';

export const createUser = (overrides = {}) => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: 'user',
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

export const createUsers = (count = 5, overrides = {}) => {
  return Array.from({ length: count }, () => createUser(overrides));
};

// tests/factories/postFactory.js
export const createPost = (overrides = {}) => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  published: faker.datatype.boolean(),
  authorId: faker.number.int({ min: 1, max: 100 }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides
});

// Usage in tests
describe('User service', () => {
  it('creates user with valid data', async () => {
    const userData = createUser({
      email: 'specific@example.com',
      role: 'admin'
    });
    
    const result = await userService.create(userData);
    expect(result.email).toBe('specific@example.com');
    expect(result.role).toBe('admin');
  });
});`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Test Scripts and Commands</h2>
            <p style={ui.p}>
              Set up npm scripts for different types of testing.
            </p>

            <div style={ui.codeBlock}>
              {`// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test && npm run test:e2e"
  }
}

# Run tests
npm test                    # Run unit tests once
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:e2e          # Run E2E tests
npm run test:all          # Run all tests`}
            </div>
          </div>

          <div style={ui.success}>
            <div style={ui.successTitle}>✅ Testing Best Practices</div>
            <ul style={{ margin: 0, fontSize: 14, color: "#15803d" }}>
              <li>Write tests as you develop features (TDD)</li>
              <li>Aim for high test coverage (80%+)</li>
              <li>Test user behavior, not implementation details</li>
              <li>
                Use descriptive test names and organize with describe blocks
              </li>
              <li>Mock external dependencies and APIs</li>
              <li>Use factories for test data generation</li>
              <li>Run tests in CI/CD pipeline</li>
              <li>Keep tests fast and independent</li>
            </ul>
          </div>

          <div style={ui.info}>
            <div style={ui.infoTitle}>💡 Testing Tips</div>
            <ul style={{ margin: 0, fontSize: 14, color: "#1e40af" }}>
              <li>
                Use <code style={ui.code}>data-testid</code> attributes for
                reliable element selection
              </li>
              <li>Test error states and edge cases</li>
              <li>Use visual regression testing for UI components</li>
              <li>Mock time-dependent functions for consistent tests</li>
              <li>Test accessibility with automated tools</li>
              <li>Use snapshot testing sparingly and maintain them</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
