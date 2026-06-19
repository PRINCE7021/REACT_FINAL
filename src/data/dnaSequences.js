const BASES = ['A', 'T', 'G', 'C'];

const ORGANISMS = ['Homo sapiens', 'Mus musculus', 'Drosophila melanogaster', 'Danio rerio', 'E. coli K-12'];
const GENE_TAGS = ['BRCA1', 'BRCA2', 'TP53', 'EGFR', 'KRAS', 'PTEN', 'APOE', 'CFTR', 'MTHFR', 'HBB'];

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomSequence(rand, length) {
  let seq = '';
  for (let i = 0; i < length; i += 1) {
    seq += BASES[Math.floor(rand() * 4)];
  }
  return seq;
}

function buildSequences(count = 40, seed = 7) {
  const rand = mulberry32(seed);
  const sequences = [];
  for (let i = 0; i < count; i += 1) {
    const length = 80 + Math.floor(rand() * 200);
    const seq = randomSequence(rand, length);
    sequences.push({
      id: `SEQ-${String(i + 1).padStart(4, '0')}`,
      name: `${GENE_TAGS[i % GENE_TAGS.length]} sample ${Math.floor(i / GENE_TAGS.length) + 1}`,
      organism: ORGANISMS[i % ORGANISMS.length],
      gene: GENE_TAGS[i % GENE_TAGS.length],
      sequence: seq,
      length: seq.length,
      mutations: Math.floor(rand() * 9),
      createdAt: new Date(Date.now() - Math.floor(rand() * 1000) * 86400000).toISOString()
    });
  }
  return sequences;
}

export const DNA_SEQUENCES = buildSequences(40);
