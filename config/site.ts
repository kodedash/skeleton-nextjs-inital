import { env } from 'process'

export const configSite = {
    name: env.NEXT_PUBLIC_SITE_NAME,
    description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    tagline: env.NEXT_PUBLIC_SITE_TAGLINE,
    url: env.NEXT_PUBLIC_SITE_URL,
}