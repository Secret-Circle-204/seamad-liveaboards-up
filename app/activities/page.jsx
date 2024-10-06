 
import ActivitiePage from '@/components/Activities/ActivitiePage'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'
import Link from 'next/link'
// import Head from '@/app/head'
export const revalidate = 30;
async function getProject() {
  try {
    const activities = await directus.request(
      readItems('activities', {
        fields: [
          '*',
          'title',
          'subtitle',
          'description',
          'sort',
          'image',
          'data_created',
          'data_updated',
          'status',
          'activities_details.*',

          
        ],
         
        sort: ['sort'],
        next: {
          revalidate: 30
        },
      }),

    )

    //console.log('activities', activities)
    return activities
  } catch (error) {
    notFound('Error fetching data Mr Hamza :', error)
  }
}

export default async function ActivitiesPages() {
  const activities = await getProject()

  // console.log('activities-page', activities)

  return (

    <>

{/* <Head page={'activities'} /> */}
      <div className='w-full h-full pt-12 mx-auto '>
       
      <ActivitiePage activitie={activities} />
       
    </div>
      </>


)
}
 