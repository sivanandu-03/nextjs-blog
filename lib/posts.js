const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const postsDirectory = path.join(process.cwd(), 'content');

function getSortedPostsData() {
  // Check if directory exists to avoid build errors
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      readingTime: readingTime(content).text,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

module.exports = { getSortedPostsData };