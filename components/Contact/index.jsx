'use client';
import React, { useState } from 'react';

import directus from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [user_name, setName] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    user_name,
    user_email,
    user_phone,
    message,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending message...', {
      position: 'top-center',
      autoClose: 1500,
    });

    setTimeout(async () => {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      //send the data to the directus
      try {
        const response = await directus.request(createItem('messages', {
          ...formData
        }));
        if (response) {
          console.log('Message successfully sent to backend');
        }
      } catch (error) {
        console.log(error);
      }

      toast.update(toastId, {
        render: 'Message sent successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <section id="contact" className="max-w-[1200px] mx-auto overflow-hidden py-16   lg:pb-28 lg:pt-20">
        <div className="-mx-4 h-full flex flex-wrap">
          <div className="w-full h-full px-4">
            <div className="wow fadeInUp mb-12 rounded-md bg-blue3/[10%] py-11 px-8  sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Write to a member of our team!
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
              If you can’t find the answer you’re looking for, we’re here to lend a hand.
              </p>
              <form onSubmit={handleSubmit}
              >
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        id="user_name"
                        name="name"
                        value={formData.user_name}
                        onChange={(e) => setFormData((prevState) => ({
                          ...prevState,
                          user_name: e.target.value,
                        }))}
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        id="user_email"
                        name="email"
                        value={formData.user_email}
                        onChange={(e) => setFormData((prevState) => ({
                          ...prevState,
                          user_email: e.target.value,
                        }))}
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Phone Number
                      </label>
                      <input
                        id="user_phone"
                        name="phone"
                        value={formData.user_phone}
                        onChange={(e) => setFormData((prevState) => ({
                          ...prevState,
                          user_phone: e.target.value,
                        }))}
                        required
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData((prevState) => ({
                          ...prevState,
                          message: e.target.value,
                        }))}
                        required
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send a Message'}
                      <span className="shine"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;

