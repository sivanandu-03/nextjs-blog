import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold">404</h1>
      <p data-testid="not-found-message" className="text-xl mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go back home
      </Link>
    </div>
  );
}  
