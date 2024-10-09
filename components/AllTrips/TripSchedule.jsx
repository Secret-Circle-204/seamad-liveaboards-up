'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Image } from "@nextui-org/react";
import Link from "next/link"
import { IoIosArrowBack } from 'react-icons/io'

export default function RouteDetails({ tripSchedule }) {
    if (!tripSchedule) {
        return <div>Route not found</div>
    }



    const getStatusClass = (trip) => {
        const today = new Date();
        const startDate = new Date(trip?.start_date);

        if (trip?.available_places === 0) {
            return "bg-orange-500 px-2 py-1 m-2 rounded text-white";
        } else if (startDate < today) {
            return "bg-red-500 px-2 py-1 m-2 rounded text-white";
        } else if (trip?.schedules_status === "available") {
            return "bg-green-500 px-4 py-1 m-2 rounded text-white";
        } else {
            return "text-red-600";
        }
    }
    const getStatusHref = (trip) => {
        const today = new Date();
        const startDate = new Date(trip?.start_date);
        if (startDate < today) {
            return "/specialBook";
        } else {
            return `/booking/${trip?.id}`;
        }
    }
    const getStatusText = (trip) => {
        const today = new Date();
        const startDate = new Date(trip?.start_date);

        if (trip?.available_places === 0) {
            return "Completed";
        } else if (startDate < today) {
            return "Expired! want to rent a private Route?";
        } else if (trip?.schedules_status === "available") {
            return "Available";
        } else {
            return trip?.schedules_status;
        }
    }

    const getButtonClass = (trip) => {
        const today = new Date();
        const startDate = new Date(trip?.start_date);
        if (trip?.available_places === 0) {
            return "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 m-2 rounded";
        } else if (startDate < today) {
            return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 m-2 rounded";
        } else {
            return "bg-gradient-to-r from-dark via-blue-900 to-blue3 hover:bg-gradient-to-r hover:from-blue3 hover:via-blue-900 hover:to-dark text-white font-bold py-2 px-4 rounded";
        }
    }

    const getButtonText = (trip) => {
        const today = new Date();
        const startDate = new Date(trip?.start_date);

        if (trip?.available_places === 0) {
            return "Completed";
        } else if (startDate < today) {
            return "Charter";
        } else if (trip?.schedules_status === "available") {
            return "Book Now";
        } else {
            return trip?.schedules_status;
        }
    }
    return (
        <div className="mx-auto py-6">
            <Link href={`/schedules#schedules`} className="flex items-center mb-4 text-sm text-gray-600 hover:text-gray-800">
                <IoIosArrowBack className="w-4 h-4 mr-1" />
                View all Trips Schedules
            </Link>
            <h1 className="text-4xl font-bold mb-6">{tripSchedule?.related_route?.route_name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="col-span-2">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">
                                Find all the dates of our {tripSchedule?.related_route?.route_name} cruises below
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <div className="items-center justify-center gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {tripSchedule?.trip_schedules?.map((trip, index) => (
                                    <div key={index} className="lg:mb-0 mb-6 p-4 border rounded">
                                        <p className="font-semibold mb-2 text-gray-700">
                                            <span className="text-blue3 font-bold">Route Name : </span>
                                            {trip?.trip_schedule?.related_route?.route_name}
                                        </p>
                                        <p className="font-semibold mb-2 text-gray-700">
                                            <span className="text-blue3 font-bold">From : </span>
                                            {trip?.start_date}
                                            <span className="ml-2 text-blue3 font-bold">To : </span>
                                            {trip?.end_date}
                                        </p>
                                        <p className='mb-2'>
                                            Status:
                                            <span className={getStatusClass(trip)}>
                                                {getStatusText(trip)}
                                            </span>
                                        </p>
                                        <p className='mb-2'>Available Places: {trip?.available_places}</p>
                                        <p className='mb-2'>Price: ${trip?.price}</p>
                                        <Link href={getStatusHref(trip)} className={`w-full mt-2`}>
                                            <Button
                                                className={`w-full mt-2 ${getButtonClass(trip)}`}
                                                disabled={trip?.schedules_status === "not_available" || trip?.available_places === 0}
                                            >
                                                {getButtonText(trip)}
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}