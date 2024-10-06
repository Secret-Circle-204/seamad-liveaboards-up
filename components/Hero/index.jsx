'use client'
import getAssetURL from '@/lib/get-asset-url'
import Link from 'next/link'
// import Image from "next/image";
// import Image1 from "./public/images/slide-img.jpg"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PrevArrow from '@/components/arrow/PrevArrow'
import NextArrow from '@/components/arrow/NextArrow'

export default function Hero({ heroData }) {
  console.log('heroData', heroData)
  if (!heroData) {
    return undefined
  }
  //arrows syles
  const settings = {
    dots: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // AnimatePresence: true,
    animateOut: 'fadeOut',
    fade: true,
    pauseOnHover: false,
    arrows: false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    initialSlide: 1,
    infinite: true,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],


  }

  return (
    <div className='slider-container w-full mx-auto  lg:mt-[70px] max-sm:h-[80vh]  h-[85vh] /*slider-wrapper '>
      <Slider {...settings}
      >

        {heroData?.images.map((slide, index) => (
          <div className='w-full object-cover bg-cover object-center bg-center max-sm:h-[85vh] h-[85vh] ' key={index}>
            <div
              // key={slide?.id}
              className=' w-full object-cover bg-cover object-center bg-center   h-full '
              // style={{ backgroundImage: `url(${getAssetURL(slide?.directus_files_id)})` }}
              style={{ backgroundImage: `url(${getAssetURL(slide?.directus_files_id)})` }}


            >
              <div
                className='   h-full w-full flex flex-col lg:items-start items-center justify-center text-center lg:text-left px-12 pt-6 lg:pt-1 lg:px-2 fadeInUp mx-auto max-w-[1200px] text-white dark:text-white '
                data-wow-delay='.2s'
              >
                <h1 className='   drob-shadows max-w-xl mb-5 text-xl font-semibold leading-tight text-white dark:text-white sm:text-4xl sm:leading-tight md:text-4xl md:leading-tight'>
                  {heroData?.slogan}
                </h1>
                {/* <p className='mb-12 text-base  drob-shadows font-medium !leading-relaxed text-white dark:text-white dark:opacity-90 sm:text-lg md:text-xl'>
                {slideImage?.subtitle}
              </p> */}
                <div className='flex flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
                  <Link
                    href='/trips'
                    className='rounded-md bg-blue3 py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-blue3/90'
                  >
                    Book Now
                  </Link>

                </div>
              </div>

            </div>
          </div>
        ))}


      </Slider>


    </div>
  )
}
