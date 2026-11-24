import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const show = useCallback((text, { error = false } = {}) => {
    setToast({ text, error });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), error ? 4000 : 2400);
  }, []);

  const Icon = toast?.error ? AlertTriangle : CheckCircle2;

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div
          className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold text-white shadow-2xl ${
            toast?.error ? 'border-red-400/60 bg-red-900' : 'border-gold-400/60 bg-brand-900'
          }`}
        >
          <Icon className={`h-5 w-5 ${toast?.error ? 'text-red-300' : 'text-gold-400'}`} />
          {toast?.text}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

/** Legacy copy for browsers/contexts without the async Clipboard API (e.g. plain http). */
function copyWithTextarea(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  // Off-screen and fixed, so appending it does not scroll or reflow the page.
  ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

export function useCopy() {
  const toast = useContext(ToastContext);
  return useCallback(
    async (text, label = '¡Copiado al portapapeles!') => {
      let ok = true;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        ok = copyWithTextarea(text);
      }
      if (ok) toast(label);
      else toast('No se pudo copiar: seleccioná el texto y copialo a mano', { error: true });
    },
    [toast]
  );
}
