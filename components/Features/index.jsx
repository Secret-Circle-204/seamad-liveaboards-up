import Link from 'next/link'
import Image from 'next/image'
import getAssetURL from '@/lib/get-asset-url'

const Features = ({ aboutData }) => {
  const about = aboutData
  // console.log('home-about-section', about)
  if (!about) {
    return undefined
  }
  return (
    <section id='features' className='bg-primary/[.03] pt-16 md:pt-20 lg:pt-28'>
      <div className='container max-w-[1200px] mx-auto'>
      
        <div className=' items-center sm:items-start mb-12 w-full text-center sm:text-left text-lg mx-auto'>
        
           <div className=' w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
            <div className='   lg:col-span-2 rounded-lg   dark:bg-transparent'>
              <h1 className='mb-5 text-xl font-bold  text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl'>
                {about?.title}
              </h1>
              <p className='mt-0.5 text-gray-700'>
                {about?.content}
              </p>
              <Link href='/about'>
                <button className='bg-blue3 hover:bg-blue3/90 text-white font-bold py-2 px-4 rounded mt-5'>
                  Read More
                </button>
              </Link>
            </div>
            <div className='sm:max-h-[300px] rounded-lg bg-gray-200 '>
              <Image
                src={getAssetURL(about?.image) || null}
                alt='img'
                className='size-20 w-full h-full rounded-lg object-cover'
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>

        </div>
      </div>
    </section>
  )
}

export default Features
