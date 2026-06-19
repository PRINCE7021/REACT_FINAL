const VALID_BASES = new Set(['A', 'T', 'G', 'C']);

export const BASE_COLORS = {
  A: '#22c55e', // green
  T: '#ef4444', // red
  G: '#3b82f6', // blue
  C: '#eab308' // yellow
};

/**
 * Validates a raw DNA string. Only A, T, G, C (case-insensitive) are allowed.
 * Whitespace is stripped before validation.
 * @param {string} raw
 * @returns {{ valid: boolean, cleaned: string, invalidChars: string[] }}
 */
export function validateSequence(raw) {
  const cleaned = (raw || '').replace(/\s+/g, '').toUpperCase();
  const invalidChars = Array.from(new Set(cleaned.split('').filter((ch) => !VALID_BASES.has(ch))));
  return {
    valid: invalidChars.length === 0 && cleaned.length > 0,
    cleaned,
    invalidChars
  };
}

/**
 * Counts mutations (positional differences) between an original and edited sequence.
 * Sequences are compared up to the shorter length; length differences count as mutations too.
 */
export function countMutations(original, edited) {
  if (!original || !edited) return 0;
  const len = Math.max(original.length, edited.length);
  let diff = 0;
  for (let i = 0; i < len; i += 1) {
    if (original[i] !== edited[i]) diff += 1;
  }
  return diff;
}

/**
 * Mutation risk rules:
 * 0-2 = Low, 3-5 = Medium, 6+ = High
 */
export function getRiskLevel(mutationCount) {
  const n = Number(mutationCount) || 0;
  if (n <= 2) return 'Low';
  if (n <= 5) return 'Medium';
  return 'High';
}

export const RISK_META = {
  Low: { color: '#22c55e', bg: 'rgba(34,197,94,0.14)', label: 'Low Risk' },
  Medium: { color: '#eab308', bg: 'rgba(234,179,8,0.14)', label: 'Medium Risk' },
  High: { color: '#ef4444', bg: 'rgba(239,68,68,0.14)', label: 'High Risk' }
};

/** Splits a sequence into fixed-width chunks for display, e.g. lines of 60 bases */
export function chunkSequence(sequence, width = 60) {
  const chunks = [];
  for (let i = 0; i < sequence.length; i += width) {
    chunks.push(sequence.slice(i, i + width));
  }
  return chunks;
}

/** GC content percentage, a common real genetics metric */
export function gcContent(sequence) {
  if (!sequence) return 0;
  const gc = sequence.split('').filter((b) => b === 'G' || b === 'C').length;
  return Math.round((gc / sequence.length) * 1000) / 10;
}
