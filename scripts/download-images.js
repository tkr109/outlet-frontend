const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTDIR = path.join(__dirname, '..', 'public', 'images');

// Carousel images — download at 1200px for full-width hero
const carouselPhotoIds = [
  'photo-1558030006-450675393462',
  'photo-1568901346375-23c9450c58cd',
  'photo-1513104890138-7c749659a591',
  'photo-1512621776951-a57141f2eefd',
  'photo-1473093295043-cdd812d0e601',
  'photo-1615141982883-c7ad0e69fd62',
];

// All other unique photo IDs — download at 800px
const otherPhotoIds = [
  'photo-1546069901-ba9599a7e63c',
  'photo-1550304943-4f24f54ddde9',
  'photo-1604152135912-04a022e23696',
  'photo-1563379926898-05f4575a45d8',
  'photo-1488477181946-6428a0291777',
  'photo-1586816001966-79b736744398',
  'photo-1550317138-10000687a72b',
  'photo-1606755962773-d324e0a13086',
  'photo-1551782450-a2132b4ba21d',
  'photo-1528735602780-2552fd46c7af',
  'photo-1550547660-d9450f859349',
  'photo-1619740455993-9d91b79f3093',
  'photo-1529006557810-274b9b2fc783',
  'photo-1600891964092-4316c288032e',
  'photo-1544025162-d76694265947',
  'photo-1529692236671-f1f6cf9683ba',
  'photo-1529193591184-b1d58069ecdd',
  'photo-1633321702518-7feccafb94d5',
  'photo-1561651188-d207bbec4ec3',
  'photo-1599487488170-d11ec9c172f0',
  'photo-1567620905732-2d1ec7ab7445',
  'photo-1562967914-608f82629710',
  'photo-1547058881-aa0edd92aab3',
  'photo-1581006852262-e4307cf6283a',
  'photo-1548839140-29a749e1cf4d',
  'photo-1556679343-c7306c1976bc',
  'photo-1621506289937-a8e4df240d0b',
  'photo-1622543925917-763c34d1a86e',
  'photo-1630384060421-cb20d0e0649d',
  'photo-1639024471283-03518883512d',
  'photo-1585109649139-366815a0d713',
  'photo-1504674900247-0877df9cc836',
  'photo-1540189549336-e6e99c3679fe',
  'photo-1555939594-58d7cb561ad1',
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          follow(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      }).on('error', reject);
    };
    follow(url);
  });
}

async function main() {
  fs.mkdirSync(OUTDIR, { recursive: true });

  const tasks = [];

  for (const id of carouselPhotoIds) {
    const url = `https://images.unsplash.com/${id}?fm=webp&q=80&w=1200&fit=crop`;
    const dest = path.join(OUTDIR, `${id}.webp`);
    tasks.push({ id, url, dest, size: '1200w' });
  }

  for (const id of otherPhotoIds) {
    const url = `https://images.unsplash.com/${id}?fm=webp&q=80&w=800&fit=crop`;
    const dest = path.join(OUTDIR, `${id}.webp`);
    tasks.push({ id, url, dest, size: '800w' });
  }

  // Download 5 at a time
  const BATCH = 5;
  for (let i = 0; i < tasks.length; i += BATCH) {
    const batch = tasks.slice(i, i + BATCH);
    await Promise.all(batch.map(async (t) => {
      if (fs.existsSync(t.dest)) {
        console.log(`SKIP ${t.id} (exists)`);
        return;
      }
      console.log(`GET  ${t.id} [${t.size}]`);
      try {
        await download(t.url, t.dest);
        console.log(`OK   ${t.id}`);
      } catch (err) {
        const w = t.size === '1200w' ? 1200 : 800;
        const fallback = `https://images.unsplash.com/${t.id}?q=80&w=${w}&auto=format&fit=crop`;
        console.log(`RETRY ${t.id} with auto=format`);
        try {
          await download(fallback, t.dest);
          console.log(`OK   ${t.id} (fallback)`);
        } catch (err2) {
          console.log(`FAIL ${t.id} — ${err2.message}`);
        }
      }
    }));
  }

  console.log(`\nDone. ${tasks.length} images in ${OUTDIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
