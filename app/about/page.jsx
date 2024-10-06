import AboutSectionOne from '@/components/About/AboutSectionOne'
// import AboutSectionTwo from '@/components/About/AboutSectionTwo'
import Breadcrumb from '@/components/Common/Breadcrumb'
import Head from '@/app/head'
import { getAboutUs } from '@/lib/apis'
export default async function AboutPage() {

  const about = await getAboutUs();
   return (
    <>
      <Head page={'about'} />
      <Breadcrumb />
      {/* <AboutSectionTwo /> */}
      {about?.page_sections?.map((data, i) => (
        <AboutSectionOne key={i} data={data} />
        
      ))}
    </>
  )
}
