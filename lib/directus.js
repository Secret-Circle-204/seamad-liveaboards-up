export const NEXT_APP_DIRECTUS_URL =
  process.env.NEXT_APP_DIRECTUS_URL || 'https://admin.seamad-liveaboards.com' || 'http://admin.seamad-liveaboards.com'
  
  import { createDirectus, rest } from '@directus/sdk'
 
const directus = createDirectus(NEXT_APP_DIRECTUS_URL).with(
  rest({
    onRequest: (options) => ({ ...options, next: { revalidate: 60 } }),

  })
);

export default directus



// export const NEXT_APP_DIRECTUS_URL =
//   process.env.NEXT_APP_DIRECTUS_URL ?? 'https://admin.seamad-liveaboards.com' ??
//   'http://admin.seamad-liveaboards.com'
  
// import { createDirectus, rest } from '@directus/sdk'

// const directus = createDirectus(NEXT_APP_DIRECTUS_URL).with(
//   rest({
//     onRequest: (options) => ({ ...options, next: { revalidate: 15 } }),

//   })
// );

// export default directus