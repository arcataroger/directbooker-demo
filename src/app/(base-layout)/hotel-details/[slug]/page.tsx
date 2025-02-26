import { BrandFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

/*
 * By using next/dynamic, the components will not be included in the page's
 * initial JavaScript bundle. It allows you to defer loading of Client
 * Components and imported libraries, and only include them in the client bundle
 * when they're needed.
 */
const Code = dynamic(() => import('@/components/Code'));

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query MyQuery($slug: String) {
      hotel(locale: en_US, filter: { slug: { eq: $slug } }) {
        id
        _firstPublishedAt
        id
        name
        slug
        description
        website
        address
        phone
        amenities {
          name
          description
        }
        customAmenities {
          name
          description
        }
        roomTypes {
          name
          maxOccupancy
          description
          photos {
            responsiveImage {
              ...ResponsiveImageFragment
            }
          }
        }
        gallery {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
        featuredPhoto {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
        faq {
          blocks
          value
          links {
            question
            answer
          }
        }
        brand {
          ...BrandFragment
        }
      }
    }
  `,
  [BrandFragment],
);

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { slug } = params;

  const { hotel } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
    variables: {
      slug: slug,
    },
  });

  if (!hotel) {
    notFound();
  }

  return (
    <>
      <h1>{hotel.name}</h1>

      <footer>Published at {hotel._firstPublishedAt}</footer>

      <pre>
        <code>{JSON.stringify(hotel, null, 2)}</code>
      </pre>
    </>
  );
}
