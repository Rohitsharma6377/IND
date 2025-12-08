# Contributing to INDJS

Thank you for your interest in contributing to INDJS! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/IND.git
   cd IND/framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Workflow

### Running the Framework Locally

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run e2e

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Testing Your Changes

1. **Unit Tests**: Write tests using Vitest
   ```bash
   npm test
   ```

2. **E2E Tests**: Write Playwright tests
   ```bash
   npm run e2e
   ```

3. **Manual Testing**: Create a test app
   ```bash
   node packages/indjs/bin/indjs.js create test-app
   cd test-app
   npm install
   npm run dev
   ```

## 📋 Code Guidelines

### Code Style

- Use TypeScript for new features
- Follow the existing code style
- Run `npm run format` before committing
- Ensure `npm run lint` passes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## 🐛 Reporting Bugs

1. Check if the bug already exists in [Issues](https://github.com/Rohitsharma6377/IND/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Code samples or screenshots

## 💡 Feature Requests

1. Check [Discussions](https://github.com/Rohitsharma6377/IND/discussions) for similar ideas
2. Create a new discussion explaining:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Additional context

## 📖 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update TypeScript definitions
- Add examples for new features

## 🧪 Testing Requirements

- All new features must have tests
- Maintain or improve code coverage
- Test edge cases
- Test error handling

## 🔒 Security

If you discover a security vulnerability, please email netcurion@outlook.com instead of using the issue tracker.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make INDJS better for everyone. We appreciate your time and effort!

---

**Questions?** Join our [Discussions](https://github.com/Rohitsharma6377/IND/discussions) or reach out to the maintainers.
