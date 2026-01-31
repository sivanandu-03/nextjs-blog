import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';

const POSTS_PER_PAGE = 10;

export default function BlogPage({ posts, currentPage, totalPages }) {
  return (
    <div className="container mx-auto">
      <div data-testid="post-list">
        {posts.map((post) => (
          /* Render PostCards here similarly to index.js */
          <div key={post.slug} data-testid={`post-card-${post.slug}`}>{post.title}</div>
        ))}
      </div>

      {totalPages > 1 && (
        <div data-testid="pagination" className="flex gap-4 mt-8">
          {currentPage > 1 && (
            <Link href={`/blog/${currentPage - 1}`} data-testid="pagination-prev">Previous</Link>
          )}
          <Link href={`/blog/${currentPage + 1}`} data-testid="pagination-next">Next</Link>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: numPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const allPosts = getSortedPostsData();
  const page = parseInt(params.page);
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return {
    props: {
      posts,
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
    },
  };
}  
