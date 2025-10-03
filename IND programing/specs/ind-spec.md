# IND Language Specification

Version: 1.0 (Draft, production-ready spec)
Status: Ready for implementation
File: specs/ind-spec.md


## 1. Overview & Goals
IND is a readable, Python-flavored language designed for web, app, systems, and immersive (AR/VR) development with first-class UI components, optional static typing, and multiple compilation targets (JS/WASM/Native). It aims to be productive like Python/TypeScript and powerful like Rust/C, while offering a modern full-stack framework similar to Next.js.

Primary design goals:
- Human-friendly syntax (indentation-friendly, braces allowed for flexibility).
- Gradual typing: optional types with strong checks when provided.
- Declarative UI (JSX-like fragments inside `render()`).
- Easy transpilation to JavaScript for fast MVP, with paths to WASM and native backends.
- Secure-by-default runtime with small, auditable core.
- Systems mode (no-std) for OS/hardware access via FFI and syscalls.
- Interop with JavaScript and Python for incremental adoption and ecosystem reach.

Conventions:
- File extension: `.ind`
- Encoding: UTF-8
- Line endings: LF preferred


## 2. Lexical Grammar (Tokens)
### 2.1 Character classes
- LETTER = A–Z | a–z | _
- DIGIT = 0–9
- IDENT = LETTER { LETTER | DIGIT }
- INT = DIGIT { DIGIT }
- FLOAT = INT "." INT
- STRING = `"` { any except `"` or `\` } `"` | `'` { any except `'` or `\` } `'`

### 2.2 Tokens
- Keywords: `fn`, `component`, `let`, `const`, `if`, `else`, `elif`, `for`, `while`, `break`, `continue`, `return`, `import`, `export`, `async`, `await`, `try`, `except`, `raise`, `in`, `match`, `case`, `true`, `false`, `null`, `as`, `type`, `interface`, `impl`, `pub`, `private`, `finally`, `not`
- Operators/punctuators: `+ - * / % == != < > <= >= = -> : , . ( ) [ ] { } => and or ? : | ... !`
- Comments:
  - Line: `#` rest of line
  - Block: `/* ... */`
- Whitespace separates tokens; indentation is significant for block structure in indentation mode.

### 2.3 Identifiers & naming
- Must start with LETTER and may include digits and underscores.
- Recommendation: `lower_snake_case` for variables; `UpperCamelCase` for component names and types.


## 3. High-level Syntax Summary
IND supports two block styles:
- Indentation-sensitive (Python style). Preferred.
- Brace blocks `{ ... }` as an alternative. Mix-and-match allowed but each block must be locally consistent.


## 4. Formal Grammar (EBNF)
Lexical tokens: `NEWLINE`, `INDENT`, `DEDENT` exist in indentation mode.

```
program         ::= { module_item }
module_item     ::= import_stmt | export_stmt | decl | stmt

import_stmt     ::= "import" import_path [ "as" IDENT ] NEWLINE
import_path     ::= IDENT { "." IDENT }

export_stmt     ::= "export" ( decl | "default" expr ) NEWLINE

decl            ::= fn_decl | comp_decl | type_decl | var_decl

fn_decl         ::= [ "async" ] "fn" IDENT "(" [ param_list ] ")" [ "->" type ] block
param_list      ::= param { "," param }
param           ::= IDENT [ ":" type ] [ "=" expr ]

comp_decl       ::= "component" IDENT [ "(" [ prop_list ] ")" ] ":" block
prop_list       ::= prop { "," prop }
prop            ::= IDENT ":" type

type_decl       ::= "type" IDENT "=" type NEWLINE

var_decl        ::= ( "let" | "const" ) IDENT [ ":" type ] [ "=" expr ] NEWLINE

stmt            ::= if_stmt
                  | for_stmt
                  | while_stmt
                  | try_stmt
                  | return_stmt
                  | expr_stmt
                  | block

if_stmt         ::= "if" expr ":" block { "elif" expr ":" block } [ "else" ":" block ]

for_stmt        ::= "for" IDENT "in" expr ":" block

while_stmt      ::= "while" expr ":" block

try_stmt        ::= "try" ":" block { "except" [ IDENT ] [ "as" IDENT ] ":" block } [ "finally" ":" block ]

return_stmt     ::= "return" [ expr ] NEWLINE

expr_stmt       ::= expr NEWLINE

block           ::= NEWLINE INDENT { module_item | stmt } DEDENT
                | "{" { module_item | stmt } "}"

expr            ::= assignment

assignment      ::= conditional { "=" assignment }             ; right-associative (a = b = c)
conditional     ::= logical_or [ "?" expr ":" expr ]
logical_or      ::= logical_and { "or" logical_and }
logical_and     ::= comparison { "and" comparison }
comparison      ::= addition { ( "==" | "!=" | "<" | ">" | "<=" | ">=" ) addition }
addition        ::= multiplication { ("+" | "-") multiplication }
multiplication  ::= unary { ("*" | "/" | "%") unary }
unary           ::= ( "-" | "!" | "await" | "not" ) unary | postfix
postfix         ::= primary { ( call_suffix | member_suffix | index_suffix ) }
call_suffix     ::= "(" [ arg_list ] ")"
member_suffix   ::= "." IDENT
index_suffix    ::= "[" expr "]"

primary         ::= literal
                  | IDENT
                  | lambda_expr
                  | "(" expr ")"
                  | list_literal
                  | map_literal
                  | jsx_fragment

arg_list        ::= expr { "," expr }

lambda_expr     ::= "fn" "(" [ param_list ] ")" "->" expr

list_literal    ::= "[" [ expr { "," expr } ] "]"
map_literal     ::= "{" [ map_entry { "," map_entry } ] "}"
map_entry       ::= expr ":" expr

jsx_fragment    ::= "<" IDENT { attribute } ">" { jsx_child } "</" IDENT ">"
attribute       ::= IDENT [ ":" IDENT ] "=" "{" expr "}" | IDENT "=" STRING
jsx_child       ::= expr | jsx_fragment | STRING

literal         ::= INT | FLOAT | STRING | "true" | "false" | "null"

type            ::= union_type
union_type      ::= func_type { "|" func_type }
func_type       ::= simple_type | generic_type | function_type
simple_type     ::= IDENT | "int" | "float" | "str" | "bool" | "any" | "void" | "null"
generic_type    ::= IDENT "<" type { "," type } ">"
function_type   ::= "(" [ type { "," type } ] ")" "->" type
```

Notes:
- `jsx_fragment` allowed inside `render()` of components and in functions annotated `@ui` (future attribute syntax).
- `await` may only appear in `async fn` bodies.


## 5. Operator Precedence (highest → lowest)
1. Member access `.`, Index `[]`, Call `()`
2. Unary `-`, `!`, `not`, `await`
3. `*`, `/`, `%`
4. `+`, `-`
5. Comparison `== != < > <= >=`
6. `and`
7. `or`
8. Conditional `?:`
9. Assignment `=` (right-associative)


## 6. Type System
### 6.1 Overview
- Gradual typing: types optional; type-checker enforces when present.
- Structural typing for records/maps; nominal for declared `type` aliases and component names.
- Type erasure on dynamic targets (JS) with optional runtime checks.

### 6.2 Built-in Types
- Primitive: `int`, `float`, `str`, `bool`, `null`
- Container: `list<T>`, `map<K,V>`, `option<T>`
- Function: `(A,B)->R`
- Component: `Component<Props>` (opaque)
- Top: `any`, `void`

### 6.3 Generics
- Syntax on functions and types: `fn map<T,U>(arr: list<T>, f: fn(T)->U) -> list<U>`
- Type params appear after `fn` or `type` identifiers: `type Box<T> = { value: T }`

### 6.4 Type Inference
- Local HM-style inference, conservative at module boundaries.
- Explicit types recommended for exported APIs.

### 6.5 Optional Runtime Checks
- JS target can insert runtime checks for annotated positions with `--runtime-checks`.

### 6.6 Structural Records
- Map/object literals `{ a: 1, b: 2 }` have shape types `{ a: int, b: int }` usable structurally.

### 6.7 Nullable and Option
- `null` literal; `option<T>` canonical optional.


## 7. Module & Import Semantics
- Each `.ind` is a module.
- `import path.to.module as alias` resolves relative to project root or registry.
- Circular imports follow ES module semantics.
- `export default expr` allowed.
- JS target emits ES modules preserving symbol names.


## 8. Component Model & UI Semantics
### 8.1 Declaration
```
component Counter():
    state count: int = 0
    fn inc():
        self.count += 1
    render():
        <div>
            <h1>Count: {self.count}</h1>
            <button on:click={self.inc}>Increment</button>
        </div>
```

### 8.2 Lifecycle
- `init(props)`: optional, runs on mount.
- `render()`: required, returns JSX-like tree or VDOM description.
- `destroy()`: optional cleanup.

### 8.3 State & Props
- `state` introduces reactive fields; `self.name` updates schedule re-render.
- `props` are read-only.

### 8.4 Render Output
- SSR: emit HTML string.
- CSR/VDOM: emit ops + bootstrap to hydrate, attach handlers.
- Events `on:click={...}` compile to runtime wiring.


## 9. Concurrency and Async Model
- `async fn` returns `Task`/Promise-like handle.
- Event loop for JS single-threaded runtimes.
- `await` suspends until resolved.
- Multithreading (native/WASM): `spawn_thread(fn)`, `Channel<T>`.
- Structured concurrency: scopes may join/cancel child tasks.

Example:
```
async fn fetch_all(urls: list<str>) -> list<str>:
    let tasks = [ for u in urls -> spawn fetch(u) ]
    let results = [ for t in tasks -> await t ]
    return results
```


## 10. Error Handling
- Exceptions: `raise Error("msg")`, `try/except[/finally]`.
- Result type and `?` operator when return type is `Result<T,E>`.

Example:
```
fn read_file(path) -> Result<str, Error>:
    try:
        let s = fs.read(path)
        return Ok(s)
    except IOError as e:
        return Err(e)

fn main():
    let s = read_file("a.txt")?
    print(s)
```


## 11. Standard Library (Surface)
- `std.io` — read, write, stdin, stdout
- `std.fs` — exists, read_file, write_file, list_dir
- `std.net/http` — get, post, server
- `std.json` — parse, stringify
- `std.time` — sleep(ms), now()
- `std.concurrent` — spawn, Channel
- `std.ui` — mounting & helpers
- `db` — db.sql (prisma-like), db.mongo (mongoose-like)
- `crypto` — hashing, randomness, JWT sign/verify
- `sys` — env vars, args, platform, process
- `pack` — package metadata

Per-target mappings for JS/Node, browser, WASM, native.


## 12. Interop Rules (JS/Python/Native)
### 12.1 JavaScript Interop
- Value mapping:
  - `int/float` → JS Number
  - `str` → JS String
  - `bool` → JS Boolean
  - `list<T>` → JS Array
  - `map<K,V>` → JS Object or `Map` (configurable)
- Importing JS into IND:
  - `import js.node.fs as fs`
  - `let data = js.call("JSON.parse", str)` or thin wrappers
- Exporting IND to JS: transpiler emits ES modules; types erased.
- Embedding: `ffi.js.import(module_path)` and `ffi.js.export(symbols)`.

### 12.2 Python Interop
- Two modes:
  - CPython embedding (native): run Python in-process via C-API. `ffi.py.call("module.func", args)`.
  - Pyodide/WebAssembly (browser): call Python from WASM JS host.
- Value mapping:
  - `list<T>` ↔ `list`
  - `map<K,V>` ↔ `dict`
  - Converters for `bytes`, `memoryview` via `ffi` helpers.
- Importing Python:
  - `import py.numpy as np` (binding module path under `py.` namespace)
- Safety: calls are sandboxed when configured; long-running calls cancellable with task tokens.

### 12.3 Native/WASM FFI
- `ffi` module to declare foreign functions:
```
type CStr = ptr<char>
extern fn puts(s: CStr) -> int
```
- Memory: explicit buffers, `ptr<T>`, alignment/size helpers.
- WASM: linear memory marshalling, host bindings for JS glue.


## 13. Security Considerations
- No `eval` by default; optional sandboxed `eval` with allowlist.
- HTML interpolation escaped by default; `unsafe_html()` to opt out.
- Network APIs require explicit imports; enforce CORS/same-origin in browser.
- Package integrity checks (checksums/signatures) for production registries.
- Interop boundaries (JS/Python/native) optionally guarded by capability tokens.


## 14. Tooling & Compilation Modes
- Modes:
  - `interpret` — interpreter/REPL.
  - `transpile` — JS ES modules + source maps (MVP).
  - `compile` — WASM/native via IR backend.
- Recommended:
  - Parser: hand-written RD or tree-sitter grammar; later LALR.
  - Bundler (JS): esbuild.
  - Formatter: AST-based `ind-fmt`.
  - CLI: `ind create|dev|build|fmt|repl`.
  - Source maps: `.ind` ↔ `.js` for debugging.


## 15. Reserved Words
`fn component let const if else elif for while break continue return import export async await try except finally raise in match case as type interface impl pub private true false null and or not`


## 16. Examples
### 16.1 Hello world
```
fn main():
    print("Hello, IND!")
```

### 16.2 Function with types
```
fn add(a: int, b: int) -> int:
    return a + b
```

### 16.3 Async HTTP server (JS target)
```
import http

async fn handler(req):
    return http.text("Hello from IND server!")

fn main():
    http.serve(handler, port=8080)
```

### 16.4 Component with state
```
component Counter():
    state count: int = 0

    fn inc():
        self.count += 1

    render():
        <div>
            <h1>Count: {self.count}</h1>
            <button on:click={self.inc}>Increment</button>
        </div>
```

### 16.5 API route with DB (pseudocode)
```
import db

async fn handler(req):
    if req.method == "GET":
        let users = await db.sql.user.findMany()
        return { status:200, json: users }
```


## 17. Versioning & Migration
- Semantic versioning for compiler/runtime.
- Minor versions keep compatibility for stable features; breaking changes in majors.
- `ind migrate` tool for AST or stdlib breaking changes.


## 18. Implementation Notes (Practical)
- MVP transpiler to JS:
  - Lexer → tokens
  - Parser → AST (functions, let/const, calls, JSX fragments in `render`)
  - Emitter → ES modules
  - Runtime helpers (UI mount, hydration, http server)
  - Source maps
- Testing: parse → emit → run in Node; assert outputs.
- Examples under `examples/myapp`.


## 19. Editor & LSP
- TextMate grammar for `.ind` and VS Code extension.
- Language Server (later): autocomplete, go-to-def, type checking.


# Extended Specification (Requested Enhancements)

## 20. Mixed JS/Python Interop & Embedding
### 20.1 Language-Level Convenience
- `js` and `py` namespaces are reserved import roots to signal foreign modules.
- Syntactic sugar:
```
import js.lodash as _
import py.numpy as np

let xs = _.call("range", 0, 10)
let arr = np.call("array", [1,2,3])
```
- Direct function binding (tooling-generated stubs) allows `np.array([1,2,3])` style calls where available.

### 20.2 Data Conversion Rules
- Numbers/strings/bools map trivially.
- Collections: shallow converted by default; deep conversion via `ffi.deep()`.
- Buffers: `bytes`/`Uint8Array`/`memoryview` supported via `ffi.buffer(view)`.

### 20.3 Error Semantics
- Foreign exceptions surface as `ForeignError(module, name, message)`; can be caught in `except`.

### 20.4 Packaging
- `ind pack` can declare JS/Python peer deps to be installed by adapter tools.


## 21. Next.js-like Full-Stack Framework: INDX
A batteries-included framework for IND targeting web, inspired by Next.js.

### 21.1 File-System Routing
- Directory: `app/` (recommended) or `pages/` (compat).
- Route segment = folder name; dynamic `[id]`, catch-all `[...slug]`.
- Each route can export:
  - `page.ind` (UI component)
  - `layout.ind` (wrapper)
  - `loading.ind`, `error.ind`, `not-found.ind`
  - `route.ind` (server handler for REST)

### 21.2 Data Fetching
- `async fn loader(ctx) -> Props` on server; props streamed to UI.
- Caching modes: `cache: 'force-cache'|'no-store'|{ revalidate: seconds }`.
- ISR: `revalidate` as above; SSR default for dynamic.

### 21.3 Server/Client Components
- `@server` and `@client` file or function annotations.
- Server Components render on server; Client Components hydrate on client.

### 21.4 Server Actions
- `@action` on async functions callable from UI events; routed via POST; input validated.

### 21.5 Middleware & Edge
- `middleware.ind` at project root; runs per request.
- Edge runtime target with restricted APIs (no filesystem, limited timers).

### 21.6 Assets & Styles
- `public/` static files; `styles/` for CSS; CSS Modules supported.

### 21.7 Dev & Build
- Commands: `ind dev`, `ind build`, `ind start`.
- Bundles: per-route code splitting; tree-shaking; source maps.


## 22. Low-Level Systems & Hardware Access
### 22.1 Unsafe Blocks
- `unsafe:` blocks permit operations bypassing safety checks:
```
unsafe:
    let p: ptr<int> = alloc<int>(1)
    *p = 42
    free(p)
```
- Unsafe operations: raw pointers, manual memory management, inline syscalls, inline assembly (backend-dependent).

### 22.2 Memory & Pointers
- Types: `ptr<T>`, `usize`, `isize`.
- Intrinsics: `alloc<T>(n)`, `free(p)`, `memcpy(dst, src, len)`, `memset(p, val, len)`.
- Slices: `slice<T>(ptr, len)` view into memory.

### 22.3 Syscalls & ABI
- `extern` to declare foreign symbols and syscalls:
```
extern syscall fn write(fd: int, buf: ptr<u8>, len: usize) -> isize
```
- ABIs: `cdecl`, `sysv`, `wasm32`, `win64` attributes on `extern` (backend feature).

### 22.4 No-Std Mode
- `#![no_std]` crate flag (project-level) removes standard library; require allocator or bare-metal.
- `panic` strategy configurable: abort or unwind (target-dependent).

### 22.5 Inline Assembly (optional backend)
- `asm"mov eax, 1"` blocks under `unsafe` for supported targets.

### 22.6 Device & Hardware Access
- MMIO helpers: `mmio_read<T>(addr)`, `mmio_write<T>(addr, value)`.
- Port I/O on x86: `inb`, `outb` when available.


## 23. Graphics & AR/VR Stack
### 23.1 Modules
- `std.graphics`: windowing, input, swapchain abstraction; backends WebGPU/Vulkan/Metal/DirectX.
- `std.xr`: OpenXR bindings for AR/VR devices; session, space, input, rendering loop.
- `std.scene`: scene graph, nodes, transforms, materials, meshes.

### 23.2 Shaders
- `@shader` functions compile to WGSL/GLSL/SPIR-V depending on target.

### 23.3 Example
```
import std.graphics as gfx

fn main():
    let app = gfx.create_app(title="Hello XR")
    let renderer = app.create_renderer(backend="webgpu")
    app.run(frame => {
        renderer.clear(0.1,0.1,0.1,1.0)
    })
```


## 24. Runtime Semantics (Detailed)
### 24.1 Evaluation Rules
- Expressions evaluate left-to-right; short-circuit for `and`/`or`.
- Assignments return assigned value.
- Function calls evaluate args before call; exceptions unwind stack.

### 24.2 Module Loading
- Each module evaluated once; exports live-bound.
- Import graph resolved before execution; cycles allowed with ES semantics.

### 24.3 Component Lifecycle
- `init` → `render` (mount) → updates on state/props → `destroy` on unmount.
- Event handlers bound with lexical `self`.


## 25. Embedding & Host Integration
- Embedding IND VM/Runtime:
  - JS Host: `createIndRuntime()` returns instance; load modules via `runtime.load(url)`.
  - Native Host: C API to init, load bytecode/IR, register FFI.
- Source maps for stack traces across boundaries.


## 26. Tooling Notes
- REPL: `ind repl` with multi-line editing, `:type expr`, `:load file.ind`.
- Transpiler: JS output with `--target node|browser|edge`, `--runtime-checks`.
- Source maps: VLQ mappings; stack trace mapper bundled.
- Linter & Formatter: `ind fmt`, `ind lint`.


## 27. Reserved Words & File Rules
- Reserved (union of earlier lists):
  `fn component let const if else elif for while break continue return import export async await try except finally raise in match case as type interface impl pub private true false null and or not`
- Files: `.ind` source. Generated artifacts placed in `dist/` by default.


## 28. Suggested Next Steps (Implementation Plan)
1. Lexer and parser (subset): identifiers, literals, `fn`, `let/const`, calls, binary ops, blocks, `component` with `render()` and basic JSX.
2. AST → JS emitter (ES modules). Implement name mangling for private items.
3. Minimal runtime for components (VDOM), `http.serve` (Node adapter), timers, and `std.json`.
4. CLI: `ind dev` (watch + incremental transpile), `ind build` (bundle with esbuild), `ind repl`.
5. Interop MVP: JS `ffi.js.call`, basic Python bridge via subprocess (CPython) for proof-of-concept.
6. Add type-checker pass with gradual constraints, simple inference.
7. Add INDX framework primitives: routing, loader, server actions, SSR/ISR.
8. Expand to WASM backend via IR; implement `std.graphics` minimal; plan OpenXR bindings.
9. Systems track: add `unsafe`, `extern`, `ptr<T>`, `alloc/free` behind feature flag; build a tiny userland tool that calls a syscall.
10. Author examples in `examples/` for web app, API, component, graphics, and interop.


# Appendix A. Operator and Grammar Notes
- Postfix unification avoids ambiguity between calls, members, and indexing.
- `match/case` reserved for future pattern matching addition.

# Appendix B. File/Project Layout Suggestions
- `specs/ind-spec.md` — this document
- `packages/ind-transpiler/` — transpiler source
- `packages/ind-runtime/` — shared runtime
- `framework/indx/` — INDX framework
- `examples/` — sample projects
- `tools/` — CLI


## 29. Grammar Extensions and Clarifications

This section formalizes features referenced elsewhere (annotations, comprehensions, component internals, interop namespaces, unsafe/extern/pointers, and Result `?`). These are add-ons to the grammar in section 4.

```
annotation      ::= "@" IDENT [ annotation_args ] NEWLINE
annotation_args ::= "(" [ arg_list ] ")"

annotated_decl  ::= { annotation } (fn_decl | comp_decl | type_decl | var_decl)

component_body  ::= NEWLINE INDENT { comp_member } DEDENT
comp_member     ::= state_decl | method_decl | render_decl | init_decl | destroy_decl | var_decl

state_decl      ::= "state" IDENT [ ":" type ] [ "=" expr ] NEWLINE
init_decl       ::= "fn" "init" "(" [ param_list ] ")" block
render_decl     ::= "fn" "render" "(" ")" block            ; returns jsx_fragment
destroy_decl    ::= "fn" "destroy" "(" ")" block
method_decl     ::= fn_decl                                    ; regular methods, `self` in scope

; Postfix already supports call/member/index; `self` is an implicit identifier bound in component methods

; Comprehensions (expression-level)
list_comp       ::= "[" comp_clause "]"
map_comp        ::= "{" comp_pair "}"                      
comp_clause     ::= expr "for" IDENT "in" expr { comp_guard }
comp_pair       ::= expr ":" expr "for" IDENT "in" expr { comp_guard }
comp_guard      ::= "if" expr

primary         ::= literal | IDENT | lambda_expr | "(" expr ")" 
                  | list_literal | map_literal | jsx_fragment
                  | list_comp | map_comp

; Unsafe/extern/pointers
unsafe_block    ::= "unsafe" ":" block
extern_decl     ::= "extern" [ abi_spec ] fn_sig NEWLINE
abi_spec        ::= IDENT                                      ; e.g., cdecl, sysv, wasm32, win64
fn_sig          ::= "fn" IDENT "(" [ param_list ] ")" [ "->" type ]

; Types: pointers and built-in sizes
ptr_type        ::= "ptr" "<" type ">"
size_type       ::= "usize" | "isize"
simple_type     ::= IDENT | "int" | "float" | "str" | "bool" | "any" | "void" | "null" | size_type | ptr_type

; Import namespaces for interop
import_path     ::= ( IDENT | "js" | "py" ) { "." IDENT }

; Result/Question-mark operator
question_expr   ::= postfix "?"                             ; only valid in functions returning Result<T,E>
postfix         ::= primary { ( call_suffix | member_suffix | index_suffix ) } [ "?" ]

; Attributes indicating placement
annotation_ident::= "server" | "client" | "action" | "ui" | IDENT
annotation      ::= "@" annotation_ident [ annotation_args ] NEWLINE
```

Semantics:
- **Annotations**: `@server` means function/component runs on server only; `@client` for client/hydrated code; `@action` exposes a server function callable from UI; `@ui` allows JSX outside components.
- **Components**: `state` creates reactive fields; `self` is implicitly bound in methods (`init`, `render`, `destroy`, and other `fn`s inside component scope).
- **Comprehensions**: translate to loops and pushes; evaluation order is left-to-right; guards filter items.
- **Unsafe**: only within `unsafe:` blocks are pointer arithmetic, raw deref, inline asm, and syscalls allowed.
- **Extern/ABI**: `extern cdecl fn name(...)` declares foreign symbol with ABI; linker/loader resolves at build/load time.
- **Pointers & sizes**: `ptr<T>`, `usize`, `isize` included in the type system; pointer comparisons valid in unsafe.
- **Result `?`**: Desugars to `match expr { Ok(v) => v, Err(e) => return Err(e) }`; using `?` requires enclosing function to return `Result<_,_>`.


## 30. Quick Start (Implementer & User)

- **Implementer (MVP path)**
  1. Lexer: implement tokens in section 2.
  2. Parser: implement grammar subset: declarations, statements, expressions, components, JSX, annotations.
  3. Emitter (JS): ES modules; map `component` to functions + runtime calls; `async` to JS async.
  4. Runtime: minimal VDOM, event wiring, `http.serve` for Node; `std.json` thin wrappers.
  5. CLI: `ind dev` (watch+emit), `ind build` (bundle with esbuild), `ind repl`.

- **User**
  1. `ind create myapp`
  2. Edit `app/page.ind`:
     ```
     component Page():
         render():
             <main>
                 <h1>Hello, IND</h1>
             </main>
     ```
  3. Run `ind dev` and open `http://localhost:3000`.


## 31. End-to-End Examples

### 31.1 Full-Stack page with loader and action (INDX)
```
@server
async fn loader(ctx):
    return { now: std.time.now() }

@action
async fn increment(x: int) -> int:
    return x + 1

@client
component Page(props):
    state count: int = 0
    render():
        <div>
            <p>Server time: {props.now}</p>
            <button on:click={async () => self.count = await increment(self.count)}>+1</button>
            <p>Count: {self.count}</p>
        </div>
```

### 31.2 Systems: direct syscall (Unix-like)
```
extern syscall fn write(fd: int, buf: ptr<u8>, len: usize) -> isize

unsafe:
    fn main():
        let msg = "hello\n"
        let p: ptr<u8> = std.mem.as_ptr(msg)
        _ = write(1, p, std.mem.len(msg))
```

### 31.3 Interop: JS + Python in one module
```
import js.node.fs as fs
import py.numpy as np

fn main():
    let arr = np.array([1,2,3])
    fs.writeFileSync("out.txt", arr.toString())
```

### 31.4 Graphics minimal window
```
import std.graphics as gfx

fn main():
    let app = gfx.create_app(title="Hello Window")
    let r = app.create_renderer(backend="webgpu")
    app.run(_ => { r.clear(0,0,0,1) })
```


## 32. Glossary

- **Task**: Async handle returned by `async fn`.
- **Hydration**: Client runtime attaching events to server-rendered markup.
- **SSR/ISR**: Server-Side Rendering / Incremental Static Regeneration.
- **Unsafe**: Region where safety checks are relaxed for low-level ops.
- **ABI**: Application Binary Interface used for foreign calls.

