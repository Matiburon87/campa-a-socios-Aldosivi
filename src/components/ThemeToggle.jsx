import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'aldosivi-theme';
const media = () => window.matchMedia?.('(prefers-color-scheme: dark)');

const stored = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const apply = (dark) => document.documentElement.classList.toggle('dark', dark);

/** Theme follows the OS until the user picks one; the choice is remembered. */
function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const mq = media();
    if (!mq) return;
    const onChange = (e) => {
      if (!stored()) {
        apply(e.matches);
        setDark(e.matches);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    apply(next);
    setDark(next);
    try {
      localStorage.setItem(KEY, next ? 'dark' : 'light');
    } catch {
      /* storage unavailable: choice lasts this visit */
    }
  };

  return [dark, toggle];
}

export default function ThemeToggle({ className = '' }) {
  const [dark, toggle] = useTheme();
  const label = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10 text-gold-400 transition hover:bg-white/20 ${className}`}
    >
      <Sun className={`absolute h-[18px] w-[18px] transition-all duration-300 ${dark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
      <Moon className={`absolute h-[18px] w-[18px] transition-all duration-300 ${dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
    </button>
  );
}
