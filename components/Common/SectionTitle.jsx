export default function SectionTitle({ center, title, description }) {
  const width = '570px'
  const mb = '50px'

  return (
    <div
      className={` w-full ${center ? 'mx-auto text-center' : ''}`}
      data-wow-delay='.1s'
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className='mb-4 text-2xl font-bold !leading-tight text-blue3 dark:text-white sm:text-2xl md:text-[25px]'>
        {title}
      </h2>
      <p className='text-base text-justify   text-gray-500 md:text-lg'>
        {description}
      </p>
    </div>
  )
}
