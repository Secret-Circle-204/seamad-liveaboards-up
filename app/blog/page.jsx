
import ExplorCard from '@/components/Blog/ExplorCard'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'

const getPosts = async () => {
  try {
    const data = await directus.request(readItems('posts', {
      next: { revalidate: 30 },
      fields: [

        'id',
        'image.*',
        'title',
        'slug',
        'content',
        'date_created',

        'video_url',

        'summary',

        'data_updated',
        'sort',
        'image',
        'image.*.*'
      ],
      sort: ['sort'],

    }));

    return data;
  } catch (error) {
    notFound(error);
  }
};


export default async function ExplorPages() {
  // const explor =  [...blogData ].find(explor => explor.id === params?.id )
  const post = await getPosts()
  // console.log('post-page---', post)
  return (
    <>
      {/* <Head page={'Blog'} /> */}
      <section
        id='blog'
        className='bg-primary/5 max-w-[1300px] mx-auto px-4 py-16 md:py-20 lg:py-28'
      >
        {/* <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        /> */}

        <div className='mb-10 flex flex-col items-center justify-center text-center'>
          <h1 className=' text-xl font-bold text-blue3 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl'>
            Blog
          </h1>
          <p className='text-body-color dark:text-gray-300 mb-8'>
            Introduction to the Red Sea The Red Sea, also known as the Gulf of
            Aden,
          </p>
          <div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3'>
            {post?.map((post) => (
              <div key={post?.id} className='w-full'>
                <ExplorCard explor={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
