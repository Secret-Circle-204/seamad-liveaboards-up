'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

// import Link from 'next/link'
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
// import Download from "yet-another-react-lightbox/plugins/download";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import getAssetURL from '@/lib/get-asset-url';









export default function BoatLightBox({ slide, MainImageclass }) {
    const [open, setOpen] = useState(false);
   console.log('slide', slide)
    const className = MainImageclass
    //console.log('slides  s)', slide)

    const position = "bottom"
    const width = 120
    const height = 100
    const border = 0.5
    const borderRadius = 6
    const gap = 16
    const padding = 4
    const preload = 2
    const showToggle = true

 const slides = slide
 const mainImage = slide?.map((item) => {
     
     return  item?.directus_files_id
 })
 if(!mainImage){
     return;   
 }
//  console.log('mainImage', mainImage)
    // const slides = slide.map((item, index) => {
    //     return {
    //         src: getAssetURL(item.directus_files_id),
    //         alt: 'sea-island'
    //     }
    // })
    // const slides = [

    //     {
    //         src: '/images/boat/1.png',
    //         alt: 'sea-island'
    //     },
    //     {
    //         src: '/images/boat/1.png',
    //         alt: 'sea-island'
    //     },
    //     {
    //         src: '/images/boat/1.png',
    //         alt: 'sea-island'
    //     },
    //     {
    //         src: '/images/boat/3.png',
    //         alt: 'sea-island'
    //     },
    //     {
    //         src: '/images/boat/1.png',
    //         alt: 'sea-island'
    //     }
    // ]
    // const slid = slides?.map((item => (  {
    //     src: item.src,
    //     alt: item.alt
    // })))
    return (
        <>

 
            <Image
                className={className}
                onClick={() => setOpen(true)} 
                 src={getAssetURL(mainImage ?? null)}
                alt="sea-island" loading="lazy" width={500} height={350} /> 
            {/* <button onClick={() => setOpen(true)} className='cursor-pointer'>
                    open image
                </button> */}
            <Lightbox
                open={open}

                animationSlide={true}
                animationDuration={700}
                animationTimingFunction="cubic-bezier(0.25, 0.1, 0.25, 1)"
                toolbar={{
                    buttons: [
                        "download",
                        <button key="my-button" type="button" className="yarl__button">

                        </button>,
                        "slideshow",
                        "close",
                    ],
                }}
                close={() => setOpen(false)}
                styles={{
                    container: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        // h-auto hover:opacity-90  max-w-full rounded-lg



                    }
                }}

                plugins={[Thumbnails, Slideshow]}
                slides={slides?.map((img) => (
                    
              

                    {
                        src: getAssetURL(img.directus_files_id),

                    }
                ))}
                carousel={{ preload }}
                thumbnails={{
                    show: showToggle,
                    position: position,
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                    border: border,
                    padding: padding,
                    gap: gap

                }}


            />

            <div
                className='mt-2 grid grid-cols-4 lg:grid-cols-5 gap-2'
            >

                {slides?.map((img, index) => (
                    <div
                        className=''
                        key={index}>

                        <Image
                            className=' cursor-pointer  h-[95px] object-cover object-center   w-full rounded-lg'
                            onClick={() => setOpen(true)}
                            src={getAssetURL(img?.directus_files_id)}
                            alt="boat-image"
                            width={140}
                            height={90}
                            loading="lazy"
                        />

                    </div>
                ))}
            </div>
        </>
    );
}



