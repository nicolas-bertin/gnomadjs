import { fetchAllSearchResults } from '../../../utilities/elasticsearch'
import POPULATIONS from './populations'

const fetchExacVariantsByRegion = async (ctx, { chrom, start, stop }) => {
  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'exac_v1_variants',
    type: 'variant',
    size: 10000,
    _source: [
      'AC_Adj',
      'AC_Hemi',
      'AC_Hom',
      'AN_Adj',
      'alt',
      'chrom',
      'filters',
      'flags',
      'populations',
      'pos',
      'ref',
      'rsid',
      'variant_id',
      'xpos',
    ],
    body: {
      script_fields: {
        csq: {
          script: {
            lang: 'painless',
            inline: 'params._source.sortedTranscriptConsequences?.get(0)',
          },
        },
      },
      query: {
        bool: {
          filter: [
            { term: { chrom } },
            {
              range: {
                pos: {
                  gte: start,
                  lte: stop,
                },
              },
            },
          ],
        },
      },
      sort: [{ pos: { order: 'asc' } }],
    },
  })

  return hits.map(hit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = hit._source
    const csq = hit.fields.csq[0] || {}
    return {
      gqlType: 'VariantSummary',
      // variant interface fields
      alt: variantData.alt,
      chrom: variantData.chrom,
      pos: variantData.pos,
      ref: variantData.ref,
      variantId: variantData.variant_id,
      xpos: variantData.xpos,
      // other fields
      ac: variantData.AC_Adj,
      ac_hemi: variantData.AC_Hemi || 0,
      ac_hom: variantData.AC_Hom,
      af: variantData.AN_Adj === 0 ? 0 : variantData.AC_Adj / variantData.AN_Adj,
      an: variantData.AN_Adj,
      consequence: csq.major_consequence,
      datasets: ['exacVariants'],
      filters: variantData.filters,
      flags: ['lc_lof', 'lof_flag'].filter(flag => variantData.flags[flag]),
      hgvs: csq.hgvs,
      hgvsc: csq.hgvsc ? csq.hgvsc.split(':')[1] : null,
      hgvsp: csq.hgvsp ? csq.hgvsp.split(':')[1] : null,
      populations: POPULATIONS.map(popId => ({
        id: popId,
        ac: variantData.populations[popId].AC || 0,
        an: variantData.populations[popId].AN || 0,
        ac_hemi: variantData.populations[popId].hemi || 0,
        ac_hom: variantData.populations[popId].hom || 0,
      })),
      rsid: variantData.rsid,
    }
  })
}

export default fetchExacVariantsByRegion
