// 'use client'

import BoatLightBox from './BoatLightBox'



const supp = {
  Supplies: 'Supplies',
  Supplies_desc:
    'The Boat provides all diving supplies to make sure that your trip will go smoothly.',
  main_image: '/images/boat-s.png',
  Supplies_image: '/images/supplies.png',
}


export default async function RelatedBoat({ boats }) {



  // console.log('boatDetails-component', boats)

  return (
    <>

      <section data-aos='fade-up' className=' '>
        {boats?.map(boat => (
          <div key={boat?.id}
            className={` ${boat?.direction === 'reverse' ? ' flex  p-4 lg:gap-4 lg:items-start lg:justify-between  flex-col  lg:flex-row-reverse' : 'grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'}
       bg-primary/[.03] p-2 mb-16  rounded-lg`}

          >
            {/* start Boat info section-1 */}
            <div className={`${boat?.direction === 'reverse' ? 'lg:w-[45%]  w-full' : 'lg:col-span-1'}   py-2 px-1   rounded-lg`}>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl'>
                  {boat?.title}
                </h2>
                {/* <p className='mt-2 text-gray-500 dark:text-white'>
          {boat?.subTitle}{' '}
        </p> */}
                <p className='mt-4 text-gray-500 dark:text-white'>
                  {boat?.content}{' '}
                </p>
              </div>
            </div>
            {/*images */}
            <div className='  pb-2 gap-4 rounded-lg    lg:col-span-2'>
              <BoatLightBox
                className=' ' slide={boat?.images} MainImageclass={'cursor-pointer h-auto lg:min-h-[450px] w-full max-w-full rounded-lg'} />
            </div>
          </div>

        ))}

        {/* start supplies section */}
        {/* <section className='mb-16 bg-primary/[.03] p-2  rounded-lg'>
          <div
            className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'

          >
            <div className='   rounded-lg   dark:bg-transparent '>
            

              <div className=' pb-3 gap-4'>
                <Image
                  className='sm:max-h-[250px]  object-cover  object-center w-full rounded-lg'
                  src={supp?.Supplies_image}
                  alt='image-supplies'
                  width={500}
                  height={500}
                  loading='lazy'
                />
              </div>
            </div>
            <div className=' lg:col-span-2 p-3 rounded-lg  dark:bg-transparent'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl'>
                  {supp?.Supplies}
                </h2>
                <p className='mt-4 text-gray-500 dark:text-white'>
                  {supp?.Supplies_desc}{' '}
                </p>
              </div>
            </div>
          </div>

        </section> */}
      </section>
    </>
  )
}
