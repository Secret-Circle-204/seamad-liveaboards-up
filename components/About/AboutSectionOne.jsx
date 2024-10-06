import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import getAssetURL from '@/lib/get-asset-url'

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = ({ data }) => {
  // console.log("about-section-data", data);
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section className="max-w-[1350px] px-4 lg:px-0 lg:py-10 mx-auto">
      <div
        className={` ${data?.direction === 'reverse' ? ' flex  lg:gap-x-8  lg:gap-4 lg:items-start lg:justify-between  flex-col  lg:flex-row-reverse' : 'grid grid-cols-1 px-3 gap-7 lg:grid-cols-2 lg:gap-8'}
           p-5 mb-16  rounded-lg`} >
        <div className={`${data?.direction === 'reverse' ? 'lg:w-[100%] px-3  w-full' : 'lg:col-span-1'}   py-2 px-3   rounded-lg`}>
          <SectionTitle title={data?.title} description={data?.description} />

          <div className="mx-[-12px] flex flex-wrap">
            <div className=" w-full">
              {data?.list?.map((data, i) => (
                <List key={i} text={data?.text} />
              ))}
              
            </div>
          </div>
        </div>

        {/* images */}

        <div className="pb-2   lg:pr-3 mx-auto rounded-2xl lg:w-[100%] w-full h-full object-cover object-center py-1">
          <Image
            src={getAssetURL(data?.image)}
            alt="about image"
            width={500}
            height={600}
            className="h-auto lg:min-h-[550px] object-cover  object-center w-full max-w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;