import Image from 'next/image';

const MDXComponents = {
  // Requirement 7: Optimized Images with next/image
  img: (props) => (
    <div className="my-4">
      <Image
        {...props}
        width={800}
        height={400}
        layout="responsive"
        data-testid="optimized-image" // MANDATORY TEST ID
        alt={props.alt || "Post image"}
      />
    </div>
  ),
  // Requirement 6: Syntax Highlighting Code Blocks
  pre: (props) => (
    <pre data-testid="code-block" {...props} className="rounded-lg overflow-hidden">
      {props.children}
    </pre>
  ),
};

export default MDXComponents;