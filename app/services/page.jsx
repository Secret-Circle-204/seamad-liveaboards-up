
// import SharePost from '@/components/Blog/SharePost'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readItems, readItem, readFiles } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
import directus from '@/lib/directus'
import ServicesPdf from '@/components/Blog/ServicesPdf'
import Head from '@/app/head'
export const revalidate = 100;
async function getServices() {
  try {
    const services = await directus.request(readItems('services', {
      // filter: {
      //   date_published: {
      //     id: { _neq: null }
      //   }
      // },
      next: {
        revalidate: 100
      },
      fields: [
        'id',
        'title',
        'subtitle',
        'banner_image',
        'content_image',
        'content',
        // 'services_files.*.*',
        {
          services_files: [
            {
              pdf_files_id: [
                'id',
                'file_name',
                'file_summary',
                'file_pdf'
              ]
            }
          ]
        }


      ],

    }))

    return services

  } catch (error) {
    console.log(error)
  }
}


export default async function ServicesPage() {

  const servicesFiles = await getServices()
  //  console.log('services-files', servicesFiles)

  return (
    <>
      <Head page={'services'} />
      <section
        className=' relative  translate-y-[10%] h-[70vh]  object-cover   bg-center   bg-cover w-full'
        style={{
          backgroundImage: `url(${getAssetURL(servicesFiles?.banner_image)})`,
        }}
      >
        <div className=' absolute bottom-4  left-0 right-0 items-center  text-center     '>
          <div className='  text-white max-w-[1200px] mx-auto px-16 mt-40 sm:mt-[200px] sm:items-center lg:px-5    flex flex-wrap sm:flex  justify-between  max-sm:justify-center text-center  text-2xl drop-shadow-lg  transition-shadow duration-300 font-semibold'>
            <div className='items-center  text-center    '>
              <h1 className='lg:text-left ml-[-25px] items-center first-letter:capitalize  text-center    '>
                {servicesFiles?.title}
              </h1>
            </div>

            <div className=' text-sm font-light text-center items-center '>
              {/* <span className='first-letter:capitalize'>{serv?.title}</span> */}
            </div>
          </div>
        </div>
      </section>
      <div className=''>
        <section className='overflow-hidden pt-[180px] pb-[120px]'>
          <div className='container'>
            <div className='-mx-4 flex flex-wrap'>
              <div className='w-full px-4 lg:w-8/12'>
                <h2 className='mb-3 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight'>
                  {servicesFiles?.title}
                </h2>
                <p>{servicesFiles?.subtitle}</p>
                <div>
                  <div>
                    {/* <p className='mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed'>
                      {servicesFiles?.content}
                    </p> */}
                    <div className='mb-10 w-full overflow-hidden rounded'>
                      <div className='relative aspect-[97/60] w-full sm:aspect-[97/44]'>
                        <Image
                          src={getAssetURL(servicesFiles?.content_image)}
                          alt='image'
                          fill
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9'>
                      <div
                        dangerouslySetInnerHTML={{ __html: servicesFiles?.content }}
                        className='  text-lg leading-7 font-medium text-justify first-line:font-semibold first-line:uppercase  text-gray-500'>
                        {/* {servicesFiles?.content} */}

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <ServicesPdf data={servicesFiles} />
            </div>
          </div>
        </section>
      </div>
      {/* <Testimony /> */}
    </>
  )
}



