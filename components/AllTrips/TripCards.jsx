'use client';
import React, { useState } from 'react';
import Image from 'next/image';
 
import Link from 'next/link';
 
import getAssetURL from '@/lib/get-asset-url';
 
export default function TripCards({ trip, index }) {
  console.log('trip-route-cards-data', trip)
  const now = new Date();
  
  return (
    <section className="flex flex-col bg-white shadow-lg rounded-lg  ">

      <div className="group  lg:flex lg:flex-auto">
        <div className="group  overflow-hidden  p-4 h-80  w-full  lg:w-56 lg:h-auto rounded-xl flex-none  relative">
          <Image
            className=" group-hover:scale-95 ease-in-out duration-300  rounded-xl   w-full   inset-0   h-full object-cover"
            src={getAssetURL(trip?.related_route?.route_images[0]?.directus_files_id) || ''}
            alt="trip card image"
            width={350}
            height={250}
          />
        </div>
        <form className="flex-auto p-3 lg:pl-2 lg:pr-5 lg:py-5">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold text-slate-900">
              {trip?.related_route?.route_name}
            </h1>
            <div className="text-lg font-semibold ">
              <button className="flex-none bg-blue3 hover:bg-gray-50 hover:text-blue3 focus:bg-gray-50 focus:text-blue3 focus:ring-2 focus:ring-offset-2 focus:ring-blue3 flex items-center justify-center w-7 h-7 rounded-lg text-white border border-slate-200" type="button" aria-label="Like">
                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
            <div className="line-clamp-5 w-full flex-none text-sm font-medium text-slate-700 mt-2">
              {trip?.related_route?.description}
            </div>
          </div>
          <div className="flex items-baseline mt-2 mb-6 pb-6 border-b border-slate-200">
         
          </div>
          <div className="flex-auto w-full flex space-x-2 lg:space-x-4">


            <button

              className="w-[39%] text-center h-10 px-2 font-semibold rounded-md bg-gradient-to-r from-blue3 to-dark text-white"
            >
              <Link
                href={`/trips/${trip?.id}#tripDetailsPage`}
                // className="flex-1 bg-transparent border border-blue3 text-blue3 py-2 px-4 rounded font-semibold hover:bg-dark hover:text-white transition duration-300"
                key={trip?.id}
              >
                View Details
              </Link>
            </button>
            <button className=" w-[61%] bg-transparent border border-blue3 text-blue3  px-2 rounded font-semibold hover:bg-dark hover:text-white transition duration-300">
              <Link href={`/schedules`}>
              Check  Schedules
              </Link>
            </button>
          </div>


        </form>
      </div>


    </section>

  );
}
 