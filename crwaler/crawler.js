// /**
//  * Polite site crawler that builds sitemap.xml
//  *
//  * Usage:
//  *   node crawler.js https://example.com
//  *
//  * Options (edit constants below):
//  * - MAX_PAGES: maximum number of pages to include in sitemap
//  * - MAX_CONCURRENCY: number of simultaneous fetches
//  * - REQUEST_DELAY_MS: minimum delay between requests to the same host (politeness)
//  *
//  * IMPORTANT:
//  * - This crawler respects robots.txt and will skip disallowed URLs.
//  * - It only crawls the same-origin URLs as the seed URL.
//  */

// const axios = require('axios');
// const cheerio = require('cheerio');
// const robotsParser = require('robots-parser');
// const pLimit = require('p-limit');
// const { create } = require('xmlbuilder2');
// const { URL } = require('url');
// const fs = require('fs');
// const path = require('path');

// const USER_AGENT = 'MySiteCrawler/1.0 (+https://www.codeqlik.com/)';
// const MAX_PAGES = 500;           // max URLs to include in sitemap
// const MAX_CONCURRENCY = 6;       // concurrent requests
// const REQUEST_DELAY_MS = 300;    // delay between requests (ms) per worker

// if (process.argv.length < 3) {
//   console.error('Usage: node crawler.js <start-url>');
//   process.exit(1);
// }

// const startUrl = process.argv[2].replace(/\/+$/, ''); // remove trailing slash
// const startOrigin = new URL(startUrl).origin;

// const visited = new Set();
// const queue = [startUrl];
// const sitemapUrls = [];
// let robots = null;
// let lastRequestTime = 0;

// async function fetchRobotsTxt(origin) {
//   try {
//     const robotsUrl = `${origin}/robots.txt`;
//     const res = await axios.get(robotsUrl, { timeout: 8000, headers: { 'User-Agent': USER_AGENT } });
//     return robotsParser(robotsUrl, res.data);
//   } catch (err) {
//     // If robots.txt not found or error, allow everything by returning parser with empty rules
//     return robotsParser(`${origin}/robots.txt`, '');
//   }
// }

// function normalizeUrl(u) {
//   try {
//     const url = new URL(u, startOrigin);
//     // Remove fragment
//     url.hash = '';
//     // Normalize trailing slash: keep root with slash, remove slash for others
//     if (url.pathname !== '/' && url.pathname.endsWith('/')) {
//       url.pathname = url.pathname.replace(/\/+$/, '');
//     }
//     // Remove default ports
//     url.port = url.port === '80' || url.port === '443' ? '' : url.port;
//     return url.toString();
//   } catch (e) {
//     return null;
//   }
// }

// async function politeFetch(url) {
//   // Ensure minimal delay between requests
//   const now = Date.now();
//   const delta = now - lastRequestTime;
//   if (delta < REQUEST_DELAY_MS) {
//     await new Promise(r => setTimeout(r, REQUEST_DELAY_MS - delta));
//   }
//   lastRequestTime = Date.now();
//   const res = await axios.get(url, {
//     headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' },
//     timeout: 10000,
//     maxRedirects: 5
//   });
//   return res;
// }

// function extractLinks(html, baseUrl) {
//   const $ = cheerio.load(html);
//   const links = new Set();

//   $('a[href]').each((i, el) => {
//     const href = $(el).attr('href');
//     if (!href) return;
//     // ignore mailto:, tel:, javascript:
//     if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
//     const normalized = normalizeUrl(href, baseUrl);
//     if (normalized) links.add(normalized);
//   });

//   // also consider canonical link
//   const canonical = $('link[rel="canonical"]').attr('href');
//   if (canonical) {
//     const n = normalizeUrl(canonical);
//     if (n) links.add(n);
//   }

//   return Array.from(links);
// }

// async function crawl() {
//   // Load robots.txt
//   robots = await fetchRobotsTxt(startOrigin);
//   console.log('Robots.txt loaded for', startOrigin);

//   const limit = pLimit(MAX_CONCURRENCY);

//   while (queue.length > 0 && sitemapUrls.length < MAX_PAGES) {
//     const url = queue.shift();
//     if (!url) continue;

//     if (visited.has(url)) continue;

//     // Check same-origin
//     try {
//       const u = new URL(url);
//       if (u.origin !== startOrigin) {
//         // skip other origins
//         continue;
//       }
//     } catch (e) {
//       continue;
//     }

//     // robots.txt check
//     if (!robots.isAllowed(url, USER_AGENT)) {
//       console.log('Skipped by robots.txt:', url);
//       visited.add(url);
//       continue;
//     }

//     // mark as visited to avoid duplicates while queued tasks run
//     visited.add(url);

//     // schedule the fetch, but we await concurrency via p-limit
//     const task = limit(async () => {
//       try {
//         console.log('Fetching:', url);
//         const res = await politeFetch(url);
//         const contentType = res.headers['content-type'] || '';
//         if (!contentType.includes('text/html')) {
//           // not HTML; add to sitemap but do not parse links
//           sitemapUrls.push({ loc: url, lastmod: res.headers['last-modified'] || null });
//           return;
//         }

//         const html = res.data;
//         sitemapUrls.push({ loc: url, lastmod: res.headers['last-modified'] || null });

//         // extract links and enqueue new ones
//         const links = extractLinks(html, url);
//         for (const l of links) {
//           if (sitemapUrls.length + queue.length > MAX_PAGES) break; // prevent explosion
//           if (!visited.has(l) && !queue.includes(l)) {
//             // same origin check already in normalizeUrl
//             const u = new URL(l);
//             if (u.origin === startOrigin) queue.push(l);
//           }
//         }
//       } catch (err) {
//         console.warn('Error fetching', url, err && err.message ? err.message : err);
//       }
//     });

//     // wait for at least one slot to free if concurrency cap reached:
//     // p-limit handles concurrency internally; here we await small promise tick to allow tasks to run
//     await Promise.resolve(); // allow tasks to start
//   }

//   // Wait for all running tasks to finish
//   await limit(() => Promise.resolve());

//   // Build sitemap
//   buildSitemap();
// }

// function buildSitemap() {
//   const root = { urlset: { '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', url: [] } };
//   for (const u of sitemapUrls) {
//     const urlEntry = { loc: u.loc };
//     if (u.lastmod) {
//       // try to format lastmod as ISO (best-effort)
//       try {
//         const d = new Date(u.lastmod);
//         if (!isNaN(d)) urlEntry.lastmod = d.toISOString();
//       } catch {}
//     }
//     root.urlset.url.push(urlEntry);
//   }

//   const doc = create(root);
//   const xml = doc.end({ prettyPrint: true });
//   const outPath = path.resolve(process.cwd(), 'sitemap.xml');
//   fs.writeFileSync(outPath, xml, 'utf8');
//   console.log('Sitemap written to', outPath, 'with', sitemapUrls.length, 'URLs');
// }

// crawl().catch(err => {
//   console.error('Crawler error', err);
// });
const puppeteer = require('puppeteer');
const fs = require('fs');
const { create } = require('xmlbuilder2');
const { URL } = require('url');

const START_URL = 'https://codeqlik.com';
const MAX_PAGES = 200;

const visited = new Set();
const queue = [START_URL];
const sitemapUrls = [];

async function crawl() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  while (queue.length > 0 && sitemapUrls.length < MAX_PAGES) {
    const url = queue.shift();
    if (visited.has(url)) continue;

    try {
      console.log('Visiting:', url);
      visited.add(url);

      await page.goto(url, { waitUntil: 'networkidle2' });

      sitemapUrls.push({ loc: url });

      // Extract all links from the page
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.href).filter(h => h.startsWith(window.location.origin))
      );

      for (const link of links) {
        const normalized = new URL(link).toString();
        if (!visited.has(normalized) && !queue.includes(normalized)) {
          queue.push(normalized);
        }
      }

    } catch (err) {
      console.log('Error visiting', url, err.message);
    }
  }

  await browser.close();
  buildSitemap();
}

function buildSitemap() {
  const root = { urlset: { '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', url: [] } };
  for (const u of sitemapUrls) {
    root.urlset.url.push({ loc: u.loc });
  }

  const xml = create(root).end({ prettyPrint: true });
  fs.writeFileSync('sitemap.xml', xml);
  console.log('Sitemap generated with', sitemapUrls.length, 'URLs');
}

crawl();
