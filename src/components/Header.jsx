import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 transition-colors ${
      scrolled ? 'border-b border-black/10 dark:border-white/10' : ''
    }`}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-amber-400 text-white">
            <Rocket className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-lg">SmartNotes AI</p>
            <p className="text-xs text-muted-foreground">Summarize • Tag • Search</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
