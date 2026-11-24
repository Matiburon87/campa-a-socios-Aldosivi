import { Component } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * Catches render errors (including a lazy chunk that failed to load, e.g. after a deploy
 * replaced its hash) so one broken section does not unmount the whole app.
 * Give it a `key` per route so navigating elsewhere resets it.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="card mx-auto my-8 max-w-xl space-y-4 p-6 text-center">
        <p className="font-display text-lg font-bold text-ink">No pudimos cargar esta sección.</p>
        <p className="text-sm text-slate-600">Revisá tu conexión o recargá la página para obtener la última versión.</p>
        <button type="button" onClick={() => window.location.reload()} className="btn-gold mx-auto">
          <RotateCcw className="h-4 w-4" /> Reintentar
        </button>
      </div>
    );
  }
}
