export const NEXT_APP_DIRECTUS_URL =
  process.env.NEXT_APP_DIRECTUS_URL || 'https://admin.seamad-liveaboards.com' || 'http://admin.seamad-liveaboards.com'

export default function getAssetURL (id) {
  // console.log(id)
  if (!id) return null
  return `${NEXT_APP_DIRECTUS_URL}/assets/${id}`
}
