'use client'
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Faq({ faqData }) {
    // console.log('faqData', faqData)
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
    const itemClasses = {
        base: "w-full",
        title: "text-white font-normal text-medium",
        // trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        // indicator: "text-medium",
        // content: "text-small px-2",
      };
    return (


        <section className="py-10 bg-gray-50   lg:py-16">

            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold leading-tight text-blue3 sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto my-4 text-base   text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
                </div>

                <div className="max-w-5xl mx-auto ">
                    {faqData && faqData?.faqs.map((item, index) => (
                        <Accordion
                            key={index}
                            aria-label={item.title}
                            className="text-white my-1 py-1"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                            variant="splitted"
                            itemClasses={itemClasses}
                            >
                            <AccordionItem
                                className="bg-blue3 py-3 hover:bg-indigo-900 text-white"
                                key={index} aria-label={item.title} title={item.title}>
                                {item.answer}
                            </AccordionItem>
                        </Accordion>
                    ))}



                </div>
            </div>
        </section>



    )
}