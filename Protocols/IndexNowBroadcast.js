/* ESEB SERVERLESS RUNNER ENGINE | V-STAMP-24 | ¢24 */
const https = require('https');
const { URL } = require('url');

const CONFIG = {
    stamp: "V-STAMP-24",
    anchor: "¢24",
    repo: "donabico-media-system/path-00001",
    domain: "https://donabico.com/path-00001",
    key: "24242424242424242424242424242424",
    endpoints: [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow"
    ]
};

console.log(`[${CONFIG.stamp}] [${CONFIG.anchor}] STARTING SERVERLESS RUNNER BROADCAST PIPELINE...`);
console.log(`--> Target Custom Domain: ${CONFIG.domain}/`);

const payload = JSON.stringify({
    host: "donabico.com",
    key: CONFIG.key,
    keyLocation: `${CONFIG.domain}/${CONFIG.key}.txt`,
    urlList: [
        `${CONFIG.domain}/`,
        `${CONFIG.domain}/sitemap.xml`
    ]
});

let completed = 0;

CONFIG.endpoints.forEach((targetUrl) => {
    const targetParsed = new URL(targetUrl);
    const options = {
        hostname: targetParsed.hostname,
        port: 443,
        path: targetParsed.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload),
            'User-Agent': 'ESEB-V3000-Serverless-Runner'
        }
    };

    const req = https.request(options, (res) => {
        console.log(`[${CONFIG.stamp}] BROADCAST TO ${targetParsed.hostname} -> HTTP STATUS: ${res.statusCode}`);
        completed++;
        if (completed === CONFIG.endpoints.length) {
            process.exit(0);
        }
    });

    req.on('error', (e) => {
        console.error(`[${CONFIG.stamp}] BROADCAST ERROR (${targetParsed.hostname}): ${e.message}`);
        completed++;
        if (completed === CONFIG.endpoints.length) {
            process.exit(0);
        }
    });

    req.write(payload);
    req.end();
});

setTimeout(() => {
    process.exit(0);
}, 5000);
