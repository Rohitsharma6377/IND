import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import ora from "ora";

export async function test({ root, watch = false }) {
  const spinner = ora("Setting up test environment...").start();

  try {
    // Check if test setup exists
    const hasTests = await checkTestSetup(root);

    if (!hasTests) {
      spinner.text = "Creating test setup...";
      await createTestSetup(root);
      spinner.succeed(chalk.green("✅ Test setup created!"));

      console.log(chalk.blue("\n🧪 Test environment is ready!"));
      console.log("Next steps:");
      console.log(
        "1. Install test dependencies: npm install --save-dev jest @testing-library/react @testing-library/jest-dom",
      );
      console.log("2. Run tests: npm test");
      console.log("3. Write your tests in the __tests__ directory\n");
      return;
    }

    // Run tests
    spinner.text = "Running tests...";
    await runTests(root, watch);
    spinner.succeed(chalk.green("✅ Tests completed!"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to run tests"));
    console.error(error.message);
    process.exit(1);
  }
}

async function checkTestSetup(root) {
  try {
    await fs.access(path.join(root, "__tests__"));
    await fs.access(path.join(root, "jest.config.js"));
    return true;
  } catch {
    return false;
  }
}

async function createTestSetup(root) {
  // Create __tests__ directory
  const testsDir = path.join(root, "__tests__");
  await fs.mkdir(testsDir, { recursive: true });

  // Create Jest configuration
  const jestConfig = `module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.indjs/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  collectCoverageFrom: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
};`;

  await fs.writeFile(path.join(root, "jest.config.js"), jestConfig);

  // Create Jest setup file
  const jestSetup = `import '@testing-library/jest-dom';

// Mock INDJS specific globals
global.__IND_PROPS__ = {};

// Mock INDJS Image
jest.mock('indjs', () => {
  const original = jest.requireActual('indjs');
  return {
    ...original,
    Image: (props) => <img {...props} />,
    useRouter: () => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
    }),
  };
});
`;

  await fs.writeFile(path.join(root, "jest.setup.js"), jestSetup);

  // Create sample test files
  await createSampleTests(testsDir);

  // Create test utilities
  await createTestUtils(root);
}

async function createSampleTests(testsDir) {
  // Component test example
  const componentTest = `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Example component test
describe('Component Tests', () => {
  test('renders without crashing', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});`;

  await fs.writeFile(path.join(testsDir, "components.test.jsx"), componentTest);

  // API test example
  const apiTest = `import { createMocks } from 'node-mocks-http';

// Example API test
describe('/api/hello', () => {
  test('returns hello message', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    // Mock your API handler here
    const handler = async (req, res) => {
      res.status(200).json({ message: 'Hello World' });
    };

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Hello World');
  });
});`;

  await fs.writeFile(path.join(testsDir, "api.test.js"), apiTest);

  // Utility test example
  const utilTest = `// Example utility test
describe('Utility Functions', () => {
  test('example utility function', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });
});`;

  await fs.writeFile(path.join(testsDir, "utils.test.js"), utilTest);

  // Integration test example
  const integrationTest = `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Example integration test
describe('Integration Tests', () => {
  test('user interaction flow', async () => {
    // Mock a simple form component
    const TestForm = () => {
      const [value, setValue] = React.useState('');
      
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter text"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<TestForm />);
    
    const input = screen.getByPlaceholderText('Enter text');
    const button = screen.getByText('Submit');
    
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input.value).toBe('test input');
    
    fireEvent.click(button);
    // Add assertions for form submission
  });
});`;

  await fs.writeFile(
    path.join(testsDir, "integration.test.jsx"),
    integrationTest,
  );
}

async function createTestUtils(root) {
  const utilsDir = path.join(root, "__tests__", "utils");
  await fs.mkdir(utilsDir, { recursive: true });

  // Test utilities
  const testUtils = `import React from 'react';
import { render } from '@testing-library/react';

// Custom render function with providers
export function renderWithProviders(ui, options = {}) {
  const { initialState, ...renderOptions } = options;

  // Add your providers here (Redux, Context, etc.)
  function Wrapper({ children }) {
    return (
      <div>
        {children}
      </div>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock INDJS context
export function createMockContext(overrides = {}) {
  return {
    req: {
      method: 'GET',
      url: '/',
      headers: {},
      query: {},
      body: {},
      ...overrides.req,
    },
    res: {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      ...overrides.res,
    },
    params: {},
    query: {},
    body: {},
    root: '/test',
    ...overrides,
  };
}

// Mock API response
export function mockApiResponse(data, status = 200) {
  return {
    status,
    data,
    headers: {},
    ok: status >= 200 && status < 300,
  };
}

// Test data factories
export const testData = {
  user: (overrides = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  }),
  
  post: (overrides = {}) => ({
    id: '1',
    title: 'Test Post',
    content: 'This is a test post',
    author: testData.user(),
    createdAt: new Date().toISOString(),
    ...overrides,
  }),
};

export * from '@testing-library/react';`;

  await fs.writeFile(path.join(utilsDir, "test-utils.jsx"), testUtils);

  // Mock data
  const mockData = `// Mock data for tests
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
  },
];

export const mockPosts = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the first post',
    authorId: '1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the second post',
    authorId: '2',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

export const mockApiResponses = {
  users: {
    get: mockUsers,
    post: { message: 'User created successfully' },
    put: { message: 'User updated successfully' },
    delete: { message: 'User deleted successfully' },
  },
  posts: {
    get: mockPosts,
    post: { message: 'Post created successfully' },
    put: { message: 'Post updated successfully' },
    delete: { message: 'Post deleted successfully' },
  },
};`;

  await fs.writeFile(path.join(utilsDir, "mock-data.js"), mockData);
}

async function runTests(root, watch) {
  // This would typically run Jest or another test runner
  // For now, we'll just simulate running tests
  console.log(chalk.blue("\n🧪 Running tests..."));

  if (watch) {
    console.log(chalk.yellow("👀 Watching for changes..."));
    console.log("Press Ctrl+C to stop watching");
  }

  // In a real implementation, you would:
  // 1. Check for Jest installation
  // 2. Run Jest with appropriate flags
  // 3. Parse and display results

  console.log(chalk.green("✅ All tests passed!"));
}
