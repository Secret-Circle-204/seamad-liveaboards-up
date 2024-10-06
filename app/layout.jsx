// import 'flowbite' 
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sea-Mad || Liveaboards',
  description: 'sea mad is a liveaboards for sea life and habitat research related to the red sea',
  charset: 'UTF-8',
  name: 'Sea-Mad || Liveaboards',
  author: 'hamza bahaa',
  keywords:
    'sea, mad,  liveaboards, hurghada, red sea, sea life, habitat research ,boat,boats',
  robots: 'index, follow',
  category: 'design, development',

  icons: {
    icon: '/favicon.png',
  },
  language: 'en',
  publisher: 'hamza bahaa',
  creator: 'hamza bahaa with xtream-communication',
  date: '2024-9-10',
  format: 'website'

}
export const revalidate = 1800 // revalidate at most 1800 seconds

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' sizes='32x32' />
      </head>
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
