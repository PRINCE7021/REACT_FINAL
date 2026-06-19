/**
 * A small curated reference set of clinically significant genes.
 * Used for instant local matching; geneApi.js can enrich these with
 * live summaries from a public API when network access is available.
 */
export const GENES = [
  {
    symbol: 'BRCA1',
    name: 'Breast Cancer gene 1',
    chromosome: '17q21.31',
    summary: 'Tumor suppressor gene; pathogenic variants raise hereditary breast and ovarian cancer risk.'
  },
  {
    symbol: 'BRCA2',
    name: 'Breast Cancer gene 2',
    chromosome: '13q13.1',
    summary: 'DNA repair gene; mutations are linked to hereditary breast, ovarian and pancreatic cancers.'
  },
  {
    symbol: 'TP53',
    name: 'Tumor Protein P53',
    chromosome: '17p13.1',
    summary: 'The "guardian of the genome"; mutated in a majority of human cancers including Li-Fraumeni syndrome.'
  },
  {
    symbol: 'EGFR',
    name: 'Epidermal Growth Factor Receptor',
    chromosome: '7p11.2',
    summary: 'Cell-surface receptor; activating mutations drive non-small-cell lung cancer growth.'
  },
  {
    symbol: 'KRAS',
    name: 'Kirsten Rat Sarcoma viral oncogene',
    chromosome: '12p12.1',
    summary: 'Signaling protein commonly mutated in colorectal, pancreatic and lung cancers.'
  },
  {
    symbol: 'PTEN',
    name: 'Phosphatase and Tensin homolog',
    chromosome: '10q23.31',
    summary: 'Tumor suppressor that regulates cell division; loss leads to uncontrolled cell growth.'
  },
  {
    symbol: 'APOE',
    name: 'Apolipoprotein E',
    chromosome: '19q13.32',
    summary: 'Lipid transport gene; the e4 allele is the strongest common genetic risk factor for Alzheimer disease.'
  },
  {
    symbol: 'CFTR',
    name: 'Cystic Fibrosis Transmembrane conductance Regulator',
    chromosome: '7q31.2',
    summary: 'Chloride channel gene; loss-of-function variants cause cystic fibrosis.'
  },
  {
    symbol: 'MTHFR',
    name: 'Methylenetetrahydrofolate Reductase',
    chromosome: '1p36.22',
    summary: 'Folate metabolism enzyme; common variants affect homocysteine levels.'
  },
  {
    symbol: 'HBB',
    name: 'Hemoglobin Subunit Beta',
    chromosome: '11p15.4',
    summary: 'Beta-globin gene; variants cause sickle cell disease and beta-thalassemia.'
  }
];

export function searchGenes(query) {
  const q = (query || '').trim().toUpperCase();
  if (!q) return [];
  return GENES.filter(
    (g) =>
      g.symbol.toUpperCase().includes(q) ||
      g.name.toUpperCase().includes(q) ||
      g.summary.toUpperCase().includes(q)
  );
}
