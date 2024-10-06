'use client'

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';



import Link from 'next/link';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const key = 'AIzaSyB6h9Hb6w0zYqXjQoWq7VYxT8GzYk2zQwQ';
// // const key = process.env.GOOGLE_MAPS_API_KEY;
// let res = null;
// const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyB6h9Hb6w0zYqXjQoWq7VYxT8GzYk2zQwQ&fields=reviews');
// `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJg9BODxx2X0YRr_Kv0d6GzXk&fields=reviews&key=AIzaSyB6h9Hb6w0zYqXjQoWq7VYxT8GzYk2zQwQ`

const GoogleReviewsComponent = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviews = [
    {
      id: 1,
      mail: 'jane-smith@mail.com',
      name: 'John Doe',
      rating: 5,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'John Doe',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.png'
      }
    },
    {
      id: 2,
      mail: 'jane-smith@mail.com',
      name: 'Jane Smith',
      rating: 4,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'Jane Smith',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.webp',
      }
    },
    {
      id: 3,
      mail: 'jane-smith@mail.com',
      name: 'Peter Jones',
      rating: 4,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'Peter Jones',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.png',
      }
    },
    {
      id: 4,
      mail: 'jane-smith@mail.com',
      name: 'John Doe',
      rating: 4,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'John Doe',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.webp',
      }
    },
    {
      id: 5,
      mail: 'jane-smith@mail.com',
      name: 'Jane Smith',
      rating: 2,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'Jane Smith',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.png',
      }
    },
    {
      id: 6,
      mail: 'jane-smith@mail.com',
      name: 'Peter Jones',
      rating: 3,
      review: '  loremisum dolor sit amet consectetur adipiscing elit In varius eros eget sapien consectetur ultrices Ut quis dapibus libero.',

      author: {
        mail: 'jane-smith@mail.com',
        name: 'Peter Jones',
        link: 'https://www.google.com/maps/contrib/100859090874785206875?hl=en-US&sa=X&ved=2ahUKEwiUituIlpTvAhVYCc0KHbvTCrgQvvQBegQIARBG',
        thumbnail: '/images/reveiw-2.webp',
      }
    },

  ];





  const handleReviewChange = (index) => {
    setActiveReviewIndex(index);
  };


  const handleSwipeStart = (event) => {
    event.preventDefault(); // Prevent native scrolling
    carouselRef.current.style.transition = 'none'; // Disable transition for smooth start
    const touchStartX = event.touches[0].clientX;
    carouselRef.current.dataset.touchstartX = touchStartX; // Store touch start position
  };

  const handleSwipeMove = (event) => {
    if (!carouselRef.current.dataset.touchstartX) return; // Handle initial touch

    const touchMoveX = event.touches[0].clientX;
    const deltaX = touchMoveX - carouselRef.current.dataset.touchstartX;
    carouselRef.current.style.transform = `translateX(${deltaX}px)`;
  };


  const carouselRef = useRef(null);
  const reviewCardWidth = useRef(0); // Store calculated card width
  const MAX_VISIBLE_REVIEWS = 3; // Number of reviews to show at once


  const handleSwipe = (event) => {
    const deltaX = event.deltaX; // Get swipe delta (positive for right, negative for left)

    if (Math.abs(deltaX) > 50) { // Minimum swipe distance threshold (adjust as needed)
      const newIndex = activeReviewIndex + (deltaX > 0 ? 1 : -1); // Determine new index

      if (newIndex >= 0 && newIndex < reviews.length) {
        setActiveReviewIndex(newIndex);
        carouselRef.current.scrollTo({
          left: newIndex * reviewCardWidth.current, // Scroll to new review position
          behavior: 'smooth',
        });
      }
    }
  };
  // useEffect(() => {
  //   // Fetch reviews from your backend or API here (replace with your logic)
  //   fetch('https://api.example.com/reviews') // Replace with your API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setReviews(data));
  // }, []);

  const filteredReviews = reviews.filter((review) => review.rating >= 3);

  
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) { // Iterate up to the rating value
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }
    return stars;
  };
  const settings = {


    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust for different screen sizes
    slidesToScroll: 1,
    
  }
  return (
    <>
      <section className='  w-full mx-auto relative'>
        <div className="  max-w-[1250px] mx-auto flex flex-col items-center">



          <div className='mb-10flex w-full lg:px-[40px] flex-col    items-center justify-center text-center'>
            <h1 className='mb-5 text-xl font-bold text-blue3   sm:text-2xl lg:text-xl xl:text-2xl'>
              What Our Users Says
            </h1>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div
            className={`wow fadeInUp w-full mx-auto max-sm:px-10  md:px-16  grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-1 lg:grid-cols-1  rounded-md   p-8   lg:px-5 xl:px-8`}
            data-wow-delay='.1s'

          >
            <Slider {...settings} ref={carouselRef} onSwipeStart={handleSwipeStart} onSwipeMove={handleSwipeMove} onSwipe={handleSwipe}>
              {filteredReviews?.map((review, index) => (
                <div key={index} className="review-card my-5 border-[1.5px] border-gray-200 border-opacity-90  drop-shadow-lg shadow-body-color  w-full rounded-xl bg-gray-100 text-gray-700  px-8 py-5  ">
                  <div className="flex items-center mb-3 border-b border-body-color border-opacity-10 py-3">
                    <div className='relative mr-4 h-[50px] w-full max-w-[50px]   rounded-full'>
                      <Image
                        src={review?.author?.thumbnail}
                        alt={review?.author?.name}
                        className='h-full rounded-full w-full object-cover'
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className='w-full'>
                      <h5 className='mb-1 text-lg font-semibold text-gray-700 dark:text-gray-700 lg:text-base xl:text-lg'>
                        {review?.author?.name}
                      </h5>
                      <Link href={review?.author?.link} className='text-sm text-gray-700'>{review?.author?.mail}</Link>
                    </div>
                  </div>
                  <p className=" pb-4 text-base leading-relaxed text-gray-700 dark:border-white dark:border-opacity-10 dark:text-gray-700">
                    “{review.review}”
                  </p>
                  <div className="mb-1 flex items-start justify-between     ">
                    <div>

                      <p className="text-sm text-gray-700   "><span className="text-orange-300 space-x-[1.5px]">{renderStarRating(review.rating)} </span>{review.rating} / 5</p>
                    </div>
                    <div>

                      <p className="text-xs text-gray-700  ">Google reviews</p>
                    </div>
                  </div>
                </div>

              ))}
            </Slider>
          </div>




        </div>
      </section>
    </>
  );
};

export default GoogleReviewsComponent;