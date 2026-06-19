import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { GENES, searchGenes } from '../data/genes';
import { fetchGeneEnrichment } from '../services/api';

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toUpperCase().indexOf(query.toUpperCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function GeneSearch() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [enriching, setEnriching] = useState(false);
  const [enrichment, setEnrichment] = useState(null);

  const results = useMemo(() => (query.trim() ? searchGenes(query) : GENES), [query]);

  const handleSelect = async (gene) => {
    setSelected(gene);
    setEnrichment(null);
    setEnriching(true);
    try {
      const data = await fetchGeneEnrichment(gene.symbol);
      setEnrichment(data);
    } finally {
      setEnriching(false);
    }
  };

  return (
    <Layout title="Smart Gene Search">
      <div className="viewer-layout">
        <section className="panel">
          <div className="panel__header">
            <h2>Search the gene reference index</h2>
            <span className="tag">{results.length} match{results.length === 1 ? '' : 'es'}</span>
          </div>
          <input
            className="input"
            placeholder="Try BRCA1, TP53, KRAS…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {results.length === 0 ? (
            <EmptyState title="No genes found" message="Check the spelling or try a shorter acronym." />
          ) : (
            <div className="gene-grid">
              {results.map((g) => (
                <button
                  key={g.symbol}
                  className={`gene-card ${selected?.symbol === g.symbol ? 'gene-card--active' : ''}`}
                  onClick={() => handleSelect(g)}
                >
                  <strong>{highlight(g.symbol, query)}</strong>
                  <span className="muted">{highlight(g.name, query)}</span>
                  <p>{highlight(g.summary, query)}</p>
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="panel">
          <div className="panel__header"><h2>Gene Detail</h2></div>
          {!selected && <EmptyState title="Select a gene" message="Pick a result to view chromosome location and summary." />}
          {selected && enriching && <Loader label={`Fetching ${selected.symbol} reference data…`} />}
          {selected && !enriching && (
            <div className="gene-detail">
              <h3>{selected.symbol}</h3>
              <p className="muted">{selected.name}</p>
              <dl>
                <dt>Chromosome</dt>
                <dd>{selected.chromosome}</dd>
                <dt>Summary</dt>
                <dd>{enrichment?.liveSummary || selected.summary}</dd>
                <dt>Source</dt>
                <dd>{enrichment?.source === 'mygene.info' ? 'Live: MyGene.info' : 'Local reference dataset'}</dd>
              </dl>
            </div>
          )}
        </aside>
      </div>
    </Layout>
  );
}
