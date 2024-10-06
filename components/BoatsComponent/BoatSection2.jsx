'use client'
  import Link from 'next/link'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import getAssetURL from '@/lib/get-asset-url'

// const boat = [
//   {
//     id: 1,
//     title: 'Cabin',
//     Supplies: 'Supplies',
//     Specification: 'Boat Specification',
//     Specification_desc: 'The boat specifications are as follows . lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.',
//     Specification_table: [
//       {
//         id: 1,
//         title: 'Year Built: 2023',
//         desc: 'Length: 36m',
//         value: 'Length: 36m'

//       },
//       {
//         id: 2,
//         title: '2012Engine 1: CAT C9 Acert Diesel Marine Engine   503 BHP',
//         desc: 'Beam: 9.2m',
//         value: 'Beam: 9.2m'
//       },
//       {
//         id: 3,
//         title: 'Engine 2: CAT C7 Diesel Engine  275 BHP',
//         desc: ' 1,000 m',
//         value: 'Guest Capacity: 26'
//       },
//       {
//         id: 4,
//         title: 'Fuel capacity: 19000 liters',
//         desc: ' 1,000 m',
//         value: 'Number of bathrooms: 13'
//       },
//       {
//         id: 5,
//         title: 'Freshwater maker: x2 Aquagib 260 ltr/hr',
//         desc: ' 1,000 m',
//         value: ' Water capacity: 22,500 liters'
//       },

//     ],
//     Supplies_desc:
//       'The Boat provides all diving supplies to make sure that your trip will go smoothly.',
//     main_image: '/images/boat-s.png',
//     Supplies_image: '/images/supplies.png',
//     Restaurant_image: '/images/Restaurant/7.png',
//     desc: ' The boat  has a variety of cabin types on each floor of it. All cabins include windows to enjoy the sea view. lorem ipsum dolor sit amet, consectetur adipiscing elit. The boat  has a variety of cabin types on each floor of it. All cabins include windows to enjoy the sea view. lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
//     // feature: [
//     //   {
//     //     id: 1,
//     //     name: 'Cabin',
//     //     overVeiw: 'Wooden Cabin'
//     //   },
//     //   {
//     //     id: 2,
//     //     name: 'Cabin',
//     //     overVeiw: 'Wooden Cabin'
//     //   },
//     //   {
//     //     id: 3,
//     //     name: 'Cabin',
//     //     overVeiw: 'Wooden Cabin'
//     //   }
//     // ],
//     restruanImages: [
//       {
//         src: '/images/Restaurant/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Restaurant/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Restaurant/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Restaurant/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Restaurant/1.png',
//         alt: 'sea-island'
//       }
//     ],
//     Reception_images: [
//       {
//         src: '/images/Reception/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Reception/3.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Reception/2.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Reception/4.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/Reception/5.png',
//         alt: 'sea-island'
//       }
//     ],
//     images: [
//       {
//         src: '/images/boat/1.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/boat/2.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/boat/2.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/boat/2.png',
//         alt: 'sea-island'
//       },
//       {
//         src: '/images/boat/3.png',
//         alt: 'sea-island'
//       }
//     ]
//   }
// ]

export default function BoatSection2({ boats, title, subtitle, main_image }) {
  // const [openTab, setOpenTab] = useState(1)
  // const [openTab, setOpenTab] = useState(1)
  // const [isOpen, setIsOpen] = useState(false)
  const space = boats
  console.log('boats_specification:', space)
  return (
    <>

      {/* start boat-specification section  */}
      <section className=' bg-primary/[.05] p-2  rounded-lg'>
        <div
          className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'  >
          <div className='  rounded-lg p-6 dark:bg-transparent'>
            <div>
              <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl'>
                {title}
              </h2>
              <p className='my-4 text-gray-500 dark:text-white'>
                {subtitle}{' '}
              </p>

              <div>

                {space?.specification?.map((table => (
                  <div key={table?.item?.id}>

                    <table className='w-full text-md text-left text-gray-500 dark:text-gray-400'>
                      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
                      >
                        <tr>
                          <th scope='col' className='  py-3 title-font tracking-wider font-semibold text-gray-900 text-sm'>
                            {table?.item?.specs}

                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr scope='row' className='bg-white border-b font-medium dark:bg-gray-800 dark:border-gray-700'>
                          {/* <td className=' text-gray-900 font-semibold  '>{table?.title}  </td> */}
                          <td>{table?.item?.specs_detail}</td>
                        </tr>
                      </tbody>
                    </table>



                  </div>
                )))}
              </div>
            </div>
          </div>
          <div className='   rounded-lg   dark:bg-transparent lg:col-span-2'>
            {/* tap images gallery */}

            <div className=' pb-3 gap-5'>
              {/* <SlideshowLightbox showThumbnails={true}> */}
              <Image
                className='h-auto p-1 w-full rounded-lg'
                src={getAssetURL(main_image)}
                alt='boat'
                width={500}
                height={500}
                loading='lazy'
              />
              {/* </SlideshowLightbox> */}
            </div>

            {/* {boat?.images?.map(img => (
                  <div key={img?.src}>
                    <SlideshowLightbox showThumbnails={true}>
                      <img
                        className='h-auto max-w-full rounded-lg'
                        src={img?.src}
                        alt=''
                      />
                    </SlideshowLightbox>
                  </div>
                ))} */}
          </div>
        </div>
      </section>
    </>
  )
}
