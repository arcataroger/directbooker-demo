import { BrandFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Rubik, Roboto } from 'next/font/google';

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
        description (markdown: true)
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

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});

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
    <div className={`${roboto.variable} ${rubik.variable}`}>
      {/* HEADER */}
      <header className="bg-midnight-mid relative z-20 py-3">
        <div className="container mx-auto px-3 flex items-center">
          <a href="/" className="flex py-4 tw-no-underline">
            <img src="/db-logo.svg" alt="Logo" width="155" height="26" className="object-contain" />
            <span className="text-xl text-white ml-1 flex-grow">× DatoCMS Next.js Demo</span>
          </a>
        </div>
      </header>

      {/* MAIN SECTION */}
      <main className="d-flex flex-column flex-grow-1 h-100">
        <div id="scroll-top" className="tw-h-0 tw-w-full"></div>
        {/* Top area with back button and title */}
        <div className="tw-mx-auto tw-w-full tw-px-0 mb-5 bg-white">
          <div className="tw-mx-auto tw-container tw-px-3">
            <div className="my-4">
              <button type="button" className="p-0 btn btn-link">
                <p className="body-text regular my-0 align-self-end">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="tw-inline"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                  </svg>
                  Back to list
                </p>
              </button>
            </div>
            <h1 className="header xlarge my-0 tw-scroll-mt-12">{hotel.name}</h1>
          </div>

          {/* Photo Carousel Section */}
          <div className="my-4 container">
            <div className="d-sm-none p-0 carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target=""
                  aria-label="Slide 1"
                  className="active"
                  aria-current="true"
                ></button>
                <button
                  type="button"
                  data-bs-target=""
                  aria-label="Slide 2"
                  aria-current="false"
                ></button>
                {/* Additional indicators… */}
              </div>
              <div className="carousel-inner">
                <div className="position-relative active carousel-item">
                  <div className="ratio ratio-4x3">
                    <img
                      alt="Property photos and rooms"
                      loading="lazy"
                      decoding="async"
                      className="rounded-4"
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        inset: 0,
                        objectFit: 'cover',
                        color: 'transparent',
                      }}
                      src="https://www.directbooker.com/_next/image?url=https%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO5IZ1APcYB5U-TNxSmH7O9rtZFPtPq-wp_PiFJ=s10000&amp;w=3840&amp;q=55"
                    />
                  </div>
                </div>
                {/* Additional carousel items… */}
              </div>
              <a className="carousel-control-prev" role="button" tabIndex={0} href="#">
                <span className="p-2 text-black-secondary ImageCarousel_controlButton__t3LXg ImageCarousel_previous__Fn5ij">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                  </svg>
                </span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a className="carousel-control-next" role="button" tabIndex={0} href="#">
                <span className="p-2 text-black-secondary ImageCarousel_controlButton__t3LXg ImageCarousel_next__gqCZ7">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 6l1.41 1.41L8.83 12l2.58 2.59L10 16l-4-4 4-4z"></path>
                  </svg>
                </span>
                <span className="visually-hidden">Next</span>
              </a>
            </div>

            <div className="g-2 d-none d-sm-flex row">
              <div className="col-md-5 col-12">
                <div className="ratio Photos_customRatioBigPhoto__bMcM4 ratio-1x1">
                  <div className="ratio ratio-4x3">
                    <img
                      alt="bigger property image"
                      loading="lazy"
                      decoding="async"
                      className="rounded-4"
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        inset: 0,
                        objectFit: 'cover',
                        color: 'transparent',
                      }}
                      src="https://www.directbooker.com/_next/image?url=https%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO5IZ1APcYB5U-TNxSmH7O9rtZFPtPq-wp_PiFJ=s10000&amp;w=3840&amp;q=35"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-12">
                <div className="g-2 row">
                  <div className="col-md-4 col-6">
                    <div className="ratio ratio-4x3">
                      <img
                        alt="smaller property image"
                        loading="lazy"
                        decoding="async"
                        className="rounded-4"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          inset: 0,
                          objectFit: 'cover',
                          color: 'transparent',
                        }}
                        src="https://www.directbooker.com/_next/image?url=https%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMa0JyYQaM3g6UR3-40eM_MHO6JR7iilRfamLJx=s10000&amp;w=3840&amp;q=55"
                      />
                    </div>
                  </div>
                  {/* Additional image columns as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address, About & Contact Section */}
        <div className="tw-mx-auto tw-container tw-px-3">
          <div className="row">
            <div className="mb-3 col-lg-8 col-md-7">
              <p className="body-text small my-0 pb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="me-2 tw-inline"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"></path>
                </svg>
                {hotel.address}
                {hotel.address && <a
                  className="ms-2"
                  target="_blank"
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${hotel.name} ${hotel.address.toString()}`)}`}
                >
                  Get directions
                </a>}
              </p>
              <div>
                <div className="flex-wrap hstack gap-2">
                  <div className="d-flex">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="me-2 tw-inline"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"></path>
                    </svg>
                    <p className="body-text small my-0 align-self-end">
                      <a target="_blank" href={`tel:${hotel.phone}`}>
                        {hotel.phone}
                      </a>
                    </p>
                  </div>
                  <div
                    style={{ width: '2px', height: '2px' }}
                    className="bg-black-secondary rounded-4"
                  ></div>
                  <div className="d-flex">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="me-2"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
                    </svg>
                    <p className="body-text small my-0 align-self-end">
                      {hotel.website && <a target="_blank" href={hotel.website}>
                        {new URL(hotel.website).host}
                      </a>}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="header xsmall my-0 tw-scroll-mt-12" id="about">
                  About
                </h2>
                <div
                  id="description"
                  dangerouslySetInnerHTML={{ __html: hotel.description ?? '' }}
                />
              </div>
            </div>

            <div className="ps-xl-5 col">
              <div className="text-center rounded bg-midnight-mid p-3 card">
                <div className="bg-dark text-white p-0 border-0 card-header">
                  <p className="header small my-0">Price on official site</p>
                  <p className="body-text xsmall my-0">Fake Data</p>
                </div>
                <div className="p-0 card-body">
                  <div className="d-flex justify-content-between border rounded bg-light align-items-end py-2 px-3 mt-3 mb-1 bg-white">
                    <div className="text-start">
                      <p className="title large my-0 text-midnight-mid">
                        <span>
                          Estimated rate
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className="ps-1 text-black-secondary tw-inline"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                          </svg>
                        </span>
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="title large my-0 text-midnight-mid">from $-1</p>
                    </div>
                  </div>
                  <div className="tw-mb-4">
                    <p className="body-text xsmall my-0 text-white">for 1 night, 99 adults</p>
                    <p className="body-text xsmall my-0 text-white">
                      $-1/night. Taxes &amp; fees incl.
                    </p>
                  </div>
                  <a
                    className="tw-inline-flex tw-items-center tw-justify-center title-reg md:title-lg tw-gap-2 tw-px-6 tw-whitespace-nowrap tw-rounded-lg tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-sunset-mid focus-visible:tw-ring-offset-1 disabled:tw-pointer-events-none disabled:tw-text-black-tertiary tw-bg-sunset-mid tw-text-white active:tw-bg-sunset-dark hover:tw-bg-sunset-light disabled:tw-bg-gray-light tw-h-[44px] text-white w-100 py-2 px-4 rounded mb-1"
                    target="_blank"
                    rel="noopener"
                    href={hotel.website ?? 'https://www.example.com'}
                  >
                    <p className="title regular my-0">Visit official site</p>
                  </a>
                </div>
                <div className="bg-dark text-white p-0 border-0 card-footer">
                  <p className="body-text xsmall my-0 text-grey-mid">
                    You will be taken to the hotel's site to view rate options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="tw-mx-auto tw-container tw-px-3" style={{ paddingTop: '40px' }}>
          <h2 className="header medium my-0 pb-3 tw-scroll-mt-12" id="amenities">
            Amenities
          </h2>
          <div className="flex-wrap hstack gap-2">
            <p className="body-text regular my-0">Amenities not specified</p>
          </div>
        </div>

        {/* Rooms & Rates Section */}
        <div className="tw-mx-auto tw-container tw-px-3">
          <div className="py-3 my-4">
            <div className="bg-grey-mid" style={{ height: '1px' }}></div>
          </div>
          <div className="vstack gap-3">
            <h2 id="roomSelection" className="tw-header-medium tw-scroll-mt-20 tw-mb-0">
              Rooms &amp; Rates
            </h2>
            <div className="border border-grey-mid rounded-2 d-flex flex-wrap gap-4 align-items-center justify-content-center p-12px">
              <p className="tw-body-reg tw-mb-0">
                Have questions about your booking options? Contact the hotel directly.
              </p>
              {/* Additional booking/contact components can be placed here */}
            </div>
          </div>
        </div>

        {/* Location & Nearby Section */}
        <div className="tw-mx-auto tw-container tw-px-3">
          <div className="py-3 my-4">
            <div className="bg-grey-mid" style={{ height: '1px' }}></div>
          </div>
        </div>
      </main>

      <pre>
        <code>{JSON.stringify(hotel, null, 2)}</code>
      </pre>
    </div>
  );
}
