'use client'

import { useState } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab } from "@nextui-org/react";
import Link from "next/link"
import { IoIosWifi } from 'react-icons/io'
import { MdOutlineScubaDiving } from 'react-icons/md';
// In a real application, this data would be fetched from the Directus CMS based on the route ID


export default function RouteDetails({ routeData }) {
    // const [selectedDate, setSelectedDate] = useState(new Date())
    // console.log('routeData in RouteDetails', routeData)
    // Check if routeData exists
    if (!routeData) {
        return <div>Route not found</div>
    }
    const trip_schedule = routeData?.trip_schedules
    // console.log('trip_schedule in RouteDetails', trip_schedule)
    // Create an array of dates for all trips
    const tripDates = trip_schedule?.flatMap(trip => {
        const start = new Date(trip?.start_date)
        const end = new Date(trip?.end_date)
        const dates = []
        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            dates.push(new Date(dt))
        }
        return dates
    })

    return (
        <>

            <h2 className="text-sm title-font text-gray-500 tracking-widest">DESTINATION</h2>
            <h1 className="text-blue3 text-3xl title-font font-medium mb-1">{routeData?.related_route?.route_name}</h1>
            <div className="flex mb-4">
                <span className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                        <svg
                            key={star}
                            fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    ))}
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">92 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center justify-between space-x-1  text-blue3">
                            {/* nitrox icon */}
                            < MdOutlineScubaDiving />
                            <p className='text-gray-600'>Free Nitrox</p>
                        </span>
                        <span className="flex items-center justify-between space-x-1 text-blue3">
                            {/* wifi icon */}
                            <IoIosWifi />
                            <p className='text-gray-600'>Free Wifi</p>
                        </span>
                    </div>
                </span>
            </div>
            <div className=" w-full mt-6 items-center pb-5 border-b-2     border-gray-100 mb-5">
                <Card
                    shadow='sm'
                    radius='md'
                >
                    <CardHeader>
                        {/* <h2 className="text-2xl font-semibold">Trip Details</h2> */}
                    </CardHeader>
                    <CardBody>
                        {/* <p className="mb-4 line-clamp-3">{routeData?.related_route?.description}</p> */}
                        <Tabs
                            classNames={{
                                tabList: "gap-5 rounded-medium  items-center text-center shadow-none  bg-gray-100 text-white w-full mx-auto relative   p-2 border-b border-divider",
                                cursor: "w-full  items-center text-center bg-[#2f285b]   text-sm font-medium text-white    ",
                                tab: "max-w-fit text-white items-center text-center  h-12",
                                tabContent: "group-data-[selected=true]:text-[#FFF]     w-full rounded-none p-2",
                            }}
                            aria-label="Route details">
                            <Tab key="Highlights" title="Highlights">
                                <div
                                    dangerouslySetInnerHTML={{ __html: routeData?.Highlights }}
                                    className=' mb-4 text-wrap text-gray-700 leading-relaxed '
                                ></div>

                            </Tab>
                            <Tab key="included" title="Included">
                                <div
                                    dangerouslySetInnerHTML={{ __html: routeData?.included }}
                                    className=' mb-4 text-wrap text-gray-700 leading-relaxed '
                                ></div>

                            </Tab>
                            <Tab key="days" title="Days">
                                {routeData?.days?.map((day) => (
                                    <div key={day?.id} className="mb-4">
                                        <h3 className="font-bold">{day?.item?.day_number}</h3>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: day?.item?.day_details }}
                                            className='w-full mb-4 text-wrap text-gray-700 leading-relaxed '

                                        >

                                        </div>
                                    </div>
                                ))}
                            </Tab>

                        </Tabs>
                    </CardBody>
                </Card>
            </div>

        </>
    )
}


