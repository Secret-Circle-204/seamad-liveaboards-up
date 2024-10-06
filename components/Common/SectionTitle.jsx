export default function SectionTitle({ center, title, description }) {
  const width = '570px'
  const mb = '50px'

  return (
    <div
      className={` w-full ${center ? 'mx-auto text-center' : ''}`}
      data-wow-delay='.1s'
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className='mb-4 text-3xl font-bold !leading-tight text-blue3 dark:text-white sm:text-4xl md:text-[45px]'>
        {title}
      </h2>
      <p className='text-base !leading-relaxed text-body-color md:text-lg'>
        {description}
      </p>
    </div>
  )
}
