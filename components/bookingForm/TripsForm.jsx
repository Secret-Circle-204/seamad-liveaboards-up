'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { readItems, createItem } from '@directus/sdk';
 import { format, parse, addDays, getYear, getDaysInMonth, startOfMonth } from 'date-fns';
// import { months } from './data.json';
import { Country, State, City } from 'country-state-city';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import directus from '@/lib/directus';
import { Spinner } from 'flowbite-react';

export default function TripsForm({ plan, modalIsOpen, setModalIsOpen }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [total_price, setTotalPrice] = useState(plan.price);
  const [number_of_guests, setNumberOfGuests] = useState(1);
  const [showDownload, setShowDownload] = useState(false);
  const [bookingDate, setBookingDate] = useState(format(new Date(), 'dd-MM-yyyy'));
  const downloadRef = useRef(null);
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  



  const generateTicketNumber = () => {
    const today = new Date() 
    const month = today.getMonth()
    const random = Math.floor(Math.random() * (999999  - 10000 ) + 1000).toString();
    return `${month}${random}`

  };
  
  const [ticketNumber, setTicketNumber] = useState(generateTicketNumber());
  
  const showDownloadButton = () =>{
    setShowDownload(true);
  }

  const handleDownload = async () => {
    const downloadElement = downloadRef.current;

    try {
      const canvas = await html2canvas(downloadElement);
      const imageData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'a4',
      });

      pdf.addImage(
        imageData,
        'PNG',
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
      );

      pdf.save(`${plan.name}-${ticketNumber}.pdf`);
    if (pdf) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowDownload(false); 
      } , 2000);
    }else{
      setLoading(false);
      alert('Something went wrong! with your download request. but your request is successfull! we will get back to you soon!');
    }     
      // setShowDownload(false);
     } catch (error) {
      console.error('Error while downloading', error);
    }
    
   };

  const closeModal = (e) => {
    if (
      e.key === 'Escape' ||
      e.target === e.currentTarget ||
      e.target === downloadRef.current ||
      e.target === document.querySelector('.close-modal')
    ) {
      setModalIsOpen(false);
      resetForm();
    }
  };


  // const handleClick = async (e) => {
  //   setLoading(true);
  //   try {
  //     setTicketNumber(generateTicketNumber());
  //     showDownloadButton();
  //     await handleSubmit(e);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //     resetForm();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('message', message);
    formData.append('total_price', total_price);
    formData.append('number_of_guests', number_of_guests);
    formData.append('trip', plan.name);
    formData.append('ticket_number', ticketNumber);


    const sendDataForm = {
      name,
      email,
      phone,
      trip: plan.name,
      check_in_date : bookingDate,
      ticket_number: ticketNumber,
      country,
      number_of_guests,
      total_price: plan.price * number_of_guests,
      message,
    };

    try {
      await directus.request(createItem('reservations', sendDataForm));
      const response = await fetch('/api/mailer', {
        method: 'post',
        body: formData,
      });

      console.log('response', response);
      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }

      alert('Form successfully sent!');
      // resetForm();
    } catch (error) {
      console.error(error);
    }
    showDownloadButton();
    
    setLoading(false);
    showDownloadButton(false);

  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setState('');
    setCity('');
    setMessage('');
    setTotalPrice(0);
    setBookingDate('')
    setNumberOfGuests(1);
    setShowDownload(false);
    setModalIsOpen(false);
  };

  console.log('ticketNumber', ticketNumber);

  return (
    <>
      {/* form Modal */}

      <div
        onClick={closeModal}
        className={` ${modalIsOpen ? 'opacity-100 translate-y-0 ease-in-out overflow-y-scroll translate-x-0 transition-transform duration-500 fixed z-40 inset-0 bg-blue3 bg-opacity-40 lg:h-screen lg:w-screen mx-auto flex items-start justify-center max-sm:max-w-[600px]  md:items-center pt-10 md:pt-0 ' : ' translate-y-[100%] transition-transform  opacity-0  duration-500 none'}`}
      >
        {modalIsOpen ? (
          <form
            className=' relative flex lg:flex-row space-y-5 flex-col flex-wrap   justify-between   px-3 sm:px-5 py-5  lg:w-[1000px]  max-w-[1000px] mx-auto  w-full   --h-1/2  md:h-3/4 bg-white rounded-md  --overflow-y-auto lg:p-5  p-10 shadow-2xl   '
            onSubmit={handleSubmit}
          >
            <div className='w-full  text-blue3  lg:mt-3 mt-2 lg:w-1/2 mb-0 '>
              <div className='space-y-1'>
                <input
                  className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  value={name}
                  onChange={e => setName(e.target.value)}
                  id={name}
                  autoComplete='name'
                  maxLength={35}
                  size='lg'
                  name='name'
                  type='text'
                  placeholder='Enter Your Name'
                  required
                />
              </div>
              <div className='space-y-1'>
                <input
                  className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id={email}
                  autoComplete='email'
                  maxLength={50}
                  size='lg'
                  name='email'
                  type='email'
                  placeholder='Enter Your Email'
                  required
                />
              </div>
              <div className='space-y-1'>
                <input
                  className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  id={phone}
                  autoComplete='phone'
                  maxLength={50}
                  size='lg'
                  name='phone'
                  type='tel'
                  placeholder='Enter Your Phone Number'
                  required
                />
              </div>
              {/* slect your cauntry */}
              <div className='space-y-1'>
                <select
                  className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  onChange={e => setCountry(e.target.value)}
                  value={country.name}
                  name='country'
                  id={country}
                >
                  <option value=''>Select Country</option>
                  {Country.getAllCountries().map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name} {country.flag}
                    </option>
                  ))}
                </select>
              </div>

              <div className=' mb-4 first-letter:space-y-1'>
                <input
                  onChange={e => setNumberOfGuests(e.target.value)}
                  placeholder='Enter Number of guests'
                  value={number_of_guests}
                  className='mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  type='number'
                  name='number_of_guests'
                  id={number_of_guests}
                  min={1}
                />
                {/* disabled selected */}
              </div>
              <div className='space-y-1'>
                <textarea
                  rows={10}
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  id={message}
                  name='message'
                  className='lg:mb-0 mb-3 w-full rounded-md border border-body-color border-opacity-10   py-2 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none '
                  placeholder='Please enter your notes here....'
                ></textarea>
              </div>
              <div className=' grid grid-cols-2 gap-4 lg:grid-cols-3  lg:pt-10'>
                <button
                  // onClick={handleClick}
                  name='submit'
                  type='submit'
                  value='submit'
                  disabled={loading}
                   
                  className='lg:col-span-2   bg-blue3 rounded-lg text-white px-5 p-2'
                >
                  <span>{loading ? <span > Sending.... <Spinner  /> </span>  : 'Confirm'}</span>

                </button>
                <button

                  className=' lg:col-span-1 close-modal-button bg-blue-500 cursor-pointer rounded-lg text-white px-5 py-[10px]'
                  onClick={closeModal}
                  aria-label='Close modal'
                >
                  Close 
                </button>
              </div>
            </div>
        


                         {/* your booking details */}
                <div className='  relative text-left w-full       sm:px-5 lg:w-1/2 '>
                  <h1 className='text-[18px] font-semibold'>
                    Your Ticket will generate here after confirmation
                  </h1>
                  <hr className='  border-blue3   mb-5' />

                  <div
                    style={{ display: showDownload ? 'block' : 'none' }}
                    value={plan?.name}
                  >
                    <div
                      className='   relative text-left w-full     bg-white/5  sm:p-3   '
                      ref={downloadRef}
                      id='booking-details-pdf'
                    >
                      <div className='flex space-y-3 flex-col gap-5'>
                        <h1
                          className='  text-2xl mt-0 font-bold'
                          value={plan?.name}
                      
                        >
                          Trip : <span className=' text-lg  '>{plan?.name}</span>
                        </h1>

                        <li className=' text-lg '>
                          Your Name :{' '}
                          <span className=' text-lg text-red-500'> {name} </span>
                        </li>
                        <li className=' text-lg '>
                          Booking-Date :{' '}
                          <span className=' text-lg text-red-500'>
                             
                            {bookingDate}
                          </span>
                        </li>
                        <li className=' text-lg '>
                          Trip-Started :{' '}
                          <span className=' text-lg text-red-500'>
                            {plan?.from} <span className=' text-lg text-gray-700'>
                              To : 
                              </span>
                              {plan?.to}
                          </span>
                        </li>
                        <li className=' text-lg '>
                          Number of guests :{' '}
                          <span className=' text-lg text-red-500'>
                            {number_of_guests}
                          </span>
                        </li>
                        <li>
                          Your Country :{' '}
                          <span className=' text-lg text-red-500'> {country}</span>
                        </li>
                        <li className=' '>
                          Total Price :{' '}
                          <span className=' text-lg text-red-500 '>
                            {plan?.currency} {plan?.price * number_of_guests}
                          </span>
                        </li>
                        {/* ticket number */}
                        <div className='text-center      rounded-lg text-red-500 px-10 py-2'>
                        {ticketNumber && (
            <div className="text-center rounded-lg text-red-500 px-10 py-2">
              <span className="text-lg text-blue3">Your Ticket Number: </span>
              <span className="text-lg">{ticketNumber}</span>
            </div>
          )}
                        </div>
                      </div>
                    </div>

                    <button
                      className='w-full mt-5 bg-green-500   rounded-lg text-white px-10 py-2'
                      type='button'
                      onClick={handleDownload}
                      value='Download'
                      //disabled={!name || !email || !country || !phone}
                    >

                      <span>
                        { loading ? <span > Downloading ..... <Spinner  /> </span>     :"  Download Your Ticket"}
                        </span>
                    </button>
                  </div>
                </div>
                {/* </div> */}
              </form>
            )
            : null}
        </div>
      </>
    )
  }











 