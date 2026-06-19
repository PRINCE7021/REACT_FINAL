import React, { useMemo, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import DNAStrand from '../components/DNAStrand';
import EmptyState from '../components/EmptyState';
import { DNA_SEQUENCES } from '../data/dnaSequences';
import { validateSequence, countMutations, gcContent } from '../services/dnaService';
import { useApp } from '../context/AppContext';

const GENE_OPTIONS = ['All', ...Array.from(new Set(DNA_SEQUENCES.map((s) => s.gene)))];

export default function DNAViewer() {
  const { notify } = useApp();

  // --- Sequence organizer state ---
  const [search, setSearch] = useState('');
  const [geneFilter, setGeneFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedId, setSelectedId] = useState(DNA_SEQUENCES[0].id);

  // --- Gene edit (undo/redo) state, keyed per sequence id ---
  const [editText, setEditText] = useState(() => DNA_SEQUENCES[0].sequence);
  const [history, setHistory] = useState(() => [DNA_SEQUENCES[0].sequence]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [error, setError] = useState(null);
  const [viewerSearch, setViewerSearch] = useState('');

  const original = useMemo(() => DNA_SEQUENCES.find((s) => s.id === selectedId), [selectedId]);

  const filteredSequences = useMemo(() => {
    let list = DNA_SEQUENCES.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.gene.toLowerCase().includes(search.toLowerCase());
      const matchesGene = geneFilter === 'All' || s.gene === geneFilter;
      return matchesSearch && matchesGene;
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'length-asc': return a.length - b.length;
        case 'length-desc': return b.length - a.length;
        case 'mutations-desc': return b.mutations - a.mutations;
        default: return 0;
      }
    });
    return list;
  }, [search, geneFilter, sortBy]);

  const selectSequence = useCallback((seq) => {
    setSelectedId(seq.id);
    setEditText(seq.sequence);
    setHistory([seq.sequence]);
    setHistoryIndex(0);
    setError(null);
  }, []);

  const handleEditChange = (raw) => {
    setEditText(raw);
  };

  const commitEdit = () => {
    const { valid, cleaned, invalidChars } = validateSequence(editText);
    if (!valid) {
      setError(
        invalidChars.length
          ? `Invalid character(s) found: ${invalidChars.join(', ')}. Only A, T, G, C are allowed.`
          : 'Sequence cannot be empty.'
      );
      return;
    }
    setError(null);
    const truncatedHistory = history.slice(0, historyIndex + 1);
    const nextHistory = [...truncatedHistory, cleaned];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setEditText(cleaned);
    notify('Modification saved to history', 'success');
  };

  const undo = () => {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setEditText(history[nextIndex]);
    setError(null);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setEditText(history[nextIndex]);
    setError(null);
  };

  const mutationsFromOriginal = original ? countMutations(original.sequence, editText) : 0;

  return (
    <Layout title="DNA Viewer">
      <div className="viewer-layout">
        <aside className="panel organizer">
          <div className="panel__header">
            <h2>Sequence Organizer</h2>
            <span className="tag">{filteredSequences.length} of {DNA_SEQUENCES.length}</span>
          </div>

          <div className="organizer__controls">
            <input
              className="input"
              placeholder="Search by name, ID or gene…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="organizer__row">
              <select className="select" value={geneFilter} onChange={(e) => setGeneFilter(e.target.value)}>
                {GENE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="length-asc">Length ↑</option>
                <option value="length-desc">Length ↓</option>
                <option value="mutations-desc">Most mutations</option>
              </select>
            </div>
          </div>

          <div className="organizer__list">
            {filteredSequences.length === 0 && <EmptyState title="No sequences found" message="Try a different search term or gene filter." />}
            {filteredSequences.map((seq) => (
              <button
                key={seq.id}
                className={`organizer__item ${seq.id === selectedId ? 'organizer__item--active' : ''}`}
                onClick={() => selectSequence(seq)}
              >
                <div>
                  <strong>{seq.name}</strong>
                  <span className="muted">{seq.id} · {seq.organism}</span>
                </div>
                <span className="tag tag--ghost">{seq.length} bp</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel viewer">
          {!original ? (
            <EmptyState title="Select a sequence" message="Choose a sequence from the organizer to inspect it." />
          ) : (
            <>
              <div className="panel__header">
                <h2>{original.name}</h2>
                <span className="tag">{original.gene}</span>
              </div>

              <div className="viewer__meta">
                <span>GC content: <strong>{gcContent(editText)}%</strong></span>
                <span>Length: <strong>{editText.length} bp</strong></span>
                <span>Mutations vs. original: <strong>{mutationsFromOriginal}</strong></span>
              </div>

              <input
                className="input"
                placeholder="Search within this sequence (e.g. ATG)…"
                value={viewerSearch}
                onChange={(e) => setViewerSearch(e.target.value.toUpperCase())}
                style={{ marginBottom: 12 }}
              />

              <DNAStrand sequence={editText} width={45} diffAgainst={original.sequence} query={viewerSearch} />

              <div className="legend">
                <span><i className="legend__dot base-A" />Adenine (A)</span>
                <span><i className="legend__dot base-T" />Thymine (T)</span>
                <span><i className="legend__dot base-G" />Guanine (G)</span>
                <span><i className="legend__dot base-C" />Cytosine (C)</span>
              </div>

              <div className="editor">
                <div className="panel__header">
                  <h3>Gene Edit System</h3>
                  <div className="editor__history-controls">
                    <button className="btn btn--ghost" onClick={undo} disabled={historyIndex === 0}>↶ Undo</button>
                    <button className="btn btn--ghost" onClick={redo} disabled={historyIndex >= history.length - 1}>↷ Redo</button>
                    <span className="muted">Step {historyIndex + 1} / {history.length}</span>
                  </div>
                </div>
                <textarea
                  className="textarea mono"
                  rows={4}
                  value={editText}
                  onChange={(e) => handleEditChange(e.target.value)}
                  spellCheck={false}
                />
                {error && <p className="form-error">{error}</p>}
                <button className="btn btn--primary" onClick={commitEdit}>Save modification</button>
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
