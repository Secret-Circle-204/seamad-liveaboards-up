'use client'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ScheduleMain({ plan, filter, trip_status }) {
  const getStatusClass = (trip) => {
    if (trip?.available_places === 0) return 'bg-orange-400 text-white px-2 py-1 rounded';
    if (new Date(trip?.start_date) < new Date()) return 'bg-red-500 text-white px-2 py-1 rounded';
    return trip?.schedules_status === 'available' ? 'bg-green-400 text-white px-4 py-2 rounded animate-bounce duration-[2500ms] ease-out transition' : 'text-red-600';
  };
  const getStatusText = (trip) => {
    if (trip?.available_places === 0) return 'Completed';
    if (new Date(trip?.start_date) < new Date()) return 'Expired! Want to charter?';
    return trip?.schedules_status === 'available' ? 'Available' : 'Booked';
  };

  const getButtonClass = (trip) => {
    if (trip?.available_places === 0) return 'bg-orange-400 text-white px-2 py-2 rounded hover:bg-orange-500';
    if (
      new Date(trip?.start_date) < new Date()) return 'bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600';

    if (trip?.schedules_status === 'available')
      return 'bg-blue3 text-white px-4 py-2 rounded hover:bg-dark';

  };

  const getButtonText = (trip) => {
    if (trip?.available_places === 0) return 'Completed';
    if (new Date(trip?.start_date) < new Date()) return 'Charter';
    return trip?.schedules_status === 'available' ? 'Book Now' : trip?.schedules_status;
  };

  const currentMonth = format(plan.start_date, 'MMM - yyyy');

  return (
    <div className='w-full flex flex-wrap'>
      <section className='trips_page relative w-full h-full pt-3 text-gray-600 body-font max-w-[1230px] mx-auto'>
        {currentMonth !== filter.start_date && (
          <div key={currentMonth} className='max-w-[1230px] w-full lg:px-0 px-4 mx-auto my-6'>
            <div className='w-full py-5 sm:rounded-xl sm:border-[1px] border-solid border-blue3/80 font-semibold text-blue3'>
              <h1 className='text-xl font-medium text-center text-blue3'>{currentMonth}</h1>
            </div>
          </div>
        )}

        <div key={plan?.id} className='max-w-[1230px] lg:px-0 px-4 w-full mx-auto my-3'>
          <table className='bg-gray-200 max-sm:p-2 lg:bg-transparent my-table table-default uk-table jrt jrt-instance-1'>
            <thead>
              <tr>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Date</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Route</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Boat</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Start / End</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Status</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Available Places</th>
                <th className='py-3 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100'>Price</th>
                <th className='max-sm:hidden w-10 title-font tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='sm:text-center sm:items-center jrt-cell-1 lg:max-w-[160px] sm:py-14 text-gray-900'>
                  {format(plan?.start_date, 'dd - MMMM')}
                  <span uk-icon='arrow-right' className='uk-icon'>
                    <svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                      <polyline fill='none' stroke='#000' points='10 5 15 9.5 10 14'></polyline>
                      <line fill='none' stroke='#000' x1='4' y1='9.5' x2='15' y2='9.5'></line>
                    </svg>
                  </span>
                  {format(plan?.end_date, 'dd - MMMM')}
                </td>
                <td className='routee sm:text-center sm:items-center jrt-cell-2 lg:max-w-[160px] sm:py-14 text-gray-900'>
                  {plan?.trip_schedule?.related_route?.route_name}
                </td>
                <td className='sm:text-center sm:items-center jrt-cell-6 lg:max-w-[160px] sm:py-14 text-gray-900'>
                  {plan?.trip_schedule?.boat}
                </td>
                <td className='sm:text-center sm:items-center jrt-cell-3 lg:max-w-[160px] sm:py-14 text-gray-900'>
                  {plan?.start}
                  <span uk-icon='arrow-right' className='uk-icon'>
                    <svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                      <polyline fill='none' stroke='#000' points='10 5 15 9.5 10 14'></polyline>
                      <line fill='none' stroke='#000' x1='4' y1='9.5' x2='15' y2='9.5'></line>
                    </svg>
                  </span> {plan?.end}
                </td>
                <td className='jrt-cell-8 sm:text-center sm:items-center lg:max-w-[130px] sm:py-14 text-gray-900'>
                  <button className={getStatusClass(plan)}>{getStatusText(plan)}</button>
                </td>
                <td className='sm:text-center sm:items-center jrt-cell-5 lg:max-w-[100px] sm:py-14 text-gray-900'>
                  <span>{plan?.available_places} - Places</span>
                </td>
                <td className='sm:text-center sm:items-center status planned jrt-cell-7 lg:max-w-[160px] sm:py-14 text-gray-900'>
                  {plan?.currency} {plan?.price}
                </td>
                <td className='uk-button w-20 sm:pr-5 text-center'>
                  <button
                    type='button'
                    disabled={trip_status === 'not_available' || plan?.available_places === 0}
                    title={trip_status === 'not_available' || plan?.available_places === 0 ? 'Not Available' : 'Available'}
                    onClick={() => (window.location.href = `/booking/${plan?.id}`)}
                    className={`${getButtonClass(plan)} lg:mr-0 mr-6 inline-flex  items-center`}
                  >
                    {/* {trip_status === 'not_available' ? 'Completed' : plan?.available_places === 0 ? 'Not Available' : 'Book Now'} */}
                    {getButtonText(plan)}
                  </button>
                  <Link
                    className=' inline-flex mt-[8px] justify-center text-center text-white bg-blue-900 border-0 py-2 items-center px-6 focus:outline-none hover:bg-dark rounded text-md'
                    href='/specialBook'
                    title='title'
                  >
                    Charter
                  </Link>
                </td>
              </tr>
              <tr className='gap'></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}