'use client'
import {
  Modal,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from '@nextui-org/react'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import React, { useRef, useState } from 'react'

// Removed unused import: useDisclosure

export default function BookingTicket({
  tripDetails,
  routeName,
  ticketNumber,
  setBookingData,
  onOpenChange,
  // setTicketNumber,
  selectedCabin,
  isOpen,
  onClose,
  bookingData,
  totalPrice
}) {
  // console.log('tripDetails-ticket-----:', tripDetails)
  const [loading, setLoading] = useState(false);
  const downloadRef = useRef(null);

  const downloadBookingDetails = async () => {
    setLoading(true);
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

      // Fixed the filename concatenation
      pdf.save(`${routeName} - ${tripDetails?.start_date || 'Booking Details'}.pdf`);

      setTimeout(() => {
        setLoading(false);
        onClose();
        setBookingData({
          name: '',
          email: '',
          phone: '',
          number_of_guests: 1,
          cabin: '1',
        });
        // setTicketNumber('');
      }, 2000);
    } catch (error) {
      console.error('Error while downloading', error);
      setLoading(false);
    }
  };

  // Moved isOpen check to the top level of the component
  if (!isOpen) return null;

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      size="2xl"
      classNames={{
        wrapper: "",
        body: "p-6 border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Thank you for booking with us. Your booking details are as follows:</ModalHeader>
            <ModalBody
              id='booking-details'
              ref={downloadRef}
            >
              <div className="bg-primary/10 p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-2">{routeName || 'N/A'}</h2>
                <p><strong>Dates:</strong> {tripDetails?.start_date || 'N/A'} to {tripDetails?.end_date || 'N/A'}</p>
                <p><strong>Meeting Point:</strong> {tripDetails?.start || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Booking Details</h3>
                <p><strong>Number Of Guests:</strong> {bookingData?.number_of_guests || 'N/A'}</p>
                <p><strong>Cabin Type:</strong> {selectedCabin?.cabin_name || 'N/A'}</p>
                <p><strong>Base Price:</strong> ${tripDetails?.price || 'N/A'} per person</p>
                <p><strong>Cabin Upgrade:</strong> ${selectedCabin?.cabin_price || 'N/A'}</p>
                {/* Fixed the total price calculation */}
                <p><strong>Total Price:</strong> ${totalPrice || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
                <p><strong>Name:</strong> {bookingData?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {bookingData?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {bookingData?.phone || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Important Information</h3>
                <p>Please arrive at the meeting point at least 30 minutes before the departure time.</p>
                <p>Dont forget to bring your ID  sunscreen  and any necessary medication.</p>
              </div>
              <div>
                <p className="mb-2 font-bold text-medium  text-[#dcdfec]">
                  Total Price: <span className="pl-2 font-normal text-[#a8b0d3] text-base">
                    ${totalPrice || 'N/A'}
                  </span>
                </p>
                {ticketNumber && (

                  <p className="mb-2 font-bold text-medium  text-[#dcdfec]">
                    Ticket Number: <span className="pl-2 font-normal text-[#a8b0d3] text-base">
                      {ticketNumber || 'N/A'}
                    </span>
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="foreground"
                onClick={downloadBookingDetails}
                disabled={loading}
                className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
              >
                {loading ? 'Downloading...' : 'Download your booking details'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}