'use client'

import { getDaysInMonth, startOfMonth, addDays, format, parse } from 'date-fns'

import React, { useState } from 'react'
// eslint-disable-next-line react/prop-types
export default function Calendarplan ({ plan }) {
  console.log('plan-date-notavalble', plan)
  console.log('plan-date-from', plan?.[0]?.from)
  console.log('plan-date-to', plan?.[0]?.to)

  const [currMonthm, setCurrMonthm] = useState(
    plan?.from
      ? parse(plan?.from, 'yyyy-MM-dd', new Date(plan?.from))
      : new Date()
  )

  function onMonthChange (value) {
    setCurrMonthm(value)
  }

  const dayCount = getDaysInMonth(currMonthm)
  const days = Array.from({ length: dayCount }).map((_, index) => index + 1)
  // const weekDays = Array.from({ length: 7 }).map((_, index) =>
  //   format(addDays(startOfMonth(currMonthm), index), 'EEE')
  // )

  // Function to check if a day is between plan.from and plan.to (inclusive)
  // function isDayInRange (dayIndex /* , plan */) {
  //   const formattedDate = format(
  //     addDays(startOfMonth(currMonthm), dayIndex - 1),
  //     'yyyy-MM-dd'
  //   )

  //   // console.log('formattedDate', formattedDate)
  //   if (!plan) return false // Handle cases where plan is undefined

  //   const startDate = new Date(plan.from)
  //   const endDate = new Date(plan.to)
  //   const targetDate = new Date(formattedDate)

  //   return targetDate >= startDate && targetDate <= endDate
  // }

  return (
    <main className='mt-5'>
      <div className='text-center items-center    '>
        <div className='text-center mb-3 '>
          <h1 className='py-2   rounded-xl border-[1px] border-solid border-gray-300 font-semibold text-blue3'>
            {format(currMonthm, 'MMMM - yyyy  ')}
            {/* End : {format(plan.to, ' EEEE  MMMM dd')} */}
          </h1>
        </div>
      </div>
    </main>
  )
}
