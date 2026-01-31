import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import { getSortedPostsData } from '../../lib/posts';
import { prepareMDX } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';

export default function Post({ postData, mdxSource }) {
  return (
    <>
      <NextSeo 
        title={postData.title}
        description={postData.excerpt}
        openGraph={{
          title: postData.title,
          description: postData.excerpt,
          type: 'article',
          article: { publishedTime: postData.date }
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      
      <article data-testid="blog-post" className="max-w-3xl mx-auto px-4">
        <h1 data-testid="post-title" className="text-4xl font-bold mb-2">
          {postData.title}
        </h1>
        <div data-testid="reading-time" className="text-gray-500 mb-8">
          {postData.readingTime}
        </div>
        <div data-testid="post-content" className="prose dark:prose-invert">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'content', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const mdxSource = await prepareMDX(content);

  return {
    props: {
      postData: {
        slug: params.slug,
        ...data,
        readingTime: require('reading-time')(content).text,
      },
      mdxSource,
    },
  };
}