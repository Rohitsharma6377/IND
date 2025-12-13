import React from 'react';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import path from 'path';
import fs from 'fs/promises';
import { loadModule } from '../load.mjs';
import { getConfig } from '../config.mjs';
import { generateHtmlDoc } from './html.mjs';
import { injectDevViteScripts } from './vite-injector.mjs';

async function tryImport(file) {
    try { await fs.access(file); return await loadModule(file); } catch { return null; }
}

function splitHtml(html) {
    const marker = '<div id="__ind">';
    const i = html.indexOf(marker);
    if (i === -1) return [html, ''];
    const before = html.slice(0, i + marker.length);
    const after = html.slice(i + marker.length) || '';
    return [before, after];
}

export async function renderPageModule({ mod, ctx, assets }) {
    const getProps = typeof mod.getServerSideProps === 'function' ? mod.getServerSideProps : async () => ({ props: {} });
    const { props } = await getProps(ctx);
    const Component = mod.default || (() => React.createElement('div', null, 'No default export'));

    // Resolve nested layouts and heads walking up from the page directory
    const pagesDir = path.join(ctx.root, 'pages');
    const pageDir = path.dirname(ctx.pageFile || '');

    async function collectUp(fileName) {
        const items = [];
        let d = pageDir;
        while (d && d.startsWith(pagesDir)) {
            const jsx = path.join(d, `${fileName}.jsx`);
            const js = path.join(d, `${fileName}.js`);
            const mod = (await tryImport(jsx)) || (await tryImport(js));
            if (mod?.default) items.push(mod.default);
            if (d === pagesDir) break;
            d = path.dirname(d);
        }
        // add root-level fallback if not yet included
        if (!items.length) {
            const rootJx = await tryImport(path.join(pagesDir, `${fileName}.jsx`));
            const rootJs = await tryImport(path.join(pagesDir, `${fileName}.js`));
            const rootMod = rootJx || rootJs;
            if (rootMod?.default) items.push(rootMod.default);
        }
        return items; // from deepest to shallowest
    }

    const layoutComponents = await collectUp('_layout');
    const headComponents = await collectUp('_head');
    const appMod = (await tryImport(path.join(pagesDir, '_app.jsx'))) || (await tryImport(path.join(pagesDir, '_app.js')));

    // Compose content: page -> nested layouts (deepest first) -> _app outermost
    let content = React.createElement(Component, props);
    for (const L of layoutComponents) {
        content = React.createElement(L, { ...props }, content);
    }
    if (appMod?.default) {
        content = React.createElement(appMod.default, { ...props }, content);
    }

    const cfg = getConfig();
    const enableStreaming = !!cfg?.experimental?.streaming;
    const body = enableStreaming ? null : renderToString(content);
    const head = headComponents.length
        ? headComponents.map(H => renderToString(React.createElement(H, props))).join('\n')
        : '';

    // Page metadata
    let meta = mod.metadata || {};
    if (typeof mod.getMetadata === 'function') {
        try { meta = await mod.getMetadata(ctx) || meta; } catch { }
    }
    const title = meta.title || props?.title || 'INDJS App';
    const description = meta.description || '';

    // Include client CSS (built by Tailwind/PostCSS watcher) - only for dev mode
    const cssHref = ctx.dev ? '/__indjs/client/styles.css' : null;

    // Build Vite dev scripts if Vite dev bundler is enabled
    let devViteScripts = '';
    const usingViteDev = !!(ctx.dev && cfg?.experimental?.devBundler === 'vite');
    if (ctx.dev && usingViteDev) {
        devViteScripts = await injectDevViteScripts(ctx, pagesDir);
    }

    if (!enableStreaming) {
        return generateHtmlDoc({
            body,
            head,
            title,
            description,
            props,
            clientSrc: usingViteDev ? '' : assets?.clientSrc,
            cssHref: usingViteDev ? '' : cssHref,
            dev: !!ctx.dev,
            manifest: assets?.manifest,
            devViteScripts
        });
    }
    // Streaming: return a function that writes head and streams body
    return function stream(res) {
        const shell = generateHtmlDoc({
            body: '',
            head,
            title,
            description,
            props,
            clientSrc: usingViteDev ? '' : assets?.clientSrc,
            cssHref: usingViteDev ? '' : cssHref,
            dev: !!ctx.dev,
            manifest: assets?.manifest,
            devViteScripts
        });
        const [prefix, suffix] = splitHtml(shell);
        res.write(prefix);
        const { pipe } = renderToPipeableStream(content, {
            onShellReady() {
                pipe(res);
            },
            onAllReady() {
                res.write(suffix);
            },
            onError() {
                // best-effort close
            }
        });
    };
}
