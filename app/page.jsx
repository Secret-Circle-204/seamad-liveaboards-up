
import Blog from '@/components/Blog'
import ScrollUp from '@/components/Common/ScrollUp'
import Contact from '@/components/Contact'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Video from '@/components/Video'
// import GoogleReviewsComponent from '@/components/review/GoogleReviewsComponent'
// import BookingForm from './form'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import { notFound } from 'next/navigation'
import Head from '@/app/head'
import Faq from '@/components/Faq'
export const revalidate = 10

async function getHome() {
  try {
    const response = await directus.request(readItems('home', {
      next: { revalidate: 10 },
      fields: [
        {


          components: [
            '*',
            {
              item: {
                block_hero: ['slogan', 'image', 'images.*'],
                about_section: ['title', 'content', 'image'],
                block_video: ['title', 'video_file.filename_disk', 'video_url', 'headline'],
                block_faqs: ['title', 'headline', 'faqs',

                  {
                    faqs: ['title', 'answer'],
                  }
                ],
              },
            },
          ],
          sort: ['sort'],
        },
      ],
      filter: {
        status: {
          _eq: 'published',
        },
      },
      // sort: ['sort'],
    }));
    return response;
  } catch (error) {
    console.error('Error fetching activities:', error);
    // throw new Error('Failed to fetch activities');
  }
}

export default async function Home() {

  const home = await getHome()



  return (
    <>

      <Head page={'home'} />
      <ScrollUp />
      <Hero heroData={home?.components[0]?.item} />

      <Features aboutData={home?.components[1]?.item} />
      <Video videoData={home?.components[2]?.item} />

      {/* <GoogleReviewsComponent /> */}


      <Blog />

      <Faq faqData={home?.components[3]?.item} />

      <Contact />
    </>
  )
}
