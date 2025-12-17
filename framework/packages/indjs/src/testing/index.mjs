// Dynamic import wrapper
let createMocks;
import("node-mocks-http")
  .then((m) => (createMocks = m.createMocks))
  .catch(() => {});

// Fallback if missing
if (!createMocks) {
  createMocks = () => ({ req: {}, res: {} });
}
import React from "react";

// Mock INDJS context for testing
export function createMockContext(overrides = {}) {
  const {
    req: reqOverrides = {},
    res: resOverrides = {},
    ...otherOverrides
  } = overrides;

  const mockReq = {
    method: "GET",
    url: "/",
    headers: {},
    query: {},
    body: {},
    cookies: {},
    params: {},
    user: null,
    ...reqOverrides,
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    headersSent: false,
    ...resOverrides,
  };

  return {
    req: mockReq,
    res: mockRes,
    params: {},
    query: {},
    body: {},
    root: "/test",
    dev: true,
    ...otherOverrides,
  };
}

// Mock HTTP request/response
export function createMockRequest(options = {}) {
  const { req, res } = createMocks(options);
  return { req, res };
}

// Mock API handler testing
export async function testAPIHandler(handler, options = {}) {
  const {
    method = "GET",
    url = "/",
    body = null,
    query = {},
    headers = {},
    user = null,
    ...contextOverrides
  } = options;

  const context = createMockContext({
    req: {
      method,
      url,
      body,
      query,
      headers,
      user,
    },
    ...contextOverrides,
  });

  let result;
  let error;

  try {
    result = await handler(context);
  } catch (err) {
    error = err;
  }

  return {
    result,
    error,
    context,
    status: context.res.status,
    json: context.res.json,
    send: context.res.send,
  };
}

// Mock page component testing
export function createMockPageProps(props = {}) {
  return {
    ...props,
    __INDJS_PAGE_PROPS__: true,
  };
}

// Database testing utilities
export class TestDatabase {
  constructor(adapter) {
    this.adapter = adapter;
    this.originalData = new Map();
  }

  async setup() {
    // Store original data for cleanup
    await this.adapter.connect();
  }

  async cleanup() {
    // Clean up test data
    await this.adapter.disconnect();
  }

  async seed(tableName, data) {
    if (Array.isArray(data)) {
      for (const item of data) {
        await this.adapter.insert(tableName, item);
      }
    } else {
      await this.adapter.insert(tableName, data);
    }
  }

  async truncate(tableName) {
    await this.adapter.query(`DELETE FROM ${tableName}`);
  }
}

// Authentication testing utilities
export class TestAuth {
  static createMockUser(overrides = {}) {
    return {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      role: "user",
      createdAt: new Date().toISOString(),
      ...overrides,
    };
  }

  static createMockToken(user = null) {
    const mockUser = user || this.createMockUser();
    // In real implementation, this would use the actual JWT library
    return `mock-token-${mockUser.id}`;
  }

  static mockAuthMiddleware(user = null) {
    return jest.fn().mockImplementation(async ({ req }) => {
      if (user) {
        req.user = user;
        return true;
      }
      return false;
    });
  }
}

// Component testing utilities
export function renderWithProviders(ui, options = {}) {
  const { initialState = {}, providers = [], ...renderOptions } = options;

  function AllProviders({ children }) {
    let wrapped = children;

    // Wrap with providers in reverse order
    for (let i = providers.length - 1; i >= 0; i--) {
      const Provider = providers[i];
      wrapped = React.createElement(Provider, {}, wrapped);
    }

    return wrapped;
  }

  // This would use @testing-library/react in a real implementation
  return {
    ...renderOptions,
    wrapper: AllProviders,
  };
}

// Mock external services
export class MockService {
  constructor(name) {
    this.name = name;
    this.calls = [];
    this.responses = new Map();
  }

  mockResponse(method, response) {
    this.responses.set(method.toLowerCase(), response);
  }

  async call(method, ...args) {
    this.calls.push({ method, args, timestamp: new Date() });

    const response = this.responses.get(method.toLowerCase());
    if (response) {
      if (typeof response === "function") {
        return response(...args);
      }
      return response;
    }

    throw new Error(`No mock response defined for ${this.name}.${method}`);
  }

  getCalls(method = null) {
    if (method) {
      return this.calls.filter((call) => call.method === method);
    }
    return this.calls;
  }

  clearCalls() {
    this.calls = [];
  }

  reset() {
    this.calls = [];
    this.responses.clear();
  }
}

// Test data factories
export const factories = {
  user: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    email: `user${Math.random().toString(36).substr(2, 5)}@example.com`,
    name: "Test User",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),

  post: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    title: "Test Post",
    content: "This is a test post content",
    slug: `test-post-${Math.random().toString(36).substr(2, 5)}`,
    published: true,
    authorId: factories.user().id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),

  comment: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    content: "This is a test comment",
    postId: factories.post().id,
    authorId: factories.user().id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),
};

// Test suite utilities
export class TestSuite {
  constructor(name) {
    this.name = name;
    this.beforeEachHooks = [];
    this.afterEachHooks = [];
    this.beforeAllHooks = [];
    this.afterAllHooks = [];
  }

  beforeEach(fn) {
    this.beforeEachHooks.push(fn);
  }

  afterEach(fn) {
    this.afterEachHooks.push(fn);
  }

  beforeAll(fn) {
    this.beforeAllHooks.push(fn);
  }

  afterAll(fn) {
    this.afterAllHooks.push(fn);
  }

  async runBeforeAll() {
    for (const hook of this.beforeAllHooks) {
      await hook();
    }
  }

  async runAfterAll() {
    for (const hook of this.afterAllHooks) {
      await hook();
    }
  }

  async runBeforeEach() {
    for (const hook of this.beforeEachHooks) {
      await hook();
    }
  }

  async runAfterEach() {
    for (const hook of this.afterEachHooks) {
      await hook();
    }
  }
}

// Snapshot testing utilities
export function createSnapshot(data) {
  return JSON.stringify(data, null, 2);
}

export function compareSnapshots(snapshot1, snapshot2) {
  return snapshot1 === snapshot2;
}

// Performance testing utilities
export class PerformanceTest {
  constructor(name) {
    this.name = name;
    this.measurements = [];
  }

  async measure(fn) {
    const start = process.hrtime.bigint();
    const result = await fn();
    const end = process.hrtime.bigint();

    const duration = Number(end - start) / 1000000; // Convert to milliseconds
    this.measurements.push(duration);

    return { result, duration };
  }

  getStats() {
    if (this.measurements.length === 0) {
      return null;
    }

    const sorted = [...this.measurements].sort((a, b) => a - b);
    const sum = this.measurements.reduce((a, b) => a + b, 0);

    return {
      count: this.measurements.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      average: sum / this.measurements.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  reset() {
    this.measurements = [];
  }
}

// Integration test utilities
export class IntegrationTest {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || "http://localhost:3000";
    this.timeout = options.timeout || 30000;
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      timeout: this.timeout,
      ...options,
    });

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text(),
      json: async () => JSON.parse(await response.text()),
    };
  }

  async get(path, options = {}) {
    return this.request(path, { method: "GET", ...options });
  }

  async post(path, data, options = {}) {
    return this.request(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(path, data, options = {}) {
    return this.request(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(path, options = {}) {
    return this.request(path, { method: "DELETE", ...options });
  }
}

// Export all utilities
export default {
  createMockContext,
  createMockRequest,
  testAPIHandler,
  createMockPageProps,
  TestDatabase,
  TestAuth,
  renderWithProviders,
  MockService,
  factories,
  TestSuite,
  createSnapshot,
  compareSnapshots,
  PerformanceTest,
  IntegrationTest,
};
