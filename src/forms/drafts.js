import { useEffect, useState } from 'react';
import { forms as formDefs } from '../data/forms.js';

/**
 * Form drafts live in this browser's localStorage, one key per form.
 * Shared by FormPage (read/write), the Formularios section and Inicio (progress badges).
 */

export const initialState = (form) => ({
  consent: null,
  fields: form.fields.map(() => ''),
  answers: form.questions.map((q) => {
    if (q.type === 'multi') return q.defaults ?? [];
    if (q.type === 'text') return '';
    return null; // radio groups never start pre-selected
  }),
});

const storageKey = (slug) => `aldosivi-form:${slug}`;

export const isAnswered = (q, a) => (q.type === 'multi' ? a.length > 0 : q.type === 'text' ? a.trim() !== '' : a !== null);

function readRaw(form) {
  try {
    const raw = localStorage.getItem(storageKey(form.slug));
    if (!raw) return null;
    const d = JSON.parse(raw);
    return d.answers?.length === form.questions.length && d.fields?.length === form.fields.length ? d : null;
  } catch {
    return null; // storage unavailable or corrupted: treat as no draft
  }
}

export const loadDraft = (form) => readRaw(form) ?? initialState(form);

export function saveDraft(form, state) {
  try {
    localStorage.setItem(storageKey(form.slug), JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
  } catch {
    /* ignore: drafts are a convenience */
  }
}

export function clearDraft(form) {
  try {
    localStorage.removeItem(storageKey(form.slug));
  } catch {
    /* ignore */
  }
}

const sameAs = (a, b) =>
  JSON.stringify([a.consent, a.fields, a.answers]) === JSON.stringify([b.consent, b.fields, b.answers]);

/** null when there is no draft (or it only holds the form's defaults); otherwise its progress. */
export function draftStatus(form) {
  const d = readRaw(form);
  if (!d || sameAs(d, initialState(form))) return null;
  const answered = form.questions.filter((q, i) => isAnswered(q, d.answers[i])).length;
  const name = d.fields[0]?.trim() || null;
  return { answered, total: form.questions.length, savedAt: d.savedAt ?? null, name };
}

/** Draft status per form number, refreshed if another browser tab edits a draft. */
export function useDrafts() {
  const read = () => Object.fromEntries(formDefs.map((f) => [f.n, draftStatus(f)]));
  const [drafts, setDrafts] = useState(read);
  useEffect(() => {
    const onStorage = (e) => e.key?.startsWith('aldosivi-form:') && setDrafts(read());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return [drafts, () => setDrafts(read())];
}

/** ISO date → "hace 5 min". */
export function ago(iso) {
  if (!iso) return null;
  const min = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (min < 1) return 'recién';
  if (min < 60) return `hace ${min} min`;
  if (min < 1440) return `hace ${Math.round(min / 60)} h`;
  return `hace ${Math.round(min / 1440)} d`;
}
