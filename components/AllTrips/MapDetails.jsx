'use client';
import getAssetURL from '@/lib/get-asset-url';
import React from 'react';

export default function MapDetails({ mapPoints, mapData }) {
  return (
    <>
      {mapData.map(({ id, title, description, images, top, left }) => {
        const point = mapPoints?.find((point) => point?.id === id);
        const isPointer = point?.pointer;
        const positionTop = isPointer ? point.top : top;
        const positionLeft = isPointer ? point.left : left;

        return (
          <div
            key={id}
            className={`z-30  mx-auto group self-center absolute group-hover:select-none select-none   
              
               ${positionTop} ${positionLeft}   text-2xl`}
          >

            <button
              className={`w-5 translate-y-[-2px] translate-x-[-2px] h-5 lg:h-10 lg:w-10 text-center mx-auto items-center group group-hover:select-none  justify-center rounded-full border-0 border-blue-300 text-white inline-flex group`}
            >
              <span
                className={`${isPointer === true ? ' animate-ping transition   ease-in-out duration-700   opacity-100  lg:h-7 lg:w-7' : 'opacity-0'} ease-in-out duration-700 group-hover:select-none   text-xl bg-gradient-to-tr from-red-900 via-red-500   to-red-600 bg-red-600 inline-flex w-3 h-3 lg:h-5 lg:w-5 rounded-full  `}
              ></span>
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
              <div>
                <div className='pb-5'>
                  <p className='lg:text-xl text-md'>{title}</p>
                  <p>{description}</p>
                </div>

                <div className='grid lg:w-full mx-auto grid-cols-2 gap-1 lg:grid-cols-3 lg:gap-2'>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className='lg:h-[90px] h-[60px] bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${getAssetURL(image?.directus_files_id)})`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
