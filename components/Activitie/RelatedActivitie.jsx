'use client'
import Image from 'next/image'
import getAssetURL from '@/lib/get-asset-url'

export default function RelatedActivity({ activityData, handleActivityClick, activeActivityId }) {
  return (
    <section className={`${activeActivityId === activityData?.id ? 'block' : 'hidden'}`}>
      <div className="max-w-[1200px] px-5 py-12 mx-auto">
        {activityData?.activity_content?.map((activityDetail) => (
          <div key={activityDetail?.id} className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 gap-6 flex flex-wrap md:flex-nowrap">
              <div className="lg:w-1/2 lg:p-0 w-full p-3 mx-auto md:mb-0 mb-6">
                <Image
                  src={getAssetURL(activityDetail?.image)}
                  alt={activityDetail?.title || 'Activity image'}
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="text-left lg:w-1/2 lg:p-0 w-full p-3">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{activityDetail?.title}</h2>
                <p className="leading-relaxed">{activityDetail?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
