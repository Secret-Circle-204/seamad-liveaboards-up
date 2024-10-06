import RelatedPost from '@/components/Blog/RelatedPost'
import Image from 'next/image'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'
import { HiCalendar } from 'react-icons/hi'
import { format } from 'date-fns'
import Head from '@/app/head'
import Link from 'next/link'
export const revalidate = 30

async function getPost(id) {
  try {
    const post = await directus.request(
      readItem('posts', id, {
        filter: {
          id: { _eq: id }
        },

        next: {
          revalidate: 10
          // cache: 'no-store'
        },

        fields: [

          'id',
          'image.*',
          'title',
          'slug',
          'content',
          'date_created',

          'video_url',

          'summary',

          'sort',
          'image',
          'image.*.*'

        ],

        // status: ['published']
        // limit: -1
        // sort: ['sort']
      }),

    )

    //console.log('explor', explor)
    return post
  } catch (error) {
    notFound('Error fetching data Mr Hamza :', error)
  }
}
async function getPostAll() {
  try {
    const post = await directus.request(
      readItems('posts', {


        next: {
          revalidate: 30
          // cache: 'no-store'
        },

        fields: [

          'id',

          'title',
          'slug',


          'summary',


        ],

        // status: ['published']
        // limit: -1
        // sort: ['sort']
      }),

    )

    //console.log('explor', explor)
    return post
  } catch (error) {
    notFound('Error fetching data Mr Hamza :', error)
  }
}

export default async function BlogSidebarPage({ params }) {

  const post = await getPost(params.id)
  const postAll = await getPostAll()
  // console.log('post-----------', post)

  return (
    <>
      <Head page={'Blog/Post'} />

      <section className='pt-[150px] pb-[120px]'>
        <div className='max-w-[1200px] mx-auto'>
          <div className='-mx-4 flex flex-wrap justify-center'>
            <div className='w-full px-4'>
              <div>
                <div className='mb-10 flex flex-wrap items-center  border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10'>
                  <div className='w-full mr-10 mb-5 space-x-5 flex items-center'>
                    <div className=' '>
                      <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                        <Image
                          src={getAssetURL(post?.image?.filename_disk)}
                          alt='author'
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                    <div className=' '>
                      <h4 className='mb-1   w-full text-base font-medium text-body-color'>
                        Published Date
                      </h4>

                    </div>
                    <div className=' flex items-center  '>
                      <span>
                        <HiCalendar className='mr-3 text-body-color w-15 h-15' />

                      </span>
                      <p className='text-base w-full  font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed  '>
                        {format(new Date(post?.date_created), 'dd MMM, yyyy')}
                        {/* {post?.date_published?.substring(0, 10)} */}
                      </p>

                    </div>
                  </div>
                </div>
                <div>
                  <p className='mb-10 text-2xl  font-medium  leading-relaxed text-gray-700  sm:leading-relaxed  lg:leading-relaxed   xl:leading-relaxed'>
                    {/* {post?.summary} */}
                    {post?.title}
                  </p>
                  <div className='mb-10 w-full overflow-hidden rounded'>
                    <div className='relative aspect-[97/60] w-full sm:aspect-[97/44]'>
                      {post?.image && post?.image?.filename_disk ? (
                        <Image
                          src={getAssetURL(post?.image?.filename_disk)}
                          alt='image'
                          width={800}
                          height={500}
                          loading='lazy'
                          className='w-full object-cover object-center'
                        />
                      ) : post?.video_url && (

                        <iframe
                          className=' h-full w-full rounded-lg'
                          src={`https://www.youtube.com/embed/${post?.video_url}`}
                          width="100%"
                          title="YouTube video player"
                          frameBorder={0}
                          allow="acceleRometer; autoplay; clipboardWrite; encryptedMedia; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        >

                        </iframe>
                      )}{!post && post.image && post.image.filename_disk && (
                        <p>no content available right now</p>
                      )}
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                    className='content mb-10 text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed'
                  >

                  </div>
                  <div className='relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9'>
                    <p className='text-center text-base font-medium italic text-body-color'>
                      {post?.summary}
                    </p>

                  </div>

                  <div className='items-center justify-between sm:flex'>
                    <div className='mb-5'>
                      <h5 className='mb-3 text-sm font-medium text-body-color'>
                        Popular Tags :
                      </h5>
                      <div className='flex items-center'>

                        <div className='grid grid-cols-4 gap-2'>
                          {postAll?.map((tag, index) => (
                            <Link
                              key={index}
                              href={`/blog?tag=${tag}`}
                              className='hover:scale-105  text-blue-800  hover:text-blue-500 flex flex-col justify-center items-start text-left  text-sm font-medium   '
                            >
                              <p className='text-medium font-semibold '>{tag?.title}</p>
                              <p className='text-sm font-medium text-body-color line-clamp-1'>{tag?.summary}</p>

                            </Link>
                          ))}



                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
