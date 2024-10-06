'use client'
import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import { HiDocumentDownload } from 'react-icons/hi'
import React, { useRef, useState, useEffect } from 'react'
import getAssetURL from "@/lib/get-asset-url"


const ServicesPdf = ({ data }) => {
  // console.log('-files-data', data)

  //data:// id: 0,
  //   pdf_files_id : file_name: "food services"
  // file_pdf: "e132c534-f6ea-4eee-83da-013e8a9b86ba"
  // file_summary: "Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  // id: 2[[Prototype]] : Object[[Prototype]] :  Object 1 :
  // pdf_files_id: file_name: "transfer services"
  // file_pdf: "e132c534-f6ea-4eee-83da-013e8a9b86ba"
  // file_summary: "lorem ipsum dolor sit amet consectetur adipiscing elit" id: 1

  const pdfData = data?.services_files?.map(item => item)
  // console.log('pdfData', pdfData)




  const handleDownload = (pdfData) => {
    const linkSource = getAssetURL(pdfData?.pdf_files_id?.file_pdf + "?download");
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = pdfData?.pdf_files_id?.file_name;  
    downloadLink.click();
  }


  return (

    <div className='w-full px-4 lg:w-4/12'>
      <div className='mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10'>
        <h3 className='border-b text-center items-center border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white'>
          Click To Download The Files.
        </h3>
        <ul className='   mb-10 p-8 text-md font-medium flex flex-col items-start justify-between'>
          <motion.div
            whileInView={{
              x: [100, 50, 0],
              opacity: [0, 0, 1],
              // y: [100, 50, 0], opacity: [0, 0, 1]

            }}

            transition={{ duration: 0.5 }}
            delay={0.2}

          >
            {pdfData?.map((pdfdata) => (
              <li
                key={pdfdata?.pdf_files_id?.id}
                className=' mb-5  group bg-blue3 duration-300 hover:scale-95 rounded-lg px-3 w-full  text-lg font-semibold  text-white   py-6 gap-5  '>

                <Link
                  onClick={() =>  handleDownload(pdfdata)}
                  href={`${getAssetURL(pdfdata?.pdf_files_id?.file_pdf)}`}
                  target="_blank"
                  className='flex p-3 space-y-1  flex-col w-full items-center justify-between'
                >
                  <h2 className=''>PDF-File: {pdfdata?.pdf_files_id?.file_name}</h2>
                  <p className='group text-center text-sm duration-500 in pt-2 font-light leading-snug hover:text-primary'>{pdfdata?.pdf_files_id?.file_summary}</p>
                  <span className=' group   flex w-full pt-2 text-left items-start group-hover:translate-x-[45%]  duration-500 group-hover:text-primary   cursor-pointer download-Icon text-3xl text-white'>
                    <HiDocumentDownload />
                  </span>
                </Link>



              </li>

            ))}
          </motion.div>
        </ul>
      </div>
    </div>

  )
}

export default ServicesPdf
