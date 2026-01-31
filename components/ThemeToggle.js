import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button 
      data-testid="theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}