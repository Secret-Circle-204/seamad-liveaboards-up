'use client'
import React, { useState, useEffect } from 'react';
import ScheduleSearch from '@/components/AllTrips/ScheduleSearch';
import ScheduleMain from '@/components/AllTrips/ScheduleMain';
import { getYear, getMonth, format, isBefore } from 'date-fns';
import UseAnimations from "react-useanimations";
import calendar from 'react-useanimations/lib/calendar';
import arrowUp from 'react-useanimations/lib/arrowUp';
import activity from 'react-useanimations/lib/activity';
import Link from 'next/link';


const ScheduleTable = ({ tripsSchedule: initialTrips, tripName }) => {

  const [trips, setTrips] = useState(initialTrips);
  const [filter, setFilter] = useState({
    month: '',
    from: '',
    to: '',
    year: '',
    trip_name: '',
  });

  const years = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() + i);

  // Calculate trip status counts
  const [tripStatusCounts, setTripStatusCounts] = useState({
    total: 0,
    available: 0,
    completed: 0,
    totalIccon: calendar,
    availableIccon: arrowUp,
    completedIccon: activity,

  });

  useEffect(() => {
    const counts = trips.reduce((acc, trip) => {
      acc.total++;
      acc.totalIccon = calendar;
      const tripDate = new Date(trip?.end_date); // Assuming 'to' is the departure date
      const now = new Date();

      // available Logic:
      if (isBefore(now, tripDate) && trip?.available_places > 0) { // If trip is in the future and has available places 
        acc.available++;
        acc.availableIccon = activity;
      } else if (trip?.available_places === 0) { // If trip is completed
        acc.completed++;
        acc.completedIccon = arrowUp;
      }

      return acc;
    }, { total: 0, available: 0, completed: 0 });

    setTripStatusCounts(counts);
  }, [trips]);

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetFilter = () => {
    setFilter({
      month: '',
      from: '',
      to: '',
      year: '',
      trip_name: '',
    });
  };

  const filteredTrips = trips.filter((trip) => {
    const tripMonth = getMonth(new Date(trip?.start_date));
    const tripYear = getYear(format(trip?.start_date, 'yyyy'));
    const tripName = trip?.trip_schedule?.related_route?.route_name ? trip?.trip_schedule?.related_route?.route_name?.toLowerCase() : '';
    const filterTripName = filter?.trip_name ? filter?.trip_name.toLowerCase() : '';

    return (
      (!filter?.year || filter?.year.toString() === tripYear.toString()) &&
      (!filter?.month || filter?.month.toString() === tripMonth.toString()) &&
      (!filter?.trip_name || tripName.includes(filterTripName)) &&
      (!filter?.start_date || !filter?.end_date || (new Date(trip?.start_date) >= new Date(filter?.start_date) && new Date(trip?.end_date) <= new Date(filter?.end_date)))
    );
  });



  // console.log('filteredTrips', filteredTrips)

  return (
    <main className="pt-10  lg:p-8">
      {/* Trip Status Summary */}
      <h2 className="max-w-[1200px] py-2 mx-auto text-xl bg-gradient-to-r from-[#2f285b]/90 via-[#2f285b]/80 to-[#2f285b]/90 text-center mb-4 font-bold text-white capitalize">Trips Status Summary</h2>

      <div className="p-4 max-w-[1230px] mx-auto trip-status-summary mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {['total', 'available', 'completed'].map((status) => (
          <div key={status} className="status-card  px-6 bg-gradient-conic bg-[length:200%_200%] from-[#2f285b]/100 via-[#2f285b]/90 to-[#2f285b]/100 text-white   py-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold capitalize">{status} Trips</h3>
            <p className="text-3xl font-bold mt-2">
              {tripStatusCounts[status] || 0}
            </p>
            {/* Icon */}
            <div className='flex justify-center text-white'>
              <div className=" text-white bg-white/80 p-1 rounded-full mt-3 duration-300 transform hover:scale-105" >
                <UseAnimations
                  animation={status === 'total' ? tripStatusCounts.totalIccon : status === 'available' ? tripStatusCounts.completedIccon : tripStatusCounts.availableIccon}
                  size={40}
                  speed={5}
                  strokeColor='#2f285b'
                  // strokeWidth={2} 
                  className="m-1"
                  style={{ width: '40px', height: '40px' }}
                  fillColor="white"
                />
              </div>
            </div>
            {/* Icon */}
          </div>
        ))}
      </div>
      
      {/* Trip Status Summary */}


      {/* Trips Search and Filtering */}

      <ScheduleSearch
        trips={trips}
        tripName={tripName}
        filter={filter}
        years={years}
        handleFilterChange={handleFilterChange}
        handleResetFilter={handleResetFilter}
      />

      <div className="  trips_page max-w-[1230px] mx-auto grid grid-cols-1 lg:gap-4 lg:p-4 md:grid-cols-1 lg:grid-cols-1">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <ScheduleMain key={trip?.id} trip_status={trip?.schedules_status} filter={filter} plan={trip} />
          ))
        ) : (
          <div className="flex items-center text-center justify-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <svg className="flex-shrink-0 animate-ping1 inline w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-bold text-lg text-blue3 ">Oops!</span> There are no trips found.  Please try another date or filter by another status.
            </div>
            <Link
              className='flex m-[5px] w-full text-white bg-primary bg-wtext-white border-0 py-2 px-5 focus:outline-none hover:bg-dark rounded text-lg'
              href={'/specialBook'}
              title='titlep'
            // defaultValue={titlep}
            >
              Charter
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ScheduleTable;
