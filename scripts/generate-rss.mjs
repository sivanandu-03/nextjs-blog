import { writeFileSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'http://localhost:3000';
const postsDirectory = path.join(process.cwd(), 'posts');

async function generate() {
  const fileNames = readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  // Generate Sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc></url>
  <url><loc>${BASE_URL}/blog</loc></url>
  ${posts.map(post => `
  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
  </url>`).join('')}
</urlset>`;

  // Generate rss.xml
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Next.js Blog</title>
    <link>${BASE_URL}</link>
    <description>A high-performance SEO optimized blog</description>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${BASE_URL}/posts/${post.slug}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  writeFileSync('./public/sitemap.xml', sitemap);
  writeFileSync('./public/rss.xml', rss);
  console.log('✅ RSS and Sitemap generated successfully.');
}

generate();