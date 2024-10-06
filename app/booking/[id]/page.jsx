// app/booking/[id]/page.jsx
'use client'
import {
    useDisclosure,
    Card,
    CardBody,
    CardHeader,
    Button,
    SelectItem,
    Select,
} from '@nextui-org/react'
import { Country } from 'country-state-city'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getTripSchedules, getCabins } from '@/lib/apis'
import { MdArrowCircleDown } from "react-icons/md"
import BookingTicket from '@/components/Booking/BookingTicket'
import { createItem } from '@directus/sdk' // Import Directus functions
import directus from '@/lib/directus';

// Removed unused imports: useRef, getTripById

export default function BookingPage({ params }) {
    const [cabins, setCabins] = useState([]);
    const [tripDetails, setTripDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState('');
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        ticketNumber: '',
        country: '',
        check_in_date: '',
        phone: '',
        number_of_guests: 1,
        tripId: params.id,
        cabin: cabins?.[0]?.id || 0,
        message: '', // Added notes field
    });
    const { isOpen, onOpenChange, onClose } = useDisclosure()

    // Removed unused state: number_of_guests, setNumberOfGuests


    useEffect(() => {
        const fetchCabins = async () => {
            try {
                const response = await getCabins();
                setCabins(response);
            } catch (error) {
                console.error('Error fetching cabins:', error);
            }
        };

        fetchCabins();
    }, []);
    const [ticketNumber, setTicketNumber] = useState(
        `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    );
    useEffect(() => {
        const fetchTripDetails = async () => {
            setLoading(true);
            try {
                const response = await getTripSchedules(params.id);
                setTripDetails(response);
            } catch (error) {
                console.error('Error fetching trip details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [params.id]);
    // console.log('tripDetails---:', tripDetails)
    // const selectedCabin = cabins?.find(cabin => cabin?.id.toString() === bookingData.cabinId) || 0;
    const selectedCabin = cabins.find(cabin => cabin.id.toString() === bookingData.cabin)
    const totalPrice = (tripDetails?.price || 0) * bookingData.number_of_guests + (selectedCabin?.cabin_price ?? 0);
    // console.log('selectedCabin---:', totalPrice)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookingData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const sendDataForm = {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            number_of_guests: bookingData.number_of_guests,
            trip: parseInt(tripDetails?.trip_schedule?.related_route?.route_name),
            trip_reserv: parseInt(tripDetails?.trip_schedule?.id),
            cabin: parseInt(bookingData.cabin),
            message: bookingData.message,
            total_price: totalPrice,
            ticket_number: ticketNumber,
            check_in_date: tripDetails?.start_date,
            country: bookingData.country




        };

        try {
            await directus.request(createItem('reservations', sendDataForm));
            console.log('Booking submitted:', sendDataForm);
            onOpenChange(true);
        } catch (error) {
            console.error('Error submitting booking:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) { // Add loading state
        return <div>Loading...</div>;
    }
    console.log('tripDetails---:', tripDetails)
    return (
        <div className="container mx-auto lg:px-1 px-4 py-32">
            <Link
                href={`/trips/${tripDetails?.trip_schedule?.id ?? '/trips'}`}
                className="flex items-center mb-4 text-sm text-gray-600 hover:text-gray-800"
            >
                <MdArrowCircleDown className="w-4 h-4 mr-1" />
                Back to Route Details
            </Link>
            <h1 className="text-4xl font-bold mb-6">Reservation request</h1>
            <p>Please fill out the form below to reserve your {tripDetails?.trip_schedule?.related_route?.route_name ?? 'Trip'} trip.</p>
            <Card className="w-full md:w-full mx-auto mt-8">
                <CardHeader>
                    <h1>{tripDetails?.trip_schedule?.related_route?.route_name ?? 'Unknown Trip'}</h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Form fields */}
                            <div className="w-full space-y-2 mb-1">

                                <label htmlFor="name"> Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={bookingData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"

                                />
                            </div>
                            <div className="w-full space-y-2 mb-1">

                                <label htmlFor="email">Email</label>
                                <input id="email"
                                    name="email"
                                    type="email"
                                    value={bookingData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"

                                />
                            </div>
                            <div className="w-full space-y-2 mb-1">

                                <label htmlFor="phone">Phone</label>
                                <input id="phone"
                                    name="phone"
                                    type="tel"
                                    value={bookingData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"

                                />

                            </div>
                            <div className="w-full space-y-2 mb-1">

                                <label htmlFor="number_of_guests">Number of Guests</label>
                                <input id="number_of_guests"
                                    name="number_of_guests"
                                    type="number"
                                    value={bookingData.number_of_guests}
                                    onChange={handleInputChange}
                                    max={tripDetails?.available_places}
                                    required
                                    className="w-full border-gray-300 border-2 rounded-lg p-2"

                                />

                            <div className="w-full text-sm text-blue-800 text-right space-y-2 mb-1">
                                <p>Max Guests For This Reservation: {tripDetails?.available_places ?? 'N/A'}
                                </p>
                            </div>
                            </div>

                            {/* Country select */}
                            <div className='w-full space-y-2 mb-1'>
                                <label htmlFor="country">Country</label>
                                <select
                                    className='bg-gray-100 hover:bg-gray-200 mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-gray-600 placeholder-gray-400 outline outline-[0.25px] outline-blue3/20 focus:border-blue3/90 focus:border-opacity-100 focus-visible:shadow-none'
                                    onChange={e => setCountry(e.target.value)}
                                    value={country}
                                    name='country'
                                    id="country"
                                >
                                    <option value=''>Select Country</option>
                                    {Country.getAllCountries().map((country, index) => (
                                        <option key={index} value={country.name}>
                                            {country.name} {country.flag}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Cabin select */}
                            <div className="w-full space-y-2 mb-1">
                                <label htmlFor="cabin">Cabin Type</label>
                                <Select value={bookingData?.cabin} onChange={handleInputChange}
                                    label="Cabin Type"
                                    name="cabin"
                                    id="cabin"

                                // className="w-full border-gray-300 border-2 rounded-lg p-2"
                                >

                                    {cabins?.map((cabin) => (
                                        <SelectItem key={cabin.id} value={cabin.id.toString()}>
                                            {cabin.cabin_name} : {cabin.currency}  {cabin.cabin_price} extra per night
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                        </div>

                        {/* Trip dates */}


                        {/* Additional notes */}
                        <div>
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows="6"
                                value={bookingData.notes}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 border-2 rounded-lg p-2"
                            />
                        </div>

                        {/* Price summary */}
                        <div>
                            <p>Price per person: ${tripDetails?.price ?? 'N/A'}</p>
                            <p>Cabin upgrade:{selectedCabin?.currency}  {selectedCabin?.cabin_price ?? 0}</p>
                            <p>Total Price:  {tripDetails?.currency} {totalPrice}</p>
                        </div>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="bg-[#6f4ef2] text-white w-full shadow-lg shadow-indigo-500/20"
                        >
                            Confirm Booking
                        </Button>
                    </form>
                </CardBody>
            </Card>

            <BookingTicket
                tripDetails={tripDetails}
                routeName={tripDetails?.trip_schedule?.related_route?.route_name}
                setBookingData={setBookingData}
                totalPrice={totalPrice}
                ticketNumber={ticketNumber}
                setTicketNumber={setTicketNumber}
                selectedCabin={selectedCabin}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                bookingData={bookingData}
                country={country}
            />
        </div>
    )
}

// Helper component for input fields
