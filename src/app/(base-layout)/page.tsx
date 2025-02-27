import Link from 'next/link';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';

export const metadata = {
  title: 'Home | Tech Starter Kit',
};

export default async function Page() {
  const { allHotels } = await executeQuery(
    graphql(`
      query MyQuery {
        allHotels(first: 500) {
          id
          slug
          name
        }
      }
    `),
  );

  return (
    <>
      <h1>Basic DatoCMS + Next.js demo for DirectBooker</h1>
      <h2>Current Examples:</h2>
      <ul className={'list-disc'}>
        {allHotels.map((hotel) => (
          <li>
            <Link href={`/hotel-details/${hotel.slug}`}><strong>{hotel.name}</strong></Link> (<Link href={`https://directbooker-demo.admin.datocms.com/editor/item_types/GRbFPTlRSt6tp-ue5btGWA/items/${hotel.id}`}><span className={"text-orange-600"}>edit</span></Link>)
          </li>
        ))}
      </ul>
    </>
  );
}
