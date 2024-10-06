
'use client'

import React, { useState } from 'react'
 
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Image } from "@nextui-org/react";
import Link from "next/link"
import { IoIosArrowBack } from 'react-icons/io'
// In a real application, this data would be fetched from the Directus CMS based on the route ID


export default function RouteDetails({ tripSchedule }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    console.log('tripSchedule in RouteDetails', tripSchedule)
    // Check if tripSchedule exists
    if (!tripSchedule) {
        return <div>Route not found</div>
    }
    const trip_schedule = tripSchedule?.trip_schedules
    console.log('trip_schedule in RouteDetails', trip_schedule)
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
        <div className=" mx-auto py-6">
            <Link href="/schedules" className="flex items-center mb-4 text-sm text-gray-600 hover:text-gray-800">
                <IoIosArrowBack className="w-4 h-4 mr-1" />
                View all Trips Schedules
            </Link>
            <h1 className="text-4xl font-bold mb-6">{tripSchedule?.related_route?.route_name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="col-span-2">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold"> Find all the dates of our {tripSchedule?.related_route?.route_name} cruises below
                            </h2>

                        </CardHeader>
                        <CardBody>

                            <div className="items-center justify-center gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {tripSchedule?.trip_schedules?.map((trip) => (
                                    <div key={trip?.id ?? `trip-${Math.random()}`} className="lg:mb-0 mb-6 p-4 border rounded">

                                        <p className="font-semibold mb-2 text-gray-700">  <span className="text-blue3 font-bold">Route Name : </span>{trip?.trip_schedule?.related_route?.route_name}</p>
                                        <p className="font-semibold mb-2 text-gray-700">  <span className="text-blue3 font-bold">From : </span>{trip?.start_date}  <span className="ml-2 text-blue3 font-bold">To : </span>{trip?.end_date}</p>
                                        <p className='mb-2'>Status: <span className={`  ${trip.available_places === 0 ? "bg-orange-500 px-2 py-1 m-2 rounded text-white" : trip.schedules_status === "available" ? " bg-green-500 px-4 py-1 m-2 rounded text-white" : "text-red-600"}`}>{trip?.schedules_status === "available" ? "Available" ? trip?.available_places === 0 ? "Completed" : "Available" : "Not Available" : trip?.schedules_status}</span></p>
                                        <p className='mb-2'>Available Places: {trip?.available_places}</p>
                                        <p className='mb-2'>Price: ${trip?.price}</p>

                                        <Link href={`/booking/${trip?.id}`} className="w-full mt-2">

                                            < Button className={`w-full mt-2 ${trip.available_places > 0 ? "bg-gradient-to-r from-dark via-blue-900 to-blue3 hover:bg-gradient-to-r hover:from-blue3 hover:via-blue-900 hover:to-dark text-white font-bold py-2 px-4 rounded" : trip.available_places === 0 ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2  m-2 rounded  " : "text-gray-600 bg-gray-200 "}`
                                            } disabled={trip.schedules_status !== "available" || trip?.available_places === 0} >
                                                {trip?.schedules_status === "available" ? "Book Now" ? trip?.available_places === 0 ? "Not Available" : "Book Now" : "Not Available" : trip?.schedules_status
                                                }
                                            </Button>
                                        </Link>

                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div >
            </div >
        </div >
    )
}