'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import Image from 'next/image'
// import getAssetURL from '@/lib/get-asset-url'

export default function Footer() {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const fetchedFooter = await directus.request(
        readItems('contacts', {
          fields: [

            'contact_notes',
            'phone',
            'address',
            'email',
            'instagram',
            'tiktok',
            'youtube',
            'facebook',
            'social_notes'


          ]
        }),
        {
          next: { revalidate: 30 }
          // cache: 'no-store'
        }
      )
      setData(fetchedFooter)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle errors as needed
    }
  }

  useEffect(() => {
    getData()
    // get_page_Data()
  }, [])
  //////////////////////////////////////////////////////////////////////////////###

  // console.log('footer', data)


  return (
    <footer className='bg-blue3 text-white'>
      <div className='px-4 pt-16 text-white mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1350px] md:px-24 lg:px-8'>
        <div className='grid text-white gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='text-white sm:col-span-2'>
            <Link href='/' className={` inline-flex items-center `}>

              <Image
                src='/images/logo/logo.svg'
                alt='logo'
                width={200}
                height={40}
                priority
                className=' -ml-2 text-xl font-bold tracking-wide text-white uppercase'
              />
            </Link>

            <div className='mt-3 lg:max-w-sm'>
              <p className='text-sm text-white'>
                {data?.contact_notes}
              </p>
            </div>
          </div>
          <div className='space-y-2 text-white text-sm'>
            <p className='text-base font-bold tracking-wide text-white'>
              <Link href="/contact"
                className='transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800'>
                Contact Us
              </Link>
            </p>
            <div className='flex'>
              <p className='mr-1 text-white'>Phone:</p>
              <Link
                href={`tel:${data?.phone}`}
                aria-label='Our phone'
                title='Our phone'
                className='transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800'
              >
                {data?.phone}
              </Link>
            </div>
            <div className='flex'>
              <p className='mr-1 text-white'>Email:</p>
              <Link
                href={`mailto:${data?.email}`}
                aria-label='Our email'
                title='Our email'
                className='transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800'
              >
                {data?.email}
              </Link>
            </div>
            <div className='flex'>
              <p className='mr-1 text-white'>Address:</p>
              <Link
                href={`https://www.google.com/maps/place/${data?.address}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Our address'
                title='Our address'
                className='transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800'
              >
                {data?.address}
              </Link>
            </div>
          </div>
          <div>
            <span className='text-base font-bold tracking-wide text-white'>
              Social
            </span>
            <div className='flex items-center mt-1 space-x-3'>
              <Link
                target='_blank'
                href={`${data?.tiktok}`}
                className='tiktok text-white hover:text-white/70 transition-colors duration-300 hover:text-deep-purple-accent-400'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  fill='currentColor'
                  className='h-5'
                >
                  {' '}
                  <path d='M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z' />
                </svg>
              </Link>
              <Link
                target='_blank'
                href={`${data?.instagram}`}
                className='instagram text-white hover:text-white/70 transition-colors duration-300 hover:text-deep-purple-accent-400'
              >
                <svg viewBox='0 0 30 30' fill='currentColor' className='h-6'>
                  <circle cx='15' cy='15' r='4' />
                  <path d='M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z' />
                </svg>
              </Link>
              <Link
                target='_blank'
                href={`${data?.facebook}`}
                className='facebook text-white hover:text-white/70 transition-colors duration-300 hover:text-deep-purple-accent-400'
              >

                <svg viewBox='0 0 24 24' fill='currentColor' className='h-5'>
                  <path d='M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z' />
                </svg>
              </Link>
              <Link
                target='_blank'
                href={`${data?.youtube}`}
                className='youtube text-white hover:text-white/70 transition-colors duration-300 hover:text-deep-purple-accent-400'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 576 512'
                  fill='currentColor'
                  className='h-6'
                >
                  {' '}
                  <path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z' />
                </svg>
              </Link>
            </div>
            <p className='mt-4 text-sm text-white hover:texttext-white/70'>
              {data?.social_notes}
            </p>
          </div>
        </div>
        <div className='flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row'>
          <p className='text-sm text-white'>
            © Copyright {new Date().getFullYear()} - All rights reserved.
          </p>
          <div className='flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row'>
            <Link
              href='https://www.xtreme-communication.com/'
              className='text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400'
            >
              <p>X.Treme Communication</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

