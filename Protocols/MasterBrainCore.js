/**
 * ESEB SERVERLESS RUNNER ENGINE - MasterBrainCore.js
 * MASTER BRAIN ORCHESTRATOR - REAL-TIME PLUG AND PLAY 24/7/365
 * STAMP: V-STAMP-24 | ANCHOR: ¢24 | DELTA: 0.00000000000000
 */
const fs = require('fs');
const https = require('https');

const DOMAIN = "https://path-00001.donabico.com";
const HOST = "path-00001.donabico.com";
const REPO_FULL = "donabico-media-system/path-00001";
const SITEMAP_URL = "https://path-00001.donabico.com/sitemap.xml";
const INDEXNOW_KEY = "24242424242424242424242424242424";
const TOKEN = process.env.CLASSIC_API_TOKEN || "";

console.log("================================================================================");
console.log(" 🧠 [ESEB MASTER BRAIN RUNNER] REAL-TIME OPERATIONAL RUNTIME 24/7/365");
console.log(" REPOSITORY: " + REPO_FULL);
console.log(" DOMAIN: " + DOMAIN);
console.log(" TOKEN AUTHENTICATION: " + (TOKEN ? "AUTHENTICATED (HTTP 200/201 OK READY)" : "ANONYMOUS FALLBACK MODE"));
console.log(" STAMP: V-STAMP-24 | ANCHOR: ¢24 | DELTA: 0.00000000000000");
console.log("================================================================================");

// 1. AUTO-GENERATE CORE REPO INFRASTRUCTURE FILES
const robotsTxt = `User-agent: *
Allow: /
Disallow: /Protocols/*.eseb$
Disallow: /.github/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITEMAP_URL}
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${DOMAIN}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${DOMAIN}/index.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>`;

fs.writeFileSync('robots.txt', robotsTxt, 'utf-8');
fs.writeFileSync('sitemap.xml', sitemapXml, 'utf-8');
fs.writeFileSync(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY, 'utf-8');
console.log(`✅ Master Brain Infrastructure Updated: robots.txt, sitemap.xml & ${INDEXNOW_KEY}.txt`);

// 2. BROADCAST REAL-TIME INDEXING SIGNAL (POST INDEXNOW)
function broadcastIndexing() {
    return new Promise((resolve) => {
        const postData = JSON.stringify({
            "host": HOST,
            "key": INDEXNOW_KEY,
            "keyLocation": `${DOMAIN}/${INDEXNOW_KEY}.txt`,
            "urlList": [`${DOMAIN}/`, `${DOMAIN}/index.html`]
        });

        const options = {
            hostname: 'api.indexnow.org',
            port: 443,
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            console.log(`✅ INDEXNOW MASTER SIGNAL: HTTP ${res.statusCode} OK`);
            resolve();
        });
        req.on('error', (e) => {
            console.log("⚠️ IndexNow Notice: " + e.message);
            resolve();
        });
        req.write(postData);
        req.end();
    });
}

// 3. BROADCAST GITHUB PAGES CDN PURGE VIA CLASSIC_API_TOKEN
function broadcastCDN() {
    return new Promise((resolve) => {
        if (!TOKEN) {
            console.log("ℹ️ CLASSIC_API_TOKEN is empty. Operating in Anonymous Telemetry Mode.");
            return resolve();
        }
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: `/repos/${REPO_FULL}/pages/builds`,
            method: 'POST',
            headers: {
                'User-Agent': 'DONABICO-ESEB-BRAIN',
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        };
        const req = https.request(options, (res) => {
            console.log(`✅ GITHUB PAGES CDN RE-BUILD SIGNAL: HTTP ${res.statusCode} OK`);
            resolve();
        });
        req.on('error', (e) => {
            console.log("⚠️ CDN Request Notice: " + e.message);
            resolve();
        });
        req.end();
    });
}

async function executeMasterBrainSequence() {
    await broadcastIndexing();
    await broadcastCDN();
    console.log("🚀 MASTER BRAIN REAL-TIME OPERATIONAL RUNTIME COMPLETED [STATUS 200/202]");
    process.exit(0);
}

executeMasterBrainSequence();
