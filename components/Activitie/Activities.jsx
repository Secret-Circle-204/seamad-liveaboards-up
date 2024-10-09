'use client'

import React, { useState, useEffect } from 'react';
 import getAssetURL from '@/lib/get-asset-url';
import RelatedActivity from './RelatedActivitie';

export default function Activities({ activities }) {
  console.log('activities', activities)
  const [activeImage, setActiveImage] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (activities?.length > 0) {
      setActiveImage(activities[0]?.activity_content[0]?.image || null);
      setActiveId(activities[0]?.id);
    }
  }, [activities]);

  const handleActive = (id) => {
    const activity = activities?.find(a => a.id === id);
    setActiveImage(activity?.activity_content[0]?.image || null);
    setActiveId(id);
  };

  if (!activities?.length) return <div>No activities found.</div>;

  return (
    <div className='w-full h-full pt-5 mx-auto'>
      <section
        className='w-full bg-cover mx-auto h-[80vh] object-cover object-center bg-center bg-no-repeat items-center text-center justify-center flex flex-col flex-wrap'
        style={{ backgroundImage: `url(${getAssetURL(activeImage)||getAssetURL(activities[0]?.activity_content[0]?.image)})` }}
      >
        <div className='bg-blue3/30 shadow-primary/40 shadow-2xl drop-shadow-2xl w-full items-center text-center justify-center text-white max-w-[1200px] mx-auto p-5'>
          <h1 className='drob-shadows text-3xl font-semibold'>
            Discover Our Activities
          </h1>
          <p className='px-5 pt-1 max-w-[80%] mx-auto'>
            A wide range of activities available in and around our villages
          </p>
        </div>
      </section>

      <div className='mt-16 bg-blue3 max-w-[1200px] mx-auto text-2xl font-bold lg:grid lg:grid-cols-5 lg:gap-8 flex flex-wrap gap-4 items-center p-6 justify-between'>
        {activities?.map(activity => (
          <button
            key={activity?.id}
            className={`font-bold ${activeId === activity?.id ? 'text-blue-600' : 'text-white'}`}
            onClick={() => handleActive(activity?.id)}
          >
            {activity?.title}
          </button>
        ))}
      </div>

      <div className='max-w-[1200px] mx-auto py-12'>
        {activities?.map(activity => (
          <div key={activity?.id} className={`${activeId === activity?.id ? 'block' : 'hidden'} w-full`}>
            <div className='px-8 w-full border-b border-body-color border-opacity-50 text-2xl py-3 gap-4'>
              <h2>{activity?.title}</h2>
              <p>{activity?.subtitle}</p>
            </div>
            <div className='w-full grid grid-cols-1 gap-4'>
              <RelatedActivity activityData={activity} activeActivityId={activeId} handleActivityClick={handleActive} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}







// 'use client'

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import getAssetURL from '@/lib/get-asset-url';

// export default function Activities({ activities }) {
//   console.log('activities', activities);
//   const [activeActivity, setActiveActivity] = useState(null);
//   const [activeActivityId, setActiveActivityId] = useState(null);

//   useEffect(() => {
//     if (activities.length > 0) {
//       setActiveActivity(activities[0]);
//       setActiveActivityId(activities[0]?.id);
//     }
//   }, [activities]);

//   const handleActive = (id) => {
//     const activity = activities.find((a) => a.id === id);
//     setActiveActivity(activity);
//     setActiveActivityId(id);
//   };

//   if (activities.length === 0) return <div>No activities found.</div>;

//   return (
//     <div className='w-full h-full pt-5 mx-auto'>
//       <section
//         className='w-full bg-cover mx-auto h-[80vh] object-cover object-center bg-center bg-no-repeat items-center text-center justify-center flex flex-col flex-wrap'
//         style={{ backgroundImage: `url(${getAssetURL(activeActivity?.activity_content[0]?.image)||getAssetURL(activities[0]?.activity_content[0]?.image)})` }}
//       >
//         <div className='bg-blue3/30 shadow-primary/40 shadow-2xl drop-shadow-2xl w-full items-center text-center justify-center text-white max-w-[1200px] mx-auto p-5'>
//           <h1 className='drob-shadows text-3xl font-semibold'>
//             Discover Our Activities
//           </h1>
//           <p className='px-5 pt-1 max-w-[80%] mx-auto'>
//             A wide range of activities available in and around our villages
//           </p>
//         </div>
//       </section>

//       <div className='mt-16 bg-blue3 max-w-[1200px] mx-auto text-2xl font-bold lg:grid lg:grid-cols-5 lg:gap-8 flex flex-wrap gap-4 items-center p-6 justify-between'>
//         {activities?.map((activity, index) => (
//           <button
//             key={index}
//             className={`font-bold ${activeActivityId === activity?.id ? 'text-blue-600' : 'text-white'}`}
//             onClick={() => handleActive(activity?.activity_content?.id)}
//           >
//             {activity?.activity_content?.title}
//           </button>
//         ))}
//       </div>

//       <div className='max-w-[1200px] mx-auto py-12'>
//         {activities.map((activity, index) => (
//           <div key={index} className={`${activeActivityId === activity?.id ? 'block' : 'hidden'} w-full`}>
//             <div className='px-8 w-full border-b border-body-color border-opacity-50 text-2xl py-3 gap-4'>
//               <h2>{activity?.title}</h2>
//               <p>{activity?.subtitle}</p>
//             </div>
//             <div className='w-full grid grid-cols-1 gap-4'>
//               {activity?.activity_content.map((detail) => (
//                 <section
//                   key={detail?.id}
//                   className={`${activeActivityId === activity?.id ? 'block' : 'hidden'}`}
//                 >
//                   <div className="max-w-[1200px] px-5 py-12 mx-auto">
//                     <div className="-my-8 divide-y-2 divide-gray-100">
//                       <div className="py-8 gap-6 flex flex-wrap md:flex-nowrap">
//                         <div className="lg:w-1/2 lg:p-0 w-full p-3 mx-auto md:mb-0 mb-6">
//                           <Image
//                             src={getAssetURL(detail?.image)}
//                             alt={detail?.title || "Activity image"}
//                             width={500}
//                             height={500}
//                             priority
//                             className="w-full h-auto object-cover"
//                           />
//                         </div>
//                         <div className="text-left lg:w-1/2 lg:p-0 w-full p-3">
//                           <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
//                             {detail?.title}
//                           </h2>
//                           <p className="leading-relaxed">{detail?.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }