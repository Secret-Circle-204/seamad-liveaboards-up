'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import getAssetURL from '@/lib/get-asset-url';


export default function MapDetails({ mapPoints, mapData }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  return (
    <div className="relative w-full h-full">
      {mapData.map((point) => {
        const isPointer = mapPoints.includes(point.id);
        const top = point.top.replace('top-[', '').replace(']', '');
        const left = point.left.replace('left-[', '').replace(']', '');

        return (
          <div
            key={point.id}
            className="group  absolute z-30"
            style={{ top, left }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <button
              className="group animate-pulse  w-5 h-5 lg:h-10 lg:w-10 rounded-full  group-hover:select-none  flex items-center justify-center group"
              aria-label={point.title}
            >
              {isPointer && (
                <motion.span
                  className="group  w-3 h-3 lg:h-6 lg:w-6 rounded-full bg-red-600/95 hover:bg-red-400/50"
                  animate={{
                    scale: [0.5, 1.5, 1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>

            <div className={`     
                z-10 group-hover:z-30 absolute top-0 transition transform    group-hover:transition group-hover:transform 
                translate-y-8   group-hover:scale-95 group-hover:ease-in-out w-0 h-0  group-hover:h-auto /////hidden invisible 
                 group-hover:visible pr-10 
                  group-hover:block///////
                 pt-2 pb-2 mt-12 translate-x-0 lg:group-hover:-translate-x-40    
                group-hover:duration-500
                  group-hover:translate-y-0
                rounded overflow-hidden  text-white group-hover:select-none    lg:py-5 py-4 lg:px-4 px-3 lg:text-sm text-sm font-light bg-dark    group-hover:lg:w-[500px]  group-hover:w-[250px]  group-hover:max-w-[600px]`}>

              <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
              <p className="text-sm mb-4">{point.description}</p>
              <div className='bg-cover bg-center object-cover w-full grid lg:w-full mx-auto grid-cols-2 gap-1 lg:grid-cols-3 lg:gap-2'>
                {point.images.slice(0, 3).map((image, index) => (
                  <Image
                    key={index}

                    // src={`${getAssetURL(image.directus_files_id) || '/images/no_image_available.jpg'}`}
                    src={`${getAssetURL(image.directus_files_id)}`}
                    alt={`${point.title} image ${index + 1}`}
                    width={80}
                    height={80}
                    className='lg:h-[90px] w-full rounded h-[60px] object-cover bg-cover bg-center'
                  />
                ))}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}




