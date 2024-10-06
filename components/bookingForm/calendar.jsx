'use client'

import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'

import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  format,
  parse,
  addMonths,
  subMonths,
  getYear
} from 'date-fns'
import React, { useState, useEffect } from 'react'

export default function Calendar({ plans, currentMonth, setCurrentMonth, onSelectDates }) {
  const [selectedStart, setSelectedStart] = useState(null)
  const [selectedEnd, setSelectedEnd] = useState(null)

  useEffect(() => {
    onSelectDates([selectedStart, selectedEnd])
  }, [selectedStart, selectedEnd])

  const handleDayClick = (day) => {
    if (!isDayInRange(day, currentMonth, plans)) {
      const newDate = parse(
        format(addDays(startOfMonth(currentMonth), day - 1), 'yyyy-MM-dd'),
        'yyyy-MM-dd',
        new Date()
      )

      if (selectedStart && selectedEnd) {
        setSelectedStart(null)
        setSelectedEnd(null)
      }

      if (!selectedStart) {
        setSelectedStart(newDate)
      } else if (newDate > selectedStart) {
        setSelectedEnd(newDate)
      } else {
        setSelectedStart(null)
        setSelectedEnd(null)
      }
    }
  }

  const isDayInRange = (day, currentMonth, plans) => {
    const formattedDate = format(
      addDays(startOfMonth(parse(format(currentMonth, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date())), day),
      'yyyy-MM-dd'
    )
    return plans.some(plan => plan?.start_date <= formattedDate && plan?.end_date >= formattedDate)
  }

  const handlePrevMonth = () => {
    if (currentMonth < new Date()) return
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleMonthChange = (value) => {
    setCurrentMonth(value)
  }

  const dayCount = getDaysInMonth(currentMonth)
  const days = Array.from({ length: dayCount }).map((_, index) => index + 1)
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    format(addDays(currentMonth, index), 'EEE')
  )

  return (
    <main className='mt-5'>
      <div className='pt-4 pb-6 text-center font-semibold text-blue3'>
        <span className='text-xl font-semibold'>Select Your Trip Dates</span>
        <p>Click on a Calendar to Choose a first and last date of your trip</p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <GrLinkPrevious
          className='bg-blue3 text-white text-2xl p-1 cursor-pointer hover:scale-95 hover:bg-blue3/85 rounded-md'
          onClick={handlePrevMonth}
        />

        <span className='text-lg font-bold'>
          {format(currentMonth, 'MMMM yyyy')}
        </span>

        <GrLinkNext
          className='bg-blue3 text-white text-2xl p-1 cursor-pointer hover:scale-95 hover:bg-blue3/85 rounded-md'
          onClick={handleNextMonth}
        />
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {weekDays.map(day => (
          <p key={day} className='text-center'>
            {day}
          </p>
        ))}

        {days.map(day => (
          <div
            key={day}
            className={`text-sm aspect-square rounded-lg p-2 font-bold border border-gray-300 ${!isDayInRange(day, currentMonth, plans)
              ? day === selectedStart?.getDate() &&
                (selectedEnd?.getDate() === day ||
                  !selectedStart ||
                  !selectedEnd)
                ? 'bg-blue-500 text-white'
                : day === selectedStart?.getDate()
                  ? 'bg-blue-500 scale-90 rounded-3xl text-white'
                  : day === selectedEnd?.getDate()
                    ? 'bg-blue-700 scale-90 rounded-3xl text-white'
                    : 'bg-gray-100 border-[0.5px] border-blue-900  border-solid cursor-pointer text-blue3 hover:bg-gray-400'
              : 'bg-blue3 cursor-not-allowed text-white'
              } flex items-center justify-center`}
            onClick={() => handleDayClick(day)}
          >
            <span>{day}</span>
          </div>
        ))}
      </div>
      {/* {selectedStart && selectedEnd && <p>{selectedStart} - {selectedEnd}</p>} show selected dates here */}


      <div className='mt-4 space-y-5'>

        <div className='rounded-lg space-y-1'>
          <label htmlFor='date' className='pt-2 text-gray-700'>Your Reservation Start Date: </label>
          <input
            className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50 text-blue3'
            required
            type='date'
            value={selectedStart ? format(selectedStart, 'yyyy-MM-dd') : ''}
            onChange={(e) => setSelectedStart(parse(e.target.value, 'yyyy-MM-dd', new Date()))}
          />


          <label htmlFor='date' className='pt-2 text-gray-700'> Your Reservation End Date: </label>
          <input
            type='date'
            className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50 text-blue3'
            required
            value={selectedEnd ? format(selectedEnd, 'yyyy-MM-dd') : ''}
            onChange={(e) => setSelectedEnd(parse(e.target.value, 'yyyy-MM-dd', new Date()))}
          />

        </div>
      </div>
    </main>
  )
}


