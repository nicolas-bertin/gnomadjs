---
index: gnomad_help
vcfkey: filters
topic: 'Random forest classifier'
---

# Random forests classifier

## How to interpret the RF flag

The variant may not be real!

## Background

One of the major limitations of the ExAC dataset (and, indeed, virtually all other large-scale call sets) was the fact that the VQSR filter was applied at the site (locus) level rather than the variant (allele) level. For instance, if a (say, artifactual) indel was found at the same site as a common SNP, the quality metrics would be combined. In this case, the quality metrics for the indel might be artificially inflated (or decreased for the SNP). This issue has become increasingly problematic with larger number of samples, and thus a higher density of variation – in the gnomAD dataset 22.3% of the variants in exomes and 12.8% of the variants in genomes occur at multi-allelic sites. To address these issues, we used an allele-specific random forest classifier trained implemented in Hail / pyspark with 500 trees of max. depth 5. The features and labels for the classifier are described below.

As the filtering process was performed on exomes and genomes separately, users will notice that for some variants, we have 2 filter statuses which may be discordant in some cases. In particular, there are 144,941 variants filtered out in exomes, but passing filters in genomes and 290,254 variants for the reverse. We’ll be investigating these variants in future analyses, but for now users should just treat them with caution.

### Random forests features

While our variant calls VCF only contained site-specific metrics, Hail enabled us to compute some genotype-driven allele-specific metrics. The table below summarizes the features used in the random forests model, along with their respective weight in the model generated.
