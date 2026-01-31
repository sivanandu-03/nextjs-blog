import Image from 'next/image';

const MDXComponents = {
  img: (props) => (
    <Image
      {...props}
      width={800}
      height={400}
      layout="responsive"
      data-testid="optimized-image"
      alt={props.alt || "Blog Image"}
    />
  ),
  pre: (props) => <pre data-testid="code-block" {...props} />,
};

export default MDXComponents;