import type { ResultOf } from '@/lib/datocms/graphql';
import type { ContentComponentType } from '@/lib/datocms/realtime/generatePageComponent';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { PageProps, query } from './common';

/*
 * By using next/dynamic, the components will not be included in the page's
 * initial JavaScript bundle. It allows you to defer loading of Client
 * Components and imported libraries, and only include them in the client bundle
 * when they're needed.
 */
const Code = dynamic(() => import('@/components/Code'));

/**
 * This component is responsible for defining the actual content of the route,
 * and will be incorporated into the final page by the page.tsx component.
 *
 * Besides the standard props that you can typically use in your page components
 * (https://nextjs.org/docs/app/api-reference/file-conventions/page#props), a
 * `data` prop is also available, which already contains the result of the
 * GraphQL query to DatoCMS.
 */
const Content: ContentComponentType<PageProps, ResultOf<typeof query>> = ({ data, params }) => {
  if (!data.hotel) {
    notFound();
  }

  return (
    <>
      <h1>{data.hotel.name}</h1>


      <footer>Published at {data.hotel._firstPublishedAt}</footer>


      <pre>
        <code>
          {JSON.stringify(data.hotel, null, 2)}
        </code>
      </pre>
    </>
  );
};

export default Content;
