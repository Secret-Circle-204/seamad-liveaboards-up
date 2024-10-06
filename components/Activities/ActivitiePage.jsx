'use client'
import React, { useState } from 'react'
import RelatedActivitie from '../Activities/RelatedActivitie'
import getAssetURL from '@/lib/get-asset-url'

const ActivitiePage = ({ activitie }) => {
    const activities = activitie

    const [activeImage, setActiveImage] = useState(activities[0].activities_details[0].image)
    const [active, setActive] = useState(activities[0].id)


    const handleActive = (id) => {
        setActiveImage(activities.find(activity => activity.id === id)?.activities_details[0].image)
        setActive(id)
    }


    return (
        <div className='w-full h-full pt-5 mx-auto '>
            <section
                className='w-full bg-cover mx-auto h-[80vh] object-cover object-center bg-center bg-no-repeat items-center text-center justify-center flex flex-col flex-wrap'
                style={{ backgroundImage: `url(${getAssetURL(activeImage)})` }}

            >

                <div className='   bg-blue3/30 shadow-primary/40   shadow-2xl drop-shadow-2xl   w-full  items-center text-center justify-center  text-white max-w-[1200px] mx-auto  p-5 '>
                    <h1 className='  drob-shadows   text-3xl font-semibold '>
                        Discover Our Activities
                    </h1>
                    <p className=' px-5 pt-1  max-w-[80%] mx-auto '>
                        A wide range of activities available in and around our villages


                    </p>
                </div>
            </section>

            <div className=' mt-16    bg-blue3   max-w-[1200px] mx-auto text-2xl font-bold lg:grid lg:grid-cols-5 lg:gap-8 flex flex-wrap gap-4  items-center p-6 justify-between  '>
                {/* by default show activitie 1 */}

                {activities?.map(activity => (
                    <button
                        key={activity?.id}
                        className={`  font-bold  ${active === activity?.id ? 'text-blue-600' : 'text-white'}  `}
                        onClick={() => handleActive(activity?.id)}>
                        {activity?.title}
                    </button>

                ))}

            </div>

            <div className=' max-w-[1200px] mx-auto py-12 ' >
                {activities?.map(data => (
                    <div key={data?.id} className={` ${active === data?.id ? 'block' : 'hidden'}     w-full `}>
                        <div className=' px-8 w-full border-b border-body-color border-opacity-50   text-2xl py-3  gap-4'>
                            <h2>{data?.title}</h2>
                            <p>{data?.subtitle}</p>
                        </div>
                        <div className='w-full grid grid-cols-1 gap-4'>

                            <RelatedActivitie data={data} active={active} handleActive={handleActive} />
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default ActivitiePage




// 'use client'
// import React, { useState } from 'react'
// import RelatedActivitie from '../Activities/RelatedActivitie'
// import getAssetURL from '@/lib/get-asset-url'
// export default function ActivitiePage({ activitie }) {

//     console.log('activitie-component', activitie)
//     const data = activitie?.map(item => item)
//     console.log('activitie-details', data)

//     console.log('activitie-component', activitie)
 
//     const [active, setActive] = useState(data[0]?.id)

//     const [imageActiv, setActivImage] = useState(data?.map(item => item?.activities_details[0]?.image))

//     const handleActive = (id) => {
//         setActive(id)
//         setActivImage(data?.map(item => item?.activities_details?.map(item => item?.image)))
//     }


//     return (
//         <div className='w-full h-full py-12 mx-auto '>
//             <section
//                 className={` ${active === data?.map(item => item.id) ? 'block' : 'hidden'}  w-full bg-cover mx-auto     h-[80vh]  object-cover object-center bg-center bg-no-repeat items-center text-center justify-center flex flex-col flex-wrap    `}
//                 style={{

//                     backgroundImage: `url(${getAssetURL(imageActiv)})`
//                 }}
//             >
//                 <div className='   bg-blue3/30 shadow-primary/40   shadow-2xl drop-shadow-2xl   w-full  items-center text-center justify-center  text-white max-w-[1200px] mx-auto  p-5 '>
//                     <h1 className='  drob-shadows   text-3xl font-semibold '>
//                         Discover Our Activities
//                     </h1>
//                     <p className=' px-5 pt-1  max-w-[80%] mx-auto '>
//                         A wide range of activities available in and around our villages


//                     </p>
//                 </div>
//             </section>

//             <div className=' mt-16    bg-blue3   max-w-[1200px] mx-auto text-2xl font-bold lg:grid lg:grid-cols-5 lg:gap-8 flex flex-wrap gap-4  items-center p-6 justify-between  '>
//                 {/* by default show activitie 1 */}

//                 {data?.map(data => (
//                     <button
//                         key={data?.id}
//                         className={`  font-bold  ${active === data?.id ? 'text-blue-600' : 'text-white'}  `} onClick={() => handleActive(data?.id)}>
//                         {data?.title}
//                     </button>

//                 ))}

//             </div>

//             <div className=' max-w-[1200px] mx-auto py-12 ' >
//                 {data?.map(data => (
//                     <div key={data?.id} className={` ${active === data?.id ? 'block' : 'hidden'}     w-full `}>
//                         <div className='w-full border-b border-body-color border-opacity-50   text-2xl p-3  gap-4'>
//                             <h2>{data?.title}</h2>
//                             <p>{data?.subtitle}</p>
//                         </div>
//                         <div className='w-full grid grid-cols-1 gap-4'>

//                             <RelatedActivitie data={data} active={active} handleActive={handleActive} />
//                         </div>
//                     </div>
//                 ))}

//             </div>
//         </div>
//     )
// }
