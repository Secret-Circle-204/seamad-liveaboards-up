import { Suspense } from 'react';
 
import Head from '@/app/head';
import Activities from '@/components/Activitie/Activities';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getActivities } from '@/lib/apis';
// export const dynamic = 'force-dynamic'
export const revalidate = 10

 


export default async function ActivitiesPages() {
    const activities = await getActivities();

    return (
        <>
            <Head page={'activities'} />
            <div className='w-full h-full pt-12 mx-auto'>
                <Suspense fallback={<LoadingSpinner />}>
                    <Activities activities={activities} />
                </Suspense>
            </div>
        </>
    );
}