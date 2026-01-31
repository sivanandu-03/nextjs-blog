import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import { getSortedPostsData } from '../../lib/posts';
import { prepareMDX } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';
import readingTime from 'reading-time'; 

export default function Post({ postData, mdxSource }) {
  return (
    <>
      <NextSeo 
        title={postData.title}
        description={postData.excerpt}
        openGraph={{
          title: postData.title,
          description: postData.excerpt,
          url: `https://yourdomain.com/posts/${postData.slug}`,
          type: 'article',
          article: {
            publishedTime: postData.date,
            authors: [postData.author],
            tags: postData.tags,
          },
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      
      <article data-testid="blog-post" className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 data-testid="post-title" className="text-4xl font-bold mb-2">
            {postData.title}
          </h1>
          <div data-testid="reading-time" className="text-gray-500 italic">
            {postData.readingTime}
          </div>
        </header>

        <div data-testid="post-content" className="prose dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { 
    paths, 
    fallback: false 
  };
}

export async function getStaticProps({ params }) {
  // CHANGE: Updated from 'content' to 'posts'
  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const mdxSource = await prepareMDX(content);

  return {
    props: {
      postData: {
        slug: params.slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || null,
        author: data.author || 'Anonymous',
        tags: data.tags || [],
        readingTime: readingTime(content).text,
      },
      mdxSource,
    },
  };
}