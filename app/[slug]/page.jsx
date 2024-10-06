import BoatDetails from '@/components/BoatsComponent/BoatDetails'
import BoatSection2 from '@/components/BoatsComponent/BoatSection2'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'


async function getBoat(slug) {
  try {
    const boat = await directus.request(readItem('the_boats', slug, {
      fields: ['*', 'specification.item.*.*', "related_boat.*", 'boat_details.*.*', 'boat_details.content', 'boat_details.title'],
      filter: {
        slug: {
          _eq: slug
        }
      },
      sort: ['sort'],
      next: { revalidate: 30 }
    }))
    return boat
  } catch (error) {
    notFound()
  }
}

export default async function BoatPage({ params }) {


  const boat = await getBoat(params.slug)
  // console.log('Boat-page-dataa', boat)
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${getAssetURL(boat?.main_image)})`,
        }}
        className=' relative    object-cover object-center bg-center items-center text-center justify-center flex flex-col flex-wrap mx-auto w-full h-[80vh]  bg-cover   z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]'
      >

        <h1 className='text-xl h-18 items-center justify-center p-8 absolute  bottom-10 font-semibold text-center  drop-shadow-lg  shadow-gray-900 w-full  backdrop-blur-sm bg-opacity-20 bg-blend-overlay   text-white'>{boat?.boat_name} </h1>
      </section>

      <section className='  pt-10 sm:pt-16 '>
        <section className=' max-w-[1250px] mx-auto '>
          {/* <h1 className='text-3xl text-blue3'>{boat?.boat_name} </h1> */}



          <div className='px-3'>
            <BoatSection2 boats={boat} title={boat?.title} subtitle={boat?.subtitle} main_image={boat?.specification_image} />
          </div>

          <div className='py-10'>
            <BoatDetails boats={boat?.boat_details} />
          </div>

          {/* <Link href={`/${boat?.slug}`}>{boat?.[0]?.boat_name}</Link> */}
        </section>



      </section>
    </>
  )
}
