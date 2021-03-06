export default {
  pageTitle: 'Epi25 WES browser',
  navBarTitle: 'Epi25 WES browser',
  navBarColor: '#4e3c81',
  elasticsearch: {
    analysisGroups: {
      index: 'epi_exome_variants_groups_180925',
      type: 'epi_exome_group',
    },
    geneResults: {
      index: 'epi_exome_gene_results_181107',
      type: 'result',
    },
    variants: {
      index: 'epi_exome_variants_results_180925',
      type: 'epi_exome_variant',
    },
  },
  geneResults: {
    resultsPageHeading: 'Epi25 WES: gene burden results',
    categories: [
      { id: 'lof', label: 'LoF' },
      { id: 'mpc', label: 'MPC' },
      { id: 'infrIndel', label: 'Inframe Indel' },
    ],
  },
  analysisGroups: {
    overallGroup: 'EPI',
    selectableGroups: ['EPI', 'EE', 'GGE', 'NAFE'],
  },
  consequences: [
    {
      term: 'loss of function',
      category: 'lof',
    },
    {
      term: 'inframe indel',
      category: 'missense',
    },
    {
      term: 'other missense',
      category: 'missense',
    },
    {
      term: 'damaging missense',
      category: 'missense',
    },
    {
      term: 'damaging missense (MPC)',
      category: 'missense',
    },
    {
      term: 'synonymous',
      category: 'synonymous',
    },
  ],
}
