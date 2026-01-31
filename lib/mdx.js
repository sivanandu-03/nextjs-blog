import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus'; // For Requirement #6 (Syntax highlighting)

export async function prepareMDX(content) {
  return await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
  });
}