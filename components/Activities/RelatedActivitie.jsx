
import getAssetURL from '@/lib/get-asset-url'
import React from 'react'
import Image from 'next/image'
export default function RelatedActivitie({ data, handleActive, active }) {
    // console.log('related activities details', data)

    return (
        <> 
            <section  className={`${active === data.id ? 'block' : 'hidden'}  `}>
                <div className="max-w-[1200px] px-5 py-12 mx-auto">
                    
                    {data?.activities_details?.map((data) => (
                    <div key={data?.id} className="-my-8 divide-y-2 divide-gray-100">
                        <div className="py-8   gap-6 flex flex-wrap md:flex-nowrap">
                            <div className=" lg:w-1/2 lg:p-0 w-full p-3  mx-auto md:mb-0 mb-6   ">
                                 <Image
                                  src={getAssetURL(data?.image)}
                                   alt=" image"
                                   width={500} height={500}
                                    loading="lazy"
                                   />
                            </div>
                            <div className=" text-left lg:w-1/2 lg:p-0 w-full p-3   ">
                                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{data?.title}</h2>
                                <p className="leading-relaxed">{data?.description}</p>
                               
                            </div>
                        </div>
                         
                       
                    </div>
                        
                    ))}
                </div>



        </section >


         
        </>
    )

}