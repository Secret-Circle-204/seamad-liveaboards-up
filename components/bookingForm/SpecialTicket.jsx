'use client'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Spinner } from 'flowbite-react';
import React, { useState, useRef } from 'react';

export default function SpecialTicket({ ticketNumber, showTicket, setShowTicket, plan, from, to, boat, trip, number_of_guests, country, name, email, phone }) {

    const [showDownload, setShowDownload] = useState(false);
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const downloadRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // const router = useRouter();

    const closeModal = () => {
        setShowDownload(false);
        setShowTicket(false);
    };
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
                    alert('Thank you for your download request. we will get back to you soon!');
                    closeModal();
                }, 2000);
            } else {
                setLoading(false);
                alert('Something went wrong! with your download request. but your request is successfull! we will get back to you soon!');
            }
            // setShowDownload(false);
        } catch (error) {
            console.error('Error while downloading', error);
        }

    };
    return (
        <>
            
                <div
                    // style={{ display: showDownload ? 'block' : 'none' }}
                    value={plan?.name}
                    className=' w-full h-full lg:px-10    p-8 px-5 text-white flex flex-wrap lg:flex-col lg:items-center lg:justify-center'
                >
                    <div
                        className='w-full mx-auto  '
                        ref={downloadRef}
                        id='booking-details-pdf'
                    >
                        <div className='flex space-y-3 flex-col gap-5'>
                            <h1
                                className='bg-blue-300 text-white p-5  text-2xl mt-0 font-bold'
                                value={plan?.name}

                            >
                                Special Trip :   <span className=' text-lg  '>{trip}</span>
                            </h1>

                            <li className=' text-lg '>
                                Your Name :{' '}
                                <span className=' text-lg text-blue-300'> {name} </span>
                            </li>
                            <li className=' text-lg '>
                                Your Email :{' '}
                                <span className=' text-lg text-blue-300'> {email} </span>
                            </li>
                            <li className=' text-lg '>
                                Your Phone :{' '}
                                <span className=' text-lg text-blue-300'> {phone} </span>
                            </li>
                            <li className=' text-lg '>
                                Booking-Date :{' '}
                                <span className=' text-lg text-blue-300'>

                                    {new Date().toLocaleDateString('en-GB')}
                                </span>
                            </li>
                            <li className=' text-lg '>
                                Trip-Started :{' '}
                                <span className=' text-lg text-blue-300'>
                                    {from} <span className=' text-lg text-white'>
                                        To :
                                    </span>
                                    {to}
                                </span>
                            </li>
                            <li className=' text-lg '>
                                Boat Type :{' '}
                                <span className=' text-lg text-blue-300'>
                                    {boat}
                                </span>
                            </li>
                            <li className=' text-lg '>
                                Number of guests :{' '}
                                <span className=' text-lg text-blue-300'>
                                    {number_of_guests}
                                </span>
                            </li>
                            <li>
                                Your Country :{' '}
                                <span className=' text-lg text-blue-300'> {country}</span>
                            </li>

                            {/* ticket number */}
                            <div className='text-center      rounded-lg text-blue-300 px-10 py-2'>
                                {ticketNumber && (
                                    <div className="text-center rounded-lg text-blue-300 px-10 py-2">
                                        <span className="text-lg text-white">Your Ticket Number: </span>
                                        <span className="text-lg">{ticketNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    <button
                        className='w-full mt-5 bg-blue-500   rounded-lg text-white px-10 py-2'
                        type='button'
                        onClick={handleDownload}
                        value='Download'
                    //disabled={!name || !email || !country || !phone}
                    >

                        <span>
                            {loading ? <span > Downloading ..... <Spinner /> </span> : "  Download Your Ticket"}
                        </span>
                    </button>
                    </div>

                </div>
            
        </>
    )



}