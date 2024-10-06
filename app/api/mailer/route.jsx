import { NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

// Handles POST requests to /api
export async function POST (request) {
  const username =
    process.env.NEXT_PUBLIC_BURNER_USERNAME || 'hamzamode202@gmail.com'
  const password =
    process.env.NEXT_PUBLIC_BURNER_PASSWORD || '00102151400.030mM'
  const myEmail = 'hamzamode202@gmail.com'
  const myEmail2 = email

  console.log('dealing with request')
  const formData = await request.formData()
  const name = formData.get('name')
  // const address = formData.get('address')
  const phone = formData.get('phone')
  const email = formData.get('email')
  const message = formData.get('message')
  const the_boat = formData.get('the_boat')
  const the_room = formData.get('the_room')
  const number_of_guests = formData.get('number_of_guests')

  // create transporter object
  const transporter = nodemailer.createTransport({
    // host: 'smtp-mail.outlook.com',
    // port: 587,
    // tls: {
    //   ciphers: 'SSLv3',
    //   rejectUnauthorized: false
    // },
    host: 'smtp.office365.com',
    port: 587,

    auth: {
      user: username,
      pass: password
    }
  })

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: myEmail,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
                <p>Name: ${name} </p>
                <p>Phone: ${phone} </p>
                <p>Email: ${email} </p>
                <p>Boat: ${the_boat} </p>
                <p>Room: ${the_room} </p>
                <p>Number Of Guests: ${number_of_guests} </p>

                 <p>Message: ${message} </p>

                `
    })
    const mail2 = await transporter.sendMail({
      from: username,
      to: myEmail2,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `

                <p>Hello ${name}  you requst the</p>
            <span>
            <p>Name: ${name} </p>
             <p>Phone: ${phone} </p>
            <p>Email: ${email} </p>
            <p>Boat: ${the_boat} </p>
            <p>Room: ${the_room} </p>
            <p>Number Of Guests: ${number_of_guests} </p>

            <p>Message: ${message} </p>
            </span>
      <p>
      Thanks for your reservation we will call you back for takeed yor reservation </p>
                `
    })

    console.log('mail :', mail, ' mail2 :', mail2)
    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.log(error)
    NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
  }
}

// export async function POST (request) {
//   // const username = process.env.NEXT_PUBLIC_BURNER_USERNAME
//   // const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD
//   // const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL

//   const formData = await request.formData()
//   const name = formData.get('name')
//   const address = formData.get('address')
//   const phone = formData.get('phone')
//   const email = formData.get('email')
//   const message = formData.get('message')
//   const transporter = nodemailer.createTransport({
//     host: 'smtpout.secureserver.net',
//     port: 465,
//     auth: {
//       user: 'info@prestigedesign-egy.com',
//       pass: 'Mmnn@1122'
//     }
//     // host: 'smtp-mail.outlook.com',
//     // port: 587,
//     // tls: {
//     //   ciphers: 'SSLv3',
//     //   rejectUnauthorized: false

//     // auth: {
//     //   user: username,
//     //   pass: password
//     // }
//   })
//   try {
//     const mail = await transporter.sendMail({
//       from: '"user" <info@prestigedesign-egy.com>',
//       to: 'hamzamode202@gmail.com', // Mails to array of recipients
//       subject: 'Testing, testing, 808080',
//       replyTo: email,
//       subject: `Website activity from ${email}`,
//       html: `
//                <p>Name: ${name} </p>
//                <p>Name: ${address} </p>
//                <p>Name: ${phone} </p>
//                <p>Email: ${email} </p>
//                <p>Message: ${message} </p>
//                `
//     })

//     return NextResponse.json({ message: 'Success: email was sent' })
//   } catch (error) {
//     console.log(error)
//     NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
//   }
// }
// import { NextResponse, NextRequest } from 'next/server'
// const nodemailer = require('nodemailer')

// // Handles POST requests to /api

// export async function POST (request) {
//   // const username = process.env.NEXT_PUBLIC_BURNER_USERNAME
//   // const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD
//   // const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL

//   const formData = await request.formData()
//   const name = formData.get('name')
//   const address = formData.get('address')
//   const phone = formData.get('phone')
//   const email = formData.get('email')
//   const message = formData.get('message')
//   const transporter = nodemailer.createTransport({
//     host: 'smtpout.secureserver.net',
//     port: 465,
//     auth: {
//       user: 'info@prestigedesign-egy.com',
//       pass: 'Mmnn@1122'
//     }
//     // host: 'smtp-mail.outlook.com',
//     // port: 587,
//     // tls: {
//     //   ciphers: 'SSLv3',
//     //   rejectUnauthorized: false

//     // auth: {
//     //   user: username,
//     //   pass: password
//     // }
//   })
//   try {
//     const mail = await transporter.sendMail({
//       from: '"user" <info@prestigedesign-egy.com>',
//       to: 'hamzamode202@gmail.com', // Mails to array of recipients
//       subject: 'Testing, testing, 808080',
//       replyTo: email,
//       subject: `Website activity from ${email}`,
//       html: `
//                <p>Name: ${name} </p>
//                <p>Name: ${address} </p>
//                <p>Name: ${phone} </p>
//                <p>Email: ${email} </p>
//                <p>Message: ${message} </p>
//                `
//     })

//     return NextResponse.json({ message: 'Success: email was sent' })
//   } catch (error) {
//     console.log(error)
//     NextResponse.status(500).json({ message: 'COULD NOT SEND MESSAGE' })
//   }
// }
