'use client'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'

// import { months } from './data.json'
import { readItems } from '@directus/sdk'
import directus from '@/lib/directus'
/* eslint-disable react/prop-types */
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  format,
  parse,
  addMonths,
  subMonths
} from 'date-fns'
// import { busyDays } from './data.json'
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line react/prop-types
export default function Calendarplan ({ plan, planfrom, planto }) {
  // const [plan, setplan] = useState([])
  // const [day, setDay] = useState([])
  // console.log('plan-date-notavalble', plan)
  // console.log('plan-date-from', plan?.from)
  // console.log('plan-date-to', plan?.to)

  const [currMonth, setCurrMonth] = useState(
    plan?.from
      ? parse(plan?.from, 'yyyy-MM-dd', new Date(plan?.from))
      : new Date()
  )

  function onMonthChange (value) {
    setCurrMonth(value)
  }

  const dayCount = getDaysInMonth(currMonth)
  const days = Array.from({ length: dayCount }).map((_, index) => index + 1)
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    format(addDays(startOfMonth(currMonth), index), 'EEE')
  )

  // Function to check if a day is between plan.from and plan.to (inclusive)
  function isDayInRange (dayIndex /* , plan */) {
    const formattedDate = format(
      addDays(startOfMonth(currMonth), dayIndex - 1),
      'yyyy-MM-dd'
    )

    // console.log('formattedDate', formattedDate)
    if (!plan) return false // Handle cases where plan is undefined

    const startDate = new Date(plan.from)
    const endDate = new Date(plan.to)
    const targetDate = new Date(formattedDate)

    return targetDate >= startDate && targetDate <= endDate
  }

  return (
    <main className='mt-5'>
      <div className='text-center items-center    '>
        {/* <button
          className='text-blue3'
          onClick={() => onMonthChange(subMonths(currMonth, 1))}
        >
          <GrLinkPrevious className='text-2xl' />
        </button> */}
        <div className='text-center mb-3 '>
          <h1 className='py-2   rounded-3xl border-[1px] border-solid border-blue3 font-semibold text-blue3'>
            {format(currMonth, 'MMMM - yyyy  ')}
            {/* End : {format(plan.to, ' EEEE  MMMM dd')} */}
          </h1>
        </div>
        {/* <button
          className='text-blue3'
          onClick={() => onMonthChange(addMonths(currMonth, 1))}
        >
          <GrLinkNext className='text-2xl' />
        </button> */}
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
            className={`text-sm aspect-square rounded-lg p-2 font-bold border border-gray-300 ${
              isDayInRange(day)
                ? 'bg-blue3       text-white'
                : 'bg-gray-100 border-[0.5px] border-blue-900  border-solid text-blue3'
            } flex items-center justify-center`}
          >
            <span>{day}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
