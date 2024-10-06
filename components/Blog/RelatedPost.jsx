'use client'
import Image from 'next/image'
import Link from 'next/link'
import getAssetURL from '@/lib/get-asset-url'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import React, { useEffect, useState } from 'react'

const RelatedPost = () => {
  const [Relatedexplor, setRelatedexplor] = useState([])

  const get_Related_Explor = async () => {
    try {
      const fetchedRelated = await directus.request(
        readItems('posts', {
          fields: ['id', 'title', 'image.*.*', 'slug', 'date_published']
        }),
        {
          next: { revalidate: 1500 }
          // cache: 'no-store'
        }
      )
      setRelatedexplor(fetchedRelated)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle errors as needed
    }
  }

  useEffect(() => {
    get_Related_Explor()
  }, [])

  // console.log('related-explor', Relatedexplor)
  return (
    <div>
      {Relatedexplor?.map(Relatedexplor => (
        <div
          key={Relatedexplor?.id}
          className='flex items-center my-4 lg:my-6 lg:block xl:flex'
        >
          <div className='mr-5 lg:mb-3 xl:mb-0'>
            <div className='relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]'>
              <Image
                src={getAssetURL(Relatedexplor?.image?.filename_disk)}
                alt={Relatedexplor?.title}
                fill
                className='object-cover object-center'
              />
            </div>
          </div>
          <div className='w-full'>
            <h5>
              <Link
                href={`/blog/${Relatedexplor?.id}`}
                className='mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary'
              >
                {Relatedexplor?.title}
              </Link>
            </h5>
            <p className='text-sm text-body-color'>
              {Relatedexplor?.date_published}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RelatedPost
