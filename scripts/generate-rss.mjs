import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
// Import the CommonJS module
import pkg from '../lib/posts.js';
const { getSortedPostsData } = pkg;

const URL = "http://localhost:3000";

function generate() {
  const posts = getSortedPostsData();
  
  // Ensure public directory exists
  if (!existsSync('./public')) {
    mkdirSync('./public');
  }

  // 1. Generate Sitemap (Requirement 9)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${URL}</loc></url>
      <url><loc>${URL}/blog/1</loc></url>
      ${posts.map(p => `<url><loc>${URL}/posts/${p.slug}</loc></url>`).join('')}
    </urlset>`;
    
  // 2. Generate RSS Feed (Requirement 10)
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Next.js Blog</title>
        <link>${URL}</link>
        <description>My high-performance SEO blog</description>
        ${posts.map(p => `
          <item>
            <title>${p.title}</title>
            <link>${URL}/posts/${p.slug}</link>
            <description>${p.excerpt}</description>
            <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>`;

  writeFileSync('./public/sitemap.xml', sitemap.trim());
  writeFileSync('./public/rss.xml', rss.trim());
  console.log('✅ Sitemap and RSS generated successfully!');
}

generate();