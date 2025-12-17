import path from "path";
import { createRequire } from "module";
import { getConfig } from "./config.mjs";

// Start a Vite dev server and mount its middlewares onto our Express app
// Returns the created Vite server instance
export async function startVite({ app, root, bus }) {
  const cfg = getConfig();
  const appRoot = root;

  // Resolve vite and plugin from the APP's node_modules
  const appRequire = createRequire(path.join(appRoot, "package.json"));
  const { createServer } = appRequire("vite");
  const reactPlugin = appRequire("@vitejs/plugin-react").default;
  const { fileURLToPath } = await import("url");

  const frameworkDir = path.dirname(fileURLToPath(import.meta.url));
  const emptyMock = path.join(frameworkDir, "mocks", "empty.mjs");

  const vite = await createServer({
    root: appRoot,
    // Explicitly include indjs files in react plugin processing, even though they are in node_modules
    plugins: [
      reactPlugin({
        include: /\.(jsx|tsx|mjs|js)$/,
        exclude: /node_modules\/(?!indjs)/,
        babel: {
          parserOpts: {
            plugins: ["decorators-legacy", "classProperties"],
          },
        },
      }),
    ],
    server: {
      middlewareMode: true,
      hmr: {
        clientPort: typeof cfg?.port === "number" ? cfg.port : undefined,
      },
    },
    appType: "custom",
    clearScreen: false,
    optimizeDeps: {
      // Exclude indjs so it uses the plugin pipeline (loading .mjs as JSX)
      exclude: ["indjs"],
      esbuildOptions: {
        loader: {
          ".js": "jsx",
          ".mjs": "jsx",
          ".jsx": "jsx",
        },
      },
    },
    esbuild: {
      loader: "jsx",
      include: /.*\.(m?js|jsx|tsx)$/,
      exclude: [],
    },
    resolve: {
      extensions: [".jsx", ".mjs", ".js", ".ts", ".tsx", ".json"],
      alias: {
        pg: emptyMock,
        sqlite: emptyMock,
        "node-mocks-http": emptyMock,
        "mock-aws-s3": emptyMock,
        nock: emptyMock,
        "node-fetch": emptyMock,
        fs: emptyMock,
        path: emptyMock,
        stream: emptyMock,
        util: emptyMock,
        http: emptyMock,
      },
    },
  });

  // Mount Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Forward Vite errors to our overlay bus in a best-effort manner
  // Vite sends HMR error overlays itself; we also emit our SSE so our UI stays consistent
  const sendError = (e) => {
    try {
      bus?.emit?.("error", {
        message: String(e?.message || e || "Vite error"),
      });
    } catch {}
  };
  vite.watcher.on("error", sendError);
  vite.middlewares.on("error", sendError);

  return vite;
}
