import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef();

  const show = useCallback((text) => {
    setMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          msg ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-gold-400/60 bg-brand-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5 text-gold-400" />
          {msg}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useCopy() {
  const toast = useContext(ToastContext);
  return useCallback(
    async (text, label = '¡Copiado al portapapeles!') => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      toast(label);
    },
    [toast]
  );
}
