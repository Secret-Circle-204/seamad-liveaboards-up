'use client'

import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
const bookings = [
  {
    date: '2024-05-22',
    available: true
  },
  {
    date: '2024-05-23',
    available: true
  },
  {
    date: '2024-05-24',
    available: true
  },
  {
    date: '2024-05-25',
    available: true
  }
  // {
  //   date: '2024-05-26',
  //   available: true
  // }

  // ... more bookings
]

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth())
  const [isOpen, setOpen] = useState(Boolean)

  const handleDateChange = newDate => setDate(newDate)

  const isAvailable = day => {
    const selectedDate = new Date(day)
    return bookings.some(
      booking =>
        booking.date === selectedDate.toISOString().slice(0, 10) &&
        booking.available
    )
  }

  const handleDayClick = day => {
    if (isAvailable(day)) {
      // Open booking form or perform booking action
      // ... your logic here

      setDate(new Date(date.getFullYear(), selectedMonth, day))

      document.getElementById('selectedDate').value = date
        .toISOString()
        .slice(0, 10)

      console.log('Booked')
    } else {
      console.log('Unavailable')
    }
  }

  return (
    <>
      <div className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50   leading-tight   dark:text-white  flex flex-row flex-wrap justify-between space-x-5'>
        <button
          onClick={() => setOpen(true)}
          className='   outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50   leading-tight   dark:text-white'
        >
          set date <span className='px-10 text-base font-medium '> ^</span>
        </button>
        {/* 
        <p>{date.toDateString()}</p>

        <p>{date.toISOString().slice(0, 10)}</p>

        <p>{date.getFullYear()}</p>

        <p>{date.getMonth()}</p>

        <p>{date.getDay()}</p>

        <p>{date.getDate()}</p> */}
        <span
          onClick={() => setOpen(false)}
          className='  outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50   cursor-pointer hover:text-blue3/80  leading-tight   dark:text-white'
        >
          X
        </span>
      </div>

      <div
        // className='p-10  '
        className='  flex h-full w-full items-center justify-center z-40     left-0  max-w-[900px] wow fadeInUp        rounded-md   p-8 dark:bg-primary/20  '
        data-wow-delay='.2s'
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        style={{
          display: isOpen ? 'block' : 'none'
        }}
      >
        <input type='date' id='selectedDate' className='hidden' />
        <Calendar
          onChange={handleDateChange}
          onDateChange={handleDateChange}
          tileClassName={({ date }) =>
            isAvailable(date) ? 'available' : 'not_unavailable'
          }
          tileDisabled={({ date }) => !isAvailable(date)}
          onClickDay={handleDayClick =>
            handleDayClick(date.getDate(), selectedMonth)
          }
          minDate={new Date()}
          // onClick={selectedDate => console.log(selectedDate)}
          value={date && date.toISOString().slice(0, 10)}
        />
      </div>
    </>
  )
}

export default CalendarComponent
