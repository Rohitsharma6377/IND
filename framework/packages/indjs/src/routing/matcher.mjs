export function matchDynamic(pathname, routes) {
    for (const r of routes) {
        const m = r.pattern.exec(pathname);
        if (m) {
            const params = {};
            r.names.forEach((n, i) => (params[n] = decodeURIComponent(m[i + 1])));
            return { route: r, params };
        }
    }
    return null;
}

export function isDynamicRoute(routePath) {
    return /\[[^/]+\]/.test(routePath);
}
