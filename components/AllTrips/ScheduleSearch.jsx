import React from 'react'
import { getMonth, getYear, format } from 'date-fns'

export default function ScheduleSearch({ filter, handleFilterChange, handleResetFilter, years, trips, tripName, handleMonthChange }) {
    // console.log('search-filter---*-*-*-*-*-*--:', filter.trip_name)
    // console.log('search-trips---Name-----------------:', tripName)
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <div className="max-w-[1200px] mx-auto search-bar items-center text-center flex flex-wrap flex-col justify-center p-3 gap-3">
            <p>Find your Next trip</p>
            <div className="flex lg:flex-row flex-col lg:py-5 gap-3 w-full">

                <select
                    name="trip_name" // Make sure this matches your filter
                    value={filter.trip_name}
                    onChange={handleFilterChange}
                    className="lg:w-full w-auto rounded border border-gray-300 p-2"
                >
                    <option value="">All Trips</option>
                    {tripName?.map((trip) => (
                        <option key={trip} value={trip?.route_name}>
                            {trip}
                        </option>
                    ))}
                </select>


                <select
                    name="month"
                    value={filter.month}
                    onChange={handleFilterChange}
                    className="lg:w-full w-auto rounded border border-gray-300 p-2"
                >
                    <option value="">Month</option>
                    {months.map((month) => (
                        <option key={month} value={month.toString()}>
                            {format(new Date(filter.year, month), 'MMMM')}
                        </option>
                    ))}
                </select>

                <select
                    name="year"
                    value={filter.year}
                    onChange={handleFilterChange}
                    className="lg:w-full w-auto rounded border border-gray-300 p-2"
                >
                    <option value="">Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                <div className="flex space-x-2 items-center rounded text-gray-800">
                    <label htmlFor="from">From:</label>
                    <input
                        type="date"
                        name="from"
                        value={filter.from}
                        onChange={handleFilterChange}
                        className="lg:w-full w-full text-gray-800 rounded border border-gray-300 p-2"
                    />
                </div>

                <div className="flex space-x-2 items-center rounded text-gray-800">
                    <label htmlFor="to">To:</label>
                    <input
                        type="date"
                        name="to"
                        value={filter.to}
                        onChange={handleFilterChange}
                        className="lg:w-full w-full text-gray-800 rounded border border-gray-300 p-2"
                    />
                </div>
            </div>

            <div className="w-full">
                <button
                    className="w-full lg:col-start-6 rounded border border-gray-300 p-2 bg-blue3 text-white hover:bg-blue3/90 focus:outline-none focus:ring-2 focus:ring-blue3/80 focus:ring-offset-2"
                    onClick={handleResetFilter}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

