# 🤖 Ollama AI Integration Setup Guide

## What is Ollama?

Ollama is a local AI model runner that allows you to run large language models (LLMs) on your own machine. INDJS integrates with Ollama to provide AI-powered code generation and assistance.

## 🚀 Quick Setup

### 1. Install Ollama

#### Windows
```bash
# Download and install from:
https://ollama.ai/download/windows

# Or use winget:
winget install Ollama.Ollama
```

#### macOS
```bash
# Download from:
https://ollama.ai/download/mac

# Or use Homebrew:
brew install ollama
```

#### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Start Ollama Service

```bash
# Start Ollama (runs on port 11434 by default)
ollama serve
```

### 3. Pull a Model

```bash
# Recommended model for INDJS (balanced performance/quality)
ollama pull llama3.1:8b

# Or use a smaller model (faster, less accurate)
ollama pull llama3.2:3b

# Or use a larger model (slower, more accurate)
ollama pull llama3.1:70b
```

### 4. Verify Installation

```bash
# Test Ollama
ollama run llama3.1:8b "Hello, world!"

# Check running models
ollama list
```

## 🎯 Using AI in INDJS

### AI Scaffold (Generate Code)

```bash
# Generate a component with AI
indjs ai scaffold component LoginForm

# Generate a page with AI
indjs ai scaffold page Dashboard

# Generate an API route with AI
indjs ai scaffold api authentication
```

Output is written to `AI-OUTPUT.md` for review before using.

### AI Documentation

```bash
# Generate documentation for your app
indjs ai docs
```

Output is written to `AI-DOCS.md`.

### AI Refactoring Suggestions

```bash
# Get refactoring suggestions
indjs ai refactor
```

Prints suggestions directly to console.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project:

```bash
# Optional: Specify a different model
OLLAMA_MODEL=llama3.1:8b

# Optional: Specify Ollama host (if not localhost)
OLLAMA_HOST=http://localhost:11434
```

### Supported Models

| Model | Size | Speed | Quality | Recommended For |
|-------|------|-------|---------|-----------------|
| `llama3.2:1b` | 1GB | ⚡⚡⚡ | ⭐⭐ | Quick tasks |
| `llama3.2:3b` | 2GB | ⚡⚡ | ⭐⭐⭐ | General use |
| `llama3.1:8b` | 4.7GB | ⚡ | ⭐⭐⭐⭐ | **Recommended** |
| `llama3.1:70b` | 40GB | 🐌 | ⭐⭐⭐⭐⭐ | Best quality |
| `codellama:7b` | 3.8GB | ⚡ | ⭐⭐⭐⭐ | Code-specific |
| `codellama:13b` | 7.3GB | ⚡ | ⭐⭐⭐⭐⭐ | Code-specific |

### Change Model

```bash
# Pull a different model
ollama pull codellama:7b

# Set in environment
export OLLAMA_MODEL=codellama:7b

# Or in .env file
OLLAMA_MODEL=codellama:7b
```

## 🔧 Advanced Usage

### Custom Prompts

The AI integration uses these prompts:

**Scaffold:**
```
Generate a {type} named {name} for an INDJS app. Provide concise code only.
```

**Docs:**
```
Summarize an INDJS app structure with routes, APIs, and components.
```

**Refactor:**
```
Give 5 concise refactor suggestions for a modern React full-stack app using SSR/ISR and API routes.
```

### Fallback Behavior

If Ollama is not available:
- `ai scaffold` falls back to built-in code generator
- `ai docs` creates a template file
- `ai refactor` shows built-in suggestions

## 📊 Performance Tips

### 1. Use Appropriate Model Size

```bash
# For laptops/smaller machines
ollama pull llama3.2:3b

# For desktops/workstations
ollama pull llama3.1:8b

# For servers/powerful machines
ollama pull llama3.1:70b
```

### 2. Keep Ollama Running

```bash
# Start Ollama in background (Windows)
Start-Process ollama -ArgumentList "serve" -WindowStyle Hidden

# Start Ollama in background (Linux/Mac)
ollama serve &
```

### 3. Optimize for Your Hardware

```bash
# Check GPU usage
ollama ps

# Use CPU-only mode if needed
OLLAMA_NUM_GPU=0 ollama serve
```

## 🐛 Troubleshooting

### Ollama Not Found

```bash
# Check if Ollama is installed
ollama --version

# Check if service is running
curl http://localhost:11434/api/tags
```

### Connection Refused

```bash
# Start Ollama service
ollama serve

# Check port
netstat -an | findstr "11434"  # Windows
lsof -i :11434                  # Linux/Mac
```

### Model Not Found

```bash
# List installed models
ollama list

# Pull the model
ollama pull llama3.1:8b
```

### Slow Performance

```bash
# Use a smaller model
ollama pull llama3.2:3b
export OLLAMA_MODEL=llama3.2:3b

# Or increase timeout in code
# Edit src/cli.mjs, line 81: timeout: 30000
```

### Out of Memory

```bash
# Use a smaller model
ollama pull llama3.2:1b

# Or limit context size
OLLAMA_NUM_CTX=2048 ollama serve
```

## 📖 Examples

### Example 1: Generate Login Component

```bash
indjs ai scaffold component LoginForm
```

Output in `AI-OUTPUT.md`:
```jsx
import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Login logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 2: Generate API Route

```bash
indjs ai scaffold api users
```

Output in `AI-OUTPUT.md`:
```javascript
export async function get({ req, res }) {
  const users = await db.users.findMany();
  return { users };
}

export async function post({ req, res, body }) {
  const user = await db.users.create({ data: body });
  return { user };
}
```

### Example 3: Get Refactoring Suggestions

```bash
indjs ai refactor
```

Output:
```
🤖 AI refactor suggestions:
1. Enable TypeScript strict mode for better type safety
2. Extract database logic into separate service layer
3. Enable streaming SSR for faster TTFB
4. Add comprehensive test coverage (aim for 80%+)
5. Implement observability with metrics and tracing
```

## 🎓 Best Practices

1. **Review AI Output**: Always review generated code before using
2. **Use Appropriate Models**: Larger models = better quality but slower
3. **Keep Ollama Updated**: `ollama update` to get latest models
4. **Combine with Built-in Generators**: Use AI for complex tasks, built-in for simple ones
5. **Customize Prompts**: Edit `src/cli.mjs` to customize AI prompts

## 🔗 Resources

- [Ollama Website](https://ollama.ai)
- [Ollama GitHub](https://github.com/ollama/ollama)
- [Model Library](https://ollama.ai/library)
- [INDJS Documentation](https://netcurion.vercel.app)

## 💡 Tips

- **First Run**: First AI call may be slow as model loads
- **Warm Up**: Run a simple query first to load model into memory
- **Batch Operations**: Generate multiple components in one session
- **Experiment**: Try different models to find the best balance

---

**Need Help?** Open an issue on [GitHub](https://github.com/Rohitsharma6377/IND/issues)
