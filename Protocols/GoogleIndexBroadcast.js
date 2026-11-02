/* ESEB GOOGLE INDEXING RUNNER ENGINE | V-STAMP-24 | ¢24 */
const https = require('https');
const { URL } = require('url');

const CONFIG = {
    stamp: "V-STAMP-24",
    anchor: "¢24",
    domain: "https://donabico.com/path-00001",
    sitemap: "https://donabico.com/path-00001/sitemap.xml"
};

console.log(`[${CONFIG.stamp}] STARTING GOOGLE SITEMAP PING ENGINE...`);
console.log(`--> Target Domain: ${CONFIG.domain}/`);

const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(CONFIG.sitemap)}`;
const parsedUrl = new URL(pingUrl);

const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ESEB-GoogleBot-Ping/1.0)'
    }
};

const req = https.request(options, (res) => {
    console.log(`[${CONFIG.stamp}] GOOGLE SITEMAP PING STATUS: ${res.statusCode}`);
    process.exit(0);
});

req.on('error', (e) => {
    console.error(`[${CONFIG.stamp}] GOOGLE PING ERROR: ${e.message}`);
    process.exit(0);
});

req.end();
setTimeout(() => process.exit(0), 4000);
