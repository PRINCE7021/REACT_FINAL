import axios from 'axios';
import { GENES } from '../data/genes';

/**
 * Shared axios instance. BioGazer runs primarily on local/dummy data so the
 * UI never blocks on network access, but this client is wired up for real
 * deployments where a genomics API or internal backend is available.
 */
export const apiClient = axios.create({
  baseURL: 'https://mygene.info/v3',
  timeout: 5000
});

/**
 * Attempts to enrich a local gene record with a live summary from MyGene.info.
 * Falls back to the bundled local description if the network call fails,
 * so the Gene Search page always renders something useful.
 */
export async function fetchGeneEnrichment(symbol) {
  const local = GENES.find((g) => g.symbol === symbol);
  try {
    const { data } = await apiClient.get('/query', {
      params: { q: `symbol:${symbol}`, species: 'human', fields: 'summary,name' }
    });
    const hit = data?.hits?.[0];
    if (hit?.summary) {
      return { ...local, liveSummary: hit.summary, source: 'mygene.info' };
    }
    return { ...local, source: 'local' };
  } catch {
    return { ...local, source: 'local' };
  }
}
