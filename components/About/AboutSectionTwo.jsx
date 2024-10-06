import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <>
     <section className="max-w-[1350px]   mx-auto   lg:py-10 ">
    <div
        className=" grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 mx-auto    ">
        <div className="  px-6   py-1  ">
            <div className="  w-full   bg-cover  h-full" >

              <Image
                src="/images/about-1.jpg"
                alt="about image"
                 width={500}
                height={600}
                className="w-full h-full object-cover object-center"
              />

            </div>
          </div>

          <div className="w-full text-blue3 px-6 lg:py-1 py-2 lg:max-w-5xl ">
            <h2 className="text-4xl mb-6 font-semibold   dark:text-white   ">
               About Us
            </h2>

            <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed"> 
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam
                mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.
             
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam
                mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.
            </p>

            {/* <div className="inline-flex w-full mt-6 sm:w-auto">
                <a href="#" className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Start Now
                </a>
            </div> */}
        </div>
    </div>
</section>
    
    </>
  );
};

export default AboutSectionTwo;
