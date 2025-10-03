# IND

IND is a new programming language with a readable syntax and optional JSX-like rendering. This repository contains:
- A minimal transpiler (IND → JS)
- A tiny `std.ui` for SSR/hydration of JSX-like output

See the full language spec at `specs/ind-spec.md`.

## Quick Start

- Requirements: Node.js 18+

### 1) Transpile and run the example

```
node tools/ind.mjs build examples/hello/src examples/hello/dist
node examples/hello/dist/main.js
```

### 2) Dev mode (watch + restart)

```
node tools/ind.mjs dev examples/hello/src examples/hello/dist examples/hello/dist/main.js
```

Edit `examples/hello/src/main.ind` and see changes auto-rebuilt and re-run.

## What’s included

- `specs/ind-spec.md`: Full language specification (grammar, components, JSX notes).
- `packages/ind-transpiler`: Minimal indentation-based transpiler (IND → JS) for MVP subset.
- `packages/ind-runtime/std/ui.mjs`: Minimal UI runtime with `renderToString`, `mountHtml`, and basic hydration of `data-on-*` handlers.
- `tools/ind.mjs`: CLI with `build` and `dev` (watch) commands.
- `examples/hello`: Console example to validate the pipeline.

## roadmap

- Implement JSX → VDOM in `render()` functions and improve hydration.
- Expand parser/emitter to cover more of the grammar.
- Add type checker (gradual typing) and source maps.

## License

TBD
