import net from 'net';
import fsSync from 'fs';
import path from 'path';

export async function findAvailablePort(startPort, tries = 20) {
    let p = startPort;
    for (let i = 0; i < tries; i++, p++) {
        const free = await new Promise(resolve => {
            const srv = net.createServer();
            srv.once('error', () => resolve(false));
            srv.once('listening', () => srv.close(() => resolve(true)));
            srv.listen(p, '0.0.0.0');
        });
        if (free) return p;
    }
    throw new Error(`No free port found starting at ${startPort}`);
}

export function parseErrorLocation(e) {
    try {
        const s = String(e && e.stack || '');
        // Match C:\path\file.tsx:82:1 or /path/file.tsx:82:1
        const m = s.match(/\(?([A-Za-z]:\\[^):]+|\/[^):]+):(\d+):(\d+)\)?/);
        if (m) return { file: m[1].replace(/\\/g, '/'), line: parseInt(m[2], 10), column: parseInt(m[3], 10) };
        return null;
    } catch { return null; }
}

export function makeCodeFrame(file, line, column, pad = 3) {
    try {
        if (!file || !fsSync.existsSync(file)) return null;
        const txt = fsSync.readFileSync(file, 'utf8').split(/\r?\n/);
        const start = Math.max(1, (line || 1) - pad);
        const end = Math.min(txt.length, (line || 1) + pad);
        const lines = [];
        for (let i = start; i <= end; i++) {
            lines.push({ n: i, code: txt[i - 1], highlight: i === line, column: i === line ? (column || 0) : 0 });
        }
        return { file, line, column, lines };
    } catch { return null; }
}

export async function serveImage(req, res, next, root, bus) {
    try {
        const { src, w, q } = req.query;
        if (!src || typeof src !== 'string' || /^(https?:)?\/\//.test(src)) return res.status(400).send('Invalid src');

        let sharp;
        try {
            const mod = await import('sharp');
            sharp = mod.default;
        } catch (e) {
            console.warn('[indjs] sharp not found, skipping image optimization');
            // Fallback: Redirect to original image or stream it directly
            // For now, just stream the original file
            const filePath = path.join(root, 'public', src.replace(/^\//, ''));
            return res.sendFile(filePath);
        }

        const width = w ? parseInt(String(w), 10) : undefined;
        const quality = q ? parseInt(String(q), 10) : 80;
        const filePath = path.join(root, 'public', src.replace(/^\//, ''));
        const image = sharp(filePath);
        if (width) image.resize({ width, withoutEnlargement: true });
        const buf = await image.jpeg({ quality }).toBuffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(buf);
    } catch (e) { bus.emit('error', e); next(e); }
}
