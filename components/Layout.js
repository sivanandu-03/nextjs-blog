import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <nav className="p-4 flex justify-between border-b">
        <span className="font-bold">MyBlog</span>
        <ThemeToggle />
      </nav>
      <main className="py-10">{children}</main>
    </div>
  );
} 
