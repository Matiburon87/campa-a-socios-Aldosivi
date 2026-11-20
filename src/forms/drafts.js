/**
 * Form drafts live in this browser's localStorage, one key per form.
 * Shared by FormPage (read/write) and the Encuestas tab (progress badges).
 */

export const initialState = (form) => ({
  consent: form.intro.consent ? 0 : null,
  fields: form.fields.map(() => ''),
  answers: form.questions.map((q) => {
    if (q.type === 'multi') return q.defaults ?? [];
    if (q.type === 'text') return '';
    return q.defaults?.[0] ?? null;
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
