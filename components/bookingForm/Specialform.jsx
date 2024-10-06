
'use client'
import { useState, useEffect } from 'react'
import Calendar from './calendar'
import { format, parse, startOfMonth } from 'date-fns'
import { readItems, createItem } from '@directus/sdk'
import directus from '@/lib/directus'
import { Country, State, City } from 'country-state-city';
import SpecialTicket from './SpecialTicket'
import { Spinner } from 'flowbite-react'

// const programs = [
//   { id: 1, name: 'Kites' },
//   { id: 2, name: 'Dive' },
//   { id: 3, name: 'Surf' },
//   { id: 4, name: 'Swim' },
//   { id: 5, name: 'Ski' }
// ]
export default function Specialform({ tripName, Schedules }) {
   console.log('Schedules', Schedules)
   console.log('tripName', tripName)
   
  const [selectedDates, setSelectedDates] = useState([])

  const [currentMonth, setCurrentMonth] = useState(
    format(startOfMonth(Schedules[0]?.start_date || new Date()), 'yyyy-MM-dd')
  )
  const formattedDates = selectedDates.map((date) => {
    if (date) {
      return format(new Date(date), 'yyyy-MMMM-dd' || 'yyyy-MM-dd');
    }
    return null; // Or handle null values as needed
  });

  console.log('formattedDates', formattedDates)
  const [trip, setTrip] = useState('')
  const [boat, setBoat] = useState('')
  const [number_of_guests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [ticketNumber, setTicketNumber] = useState(
    Math.floor(Math.random() * 10000)
  )
  const [loading, setLoading] = useState(false)
  const [showTicket, setShowTicket] = useState(false)

  const handleCalendarSelection = (dates) => {
    setSelectedDates(dates)
  }

  const onMonthChange = (value) => {
    setCurrentMonth(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    const formData = new FormData(event.target)


    const data = {
      trip: formData.get('trip'),
      boat: formData.get('boat'),
      number_of_guests: formData.get('number_of_guests'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      country: formData.get('country'),
      message: formData.get('message'),
      ticket_number: ticketNumber,
      trip_start_date: formattedDates[0],
      trip_end_date: formattedDates[1],
      // program: formData.get('programs'),
    }

    try {
      await directus.request(createItem('inbox', data))
      const response = await fetch('/api/mailer', {
        method: 'post',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`response status: ${response.status}`)
      }
      alert('Form successfully sent!')
      // setLoading(false)
    } catch (error) {
      console.error(error)
      // setShowTicket(true)
    }
    // setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 9000)
    setShowTicket(true)
    setLoading(false)
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <div className='relative'>
        <div>
          <div className='space-y-1 mt-2'>
            <label className='text-gray-700 ' htmlFor='Route'>Choose a Route</label>
            <select
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50'
              name='trip'
              id='trip'
              onChange={(e) => setTrip(e.target.value)}
              value={trip}
            // required
            >
                  <option value="">Select a Route</option>
                    {tripName?.map((trip) => (
                        <option key={trip} value={trip?.route_name}>
                            {trip}
                        </option>
                    ))}
            </select>
          </div>
          <div className='space-y-1 mt-2'>
            <label className='text-gray-700 ' htmlFor='boat'>Choose a Boat</label>
            <select
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50'
              name='boat'
              id='boat'
              onChange={(e) => setBoat(e.target.value)}
              value={boat}
            //  required
            >
              <option value=''>Select a Boat</option>
              {Schedules?.slice(0, 1)?.map((item, index) => (
                <option key={item?.id} id={item?.id} value={item.trip_schedule?.boat}>
                  {item?.trip_schedule?.boat}
                </option>
              ))}
            </select>
          </div>
          <Calendar
            currentMonth={currentMonth}
            plans={Schedules}
            from={Schedules.map((item) => item.start_date)}
            setCurrentMonth={setCurrentMonth}
            onMonthChange={onMonthChange}
            selectedDates={selectedDates}
            onSelectDates={handleCalendarSelection}
          />
          {/* <div className='space-y-1'>
            <label className='text-gray-700 ' htmlFor=''>Choose what you want to include in your trip </label>
            <checkboxgroup className='px-1 grid lg:grid-cols-4 grid-cols-3 gap-3'>
              {programs.map((program) => (
                <label key={program.id} htmlFor='programs'>
                  <input

                    // onChange={() => setProgram(program)}
                    className='mr-2  rounded-xl '
                    type='checkbox'
                    name='program'
                    id='program'
                    value={program.name}
                  />
                  {program.name}
                </label>
              ))}
            </checkboxgroup>
          </div> */}
          <div className='space-y-1 mt-2'>
            <label className='text-gray-700 ' htmlFor='number of guests'>Number of Guests</label>
            <input
              type='number'
              placeholder='Enter number of guests'
              name='number_of_guests'
              id='number_of_guests'
              min={1}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              required
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50'
            // defaultValue={1}
            />
          </div>
          <div className='space-y-1 mt-2'>
            <label className='text-gray-700 ' htmlFor='country'>Select Your Country</label>
            <select
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50'
              onChange={(e) => setCountry(e.target.value)}
              value={country.name}
              name='country'
              id='country'
              required
            // id='country'
            >
              <option value=''>Select Country</option>
              {Country.getAllCountries().map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name} {country.flag}
                </option>
              ))}
            </select>
          </div>
          <div className='grid grid-cols-3 gap-3 mt-5'>
            <input
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none '
              id='name'
              name='name'
              type='text'
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              required
            />
            <input
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none '
              id='email'
              name='email'
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' />
            <input
              className='w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none '
              id='phone'
              name='phone'
              type='tel'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter your phone number' />
          </div>
          <div className='space-y-1 mt-2'>
            <label className='text-gray-700 ' htmlFor='message'>Notes</label>
            <textarea
              name='message'
              id='message'
              type='text'
              cols={30}
              onChange={(e) => setMessage(e.target.value)}
              className='col-span-3 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-700 placeholder-gray-500 outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none '

              rows={10} placeholder='Please enter your notes' />
          </div>
        </div>
        {/* show the generated ticket set in form on submit and hide it on done   */}
        <div className='space-y-1 py-3 mt-2'>
          {/* <p className='py-5 font-bold'></p> */}


          {showTicket ? (
            <div className='lg:fixed absolute inset-0  mx-auto overflow-y-auto w-full max-sm:h-full  lg:my-32 lg:w-[50%] lg:py-16 items-center  flex flex-col  bg-gray-600  '>

              <SpecialTicket

                plan={Schedules}
                from={Schedules[0]?.start_date}
                to={Schedules[0]?.end_date}
                ticketNumber={ticketNumber}
                showTicket={showTicket}
                setShowTicket={setShowTicket}
                setTicketNumber={setTicketNumber}
                boat={boat}
                trip={trip}
                number_of_guests={number_of_guests}
                country={country}
                name={name}
                email={email}
                phone={phone}
                message={message}
              />

            </div>
          ) : null}


        </div>

        <div className='mt-5'>
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-md bg-primary py-3 px-8 text-base font-semibold text-white outline-none'
          >
            {loading ? <span> <Spinner /> Loading...</span> : 'Book Your Trip'}
          </button>
        </div>
      </div >
    </form>
  )
}


