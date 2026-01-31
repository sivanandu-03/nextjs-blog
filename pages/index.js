import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Recent Posts</h1>
      <div data-testid="post-list" className="grid gap-6">
        {allPostsData.map(({ slug, title, excerpt, date }) => (
          <div key={slug} data-testid={`post-card-${slug}`} className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <Link href={`/posts/${slug}`} data-testid={`read-more-${slug}`} className="text-blue-600 hover:underline">
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
