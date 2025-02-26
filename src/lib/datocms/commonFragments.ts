import { graphql } from '@/lib/datocms/graphql';
import { ResponsiveImageFragment } from '@/components/ResponsiveImage';

/*
 * This file lists a series of fragments not related to any specific React
 * component, but necessary in various parts of the code.
 */

export const TagFragment = graphql(`
  fragment TagFragment on Tag @_unmask {
    tag
    attributes
    content
  }
`);

export const BrandFragment = graphql(`
    fragment BrandFragment on BrandRecord {
        id
        brandName
        website
        logo {
            responsiveImage {
                ...ResponsiveImageFragment
            }
        }
        brandFaqs {
            value
            blocks
            links {
                question
                answer
            }
        }
    }
`, [ResponsiveImageFragment]);
