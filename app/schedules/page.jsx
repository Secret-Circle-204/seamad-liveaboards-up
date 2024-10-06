import ScheduleTable from '@/components/AllTrips/ScheduleTable'
import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'
import { readItems, readItem } from '@directus/sdk'
import directus from '@/lib/directus'
import Head from '@/app/head'
import {getTrips,getAllSchedules,getPageData} from '@/lib/apis'
export const revalidate = 30;


 


 
 

export default async function Schedule() {
  const pagedata = await getPageData()
  const trips = await getTrips()
  const tripsSchedule = await getAllSchedules()
  // console.log('Trips', trips)
  if (!pagedata) {
    return null
  }
  return (
    <>
      <Head page={'Trips'} />
      <main>
        <section
          id='schedules'
          className='relative h-[70vh] bg-no-repeat bg-cover bg-center items-center  max-sm:h-[55vh] mx-auto w-full z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]'
          style={{
            backgroundImage: `url(${getAssetURL(pagedata?.schedules_page_image) || null})`,
          }}
        >
         
        </section>
        <div className='max-w-[1250px] pt-20 mx-auto  px-5  '>

          <div>
            <h2 className='mb-4 text-xl font-bold leading-tight text-black dark:text-white lg:text-3xl sm:leading-tight'>
              {pagedata?.title}
            </h2>
            <p>
              {pagedata?.description}
            </p>
          </div>
        </div>

        <ScheduleTable key={trips?.id} tripsSchedule={tripsSchedule} tripName={trips?.map( (trip) => trip?.related_route?.route_name)} />
    
      </main>

    </>
  )
}