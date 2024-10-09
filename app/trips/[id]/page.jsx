//app/trips/[id]/page.jsx

import { readItems, readItem } from '@directus/sdk';
import getAssetURL from '@/lib/get-asset-url';


import MapDetails from '@/components/AllTrips/MapDetails';
import TripSchedule from '@/components/AllTrips/TripSchedule';
import Image from 'next/image';
import SideMenu from '@/components/AllTrips/SideMenu';
import { getTripById } from '@/lib/apis';
import { MdArrowCircleDown } from "react-icons/md";

import directus from '@/lib/directus';
import Link from 'next/link';
import RouteDetails from '@/components/AllTrips/RouteDetails';
import Head from '@/app/head';
async function getMapData() {
  try {
    const mapData = await directus.request(readItems('map_data', {
      fields: [
        // '*',
        'id',
        'title',
        'pointer',
        'sort',
        'images.*',
        'description',
        'top',
        'left',
      ],
    }));

    return mapData;
  } catch (error) {
    console.log(error);
  }
}


export default async function PlanDetails({ params }) {
  const mapData = await getMapData();
  const tripData = await getTripById(params?.id);
  const mapPoints = tripData?.location_pointer?.map(point => point.map_data_id.id);
  console.log('tripData------', tripData);

  return (
    <>
      <Head page={`Trip Details - ${tripData?.related_route?.route_name ?? 'page'}`} />
      <main>
        <section
          id="tripDetailsPage"
          className="max-w-[1410px] lg:px-2 px-3  pb-16  sm:py-32  mx-auto  ">

          <section className="text-gray-600 body-font">
            <div className="  px-5 py-20 mx-auto flex flex-wrap">
              <div className="flex lg:flex-row   w-full mb-20 flex-col">
                <div className="lg:w-[100%]   space-y-4 w-full mb-6 lg:mb-0">
                  <h1 className=" text-left sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-full lg:mb-0 mb-4">{tripData?.related_route?.route_name}</h1>
                  <p className="lg:pl-0 lg:w-[100%] mx-auto leading-relaxed text-base">{tripData?.related_route?.description}</p>
                  <button className=" text-left text-white mt-16 bg-blue3 border-0 py-2 px-6 lg:pl-3 lg:pr-8 focus:outline-none hover:bg-blue-600 rounded text-lg">

                    <Link
                      className='flex  items-center'
                      href={`#schedules`}>
                      Dates available
                      <MdArrowCircleDown size={30} className='ml-8' />
                    </Link>

                  </button>
                </div>
              </div>
              <div className="flex flex-wrap md:-m-2 -m-1">
                <div

                  className="  h-full  md:p-2 p-1 w-full grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6  grid-cols-3 lg:gap-8 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                  {tripData?.trip_images?.map((image, index) => (
                    <div
                      className='hover:-translate-y-3   rounded-xl duration-300 group overflow-hidden'
                      key={index}>
                      <Image
                        width={500}
                        height={600}
                        priority
                        quality={60}
                        src={getAssetURL(image?.directus_files_id)}
                        alt="gallery" className={`group-hover:opacity-95 group-hover:scale-110  group:hover:blur-0 transition duration-300 rounded-xl ${index % 1 === 0 ? 'w-full h-full object-cover object-center block' : 'w-full object-cover h-full object-center block'}`} />

                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* {tripData && <RouteDetails routeData={tripData} tripData={tripData} mapData={mapData} />} */}
          <section className="w-full">
            <div className=' w-full  flex flex-wrap items-center justify-between border-b border-body-color border-opacity-50 pb-4 dark:border-white dark:border-opacity-10'></div>


            {/* {tripData && <TripDetails plan={tripData} />} */}
          </section>
          <section className="text-gray-600 body-font ">

            <div className=" px-3 py-10 w-full mx-auto">
              <div className="w-full mx-auto   flex lg:flex-row items-start justify-center flex-col-reverse">

                <div className="lg:w-[45%]  mx-auto w-full lg:pr-6 lg:py-6   mt-10  lg:mt-0">
                  <RouteDetails routeData={tripData} tripData={tripData} mapData={mapData} />
                </div>
                <div className=' map-location mx-auto rounded-2xl lg:mt-36 relative lg:w-[55%] w-full  h-64    sm:min-h-[650px]  min-h-[360px] object-cover object-center '>
                  <div className="absolute inset-0">
                    <MapDetails mapPoints={mapPoints} mapData={mapData} />
                  </div>
                  <Image
                    src={'/images/map-2.png'}
                    alt='sea-island'
                    width={500}
                    height={500}
                    priority
                    className='overflow-hidden w-full z-20 absolute h-[100%] object-center rounded '
                  />
                </div>
              </div>
            </div>
 

            {/* Trip schedule */}
            <div id='schedules' className=' w-full xl:px-2  md:px-6 px-4  py-20   flex-col justify-center items-center'>

              {tripData && <TripSchedule tripSchedule={tripData} />}

            </div>
            {/* Trip schedule */}

          </section>
        </section >
      </main>
    </>
  );
}