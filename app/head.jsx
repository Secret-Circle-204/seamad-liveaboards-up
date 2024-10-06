export default function Head({ children, page }) {
  const pageTitle = `Sea-Mad-Liveaboards || ${page}`

  return (
    <>

      <title>{pageTitle}</title>
      <meta name='description' content='sea mad is a levaboard for sea life and habitat research related to the red sea...'></meta>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content="sea, mad, levaboard, hurghada, red sea, sea life, habitat research ,boat,boats" />
      <link rel='icon' href='/favicon.png' sizes="32x32'" />
      {/* <meta name="google-site-verification" content="oLuJ7aunsVQ61JX9VQ4R4whNm_NZbpHLTphLC-zUnTw" /> */}
      <link rel="canonical" href="https://seamad-liveaboards.com/" />
      {/* <link rel='preload' href='https://fonts.googleapis.com/css2?family=Nunito&display=swap' as='font' /> */}
      <main>{children}</main>

    </>
  )
}

