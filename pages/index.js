import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Recent Posts</h1>
      // Container
      <div data-testid="post-list">
        {posts.map(post => (
          <div key={post.slug} data-testid={`post-card-${post.slug}`}>
            <h2>{post.title}</h2>
            <Link href={`/posts/${post.slug}`} data-testid={`read-more-${post.slug}`}>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData().slice(0, 5); // Show first 5 on home
  return { props: { allPostsData } };
} 
