
import getAssetURL from '@/lib/get-asset-url';
import { notFound } from 'next/navigation';

import Head from '@/app/head';
import TripCards from '@/components/AllTrips/TripCards';
import { getTrips, getPageData, getTripsRoute } from '@/lib/apis';

import { Card, Skeleton } from "@nextui-org/react";
import Link from 'next/link';

export const revalidate = 15;


export default async function TripsPage() {
  const pagedata = await getPageData();
  const trips = await getTrips();
  // console.log('trips-page-data', trips);
  // const routes = trips?.map((trip) => trip?.related_route);
  const routes = await getTripsRoute();
  // console.log('routes', routes);

  // const tripSideMenu = tripSideMenuData || notFound('Error fetching data Mr Hamza :', error);
  if (!pagedata || !trips) {

    return (
      <div className='w-full h-screen flex flex-col text-center items-center justify-center text-3xl'>
        <span>
          {/* TODO : Add loader and sea wave icon from a library or any other  */}
          <svg className="animate-spin h-5 w-5 text-blue3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

        </span>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head page={'Trips'} />
      <main>
        <section
          id='home'
          className='relative h-[80vh] bg-no-repeat bg-cover bg-center items-center max-sm:h-[60vh] mx-auto w-full z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]'
          style={{

            backgroundImage: `url(${getAssetURL(pagedata?.trips_page_image) || null})`,
          }}
        >
        </section>
        <div className='max-w-[1250px] pt-20 mx-auto px-5'>
          <div>
            <h2 className='mb-4 text-xl font-bold leading-tight text-black dark:text-white lg:text-3xl sm:leading-tight'>
              {pagedata?.title}
              {/* Our Cruises in Egypt */}
            </h2>
            <p>{pagedata?.description}</p>
          </div>
        </div>
        <section>
          {/* trip card start */}


          {/*  aside menu end */}
          <div className="trip-card-section lg:px-0 px-4 py-14 max-w-[1220px] mx-auto grid grid-cols-1 gap-4  lg:gap-y-12 lg:gap-x-6 lg:grid-cols-2    ">
            {/* TDOO: add Skeleton for loading trip cards */}
            {routes.length > 0 ? (
              routes?.map((route, index) => (
                <TripCards key={route?.id} trip={route} index={index} />
              ))
            ) : (
              <>
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="w-[900px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </Card>
                ))
                }

              </>
            )}

          </div>
        </section>
      </main >
    </>
  );
}